//import { Columns } from './config';
import { getEditTaskList, addTaskList, updateTaskList } from '../service';
import { useCallback, useState, useRef } from 'react';
import type {
  InstallListType,
  InstallOrderUpdateParam,
  InstallOrderUpdateInfo,
  FormUpdateBaseProps,
  UpdateTaskParam,
} from '../type';
import { isCreate } from '@/components/YTModalForm/helper';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { FormTypeEnum } from '@/components/SchemaForm';
import { SchemaFormProvider } from '@/components/SchemaForm';

import { TABLESELECT } from '@/components/TableSelect';
import { getSelectDeviceList } from '../service';
import { getProductSnList, getModuleList, getSelectedVersionList } from '../../comService';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useSiteColumn } from '@/hooks';
import { DeviceDataType, getProductTypeList } from '@/services/equipment';
import { Modal, message, Button } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { formatMessage } from '@/utils';
import { FormattedMessage } from 'umi';

export const Update = (props: FormUpdateBaseProps) => {
  const [siteColumn] = useSiteColumn<DeviceDataType>({
    hideInTable: true,
    showAllOption: true,
  });
  const [snList, setSnList] = useState(); //产品型号下拉框列表
  const [modelList, setModelList] = useState(); //模块下拉框列表
  const [packageList, setPackageList] = useState(); //软件包名下拉框列表
  const [updateType, setUpdateType] = useState(2); //升级类型
  const formRef = useRef<ProFormInstance>();
  //获取产品类型
  const requestProductType = useCallback((searchParams: any) => {
    return getProductTypeList(searchParams).then(({ data }) => {
      return data?.map?.((item) => {
        return {
          label: item?.name || '',
          value: item?.id || '',
        };
      });
    });
  }, []);
  //获取产品型号--依赖产品类型
  const requestProductSn = useCallback((params) => {
    if (params) {
      return getProductSnList({
        productTypeId: params, //传递产品类型id
      }).then(({ data }) => {
        return data?.map?.((item: any) => {
          return {
            label: item?.model || '',
            value: item?.id || '',
          };
        });
      });
    } else {
      return Promise.resolve([]);
    }
  }, []);
  //获取模块下拉框数据--依赖产品型号id
  const requestModule = useCallback((params) => {
    if (params) {
      return getModuleList({
        productId: params,
      }).then(({ data }) => {
        return data?.map?.((item: any) => {
          return {
            label: item?.moduleName || '',
            value: item?.id || '',
          };
        });
      });
    } else {
      return Promise.resolve([]);
    }
  }, []);
  const productTypeColumn = {
    title: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
    dataIndex: 'productTypeId', //产品类型id
    formItemProps: {
      name: 'productTypeId', //产品类型id
      rules: [{ required: true }],
    },
    fieldProps: {
      rules: [{ required: true }],
      onChange: (productTypeId: any) => {
        requestProductSn(productTypeId).then((list) => {
          setSnList(list);
        }); //获取产品型号
      },
    },
    hideInTable: true,
    request: requestProductType,
    colProps: {
      span: 12,
    },
  };

  const productSnColumn = {
    title: formatMessage({ id: 'common.model', defaultMessage: '产品型号' }),
    dataIndex: 'productId',
    valueType: 'select',
    formItemProps: {
      name: 'productId', //产品型号id
      rules: [{ required: true }],
    },
    hideInTable: true,
    dependencies: ['productTypeId'], //依赖产品类型--dataIndex
    fieldProps: {
      options: snList,
      rules: [{ required: true }],
      onChange: (productId: any) => {
        requestModule(productId).then((list) => {
          setModelList(list);
        }); //获取模块
      },
    },
    colProps: {
      span: 12,
    },
    //request: requestProductSn,
  };
  //获取软件包名--依赖模块
  const requestVersionName = useCallback((params) => {
    if (params) {
      return getSelectedVersionList({
        moduleId: params,
      }).then(({ data }) => {
        return data?.map?.((item: any) => {
          return {
            label: item?.packageName || '',
            value: item?.id || '',
          };
        });
      });
    }
    // else if (params?.productId) {
    //   return getSelectedVersionList({
    //     productId: params?.productId
    //   }).then(({ data }) => {
    //     return data?.map?.((item: any) => {
    //       return {
    //         label: item?.packageName || '',
    //         value: item?.id || '',
    //       };
    //     });
    //   });
    // }
    else {
      return Promise.resolve([]);
    }
  }, []);
  const moduleColumn = {
    title: formatMessage({ id: 'common.module', defaultMessage: '模块' }),
    dataIndex: 'moduleName',
    valueType: 'select',
    formItemProps: {
      name: 'moduleId',
      rules: [{ required: true }],
    },
    colProps: {
      span: 12,
    },
    hideInTable: true,
    dependencies: ['productModel'],
    fieldProps: (form: any) => {
      return {
        options: modelList,
        rules: [{ required: true }],
        onChange: (e) => {
          requestVersionName(e).then((list) => {
            setPackageList(list);
          }); //获取软件包名
        },
      };
    },
    //request: requestModule,
  };

  const versionNameColumn = {
    title: formatMessage({ id: 'common.softwarePackage', defaultMessage: '软件包名' }),
    dataIndex: 'packageName',
    valueType: 'select',
    formItemProps: {
      name: 'packageId',
      rules: [{ required: true }],
    },
    colProps: {
      span: 12,
    },
    hideInTable: true,
    //dependencies: ['moduleName', 'productId'],
    //request: requestVersionName,
    fieldProps: {
      options: packageList,
      rules: [{ required: true }],
    },
  };
  //升级时间表单
  const updateTimeList = {
    1: formatMessage({ id: 'upgradeManage.nowUpgra', defaultMessage: '现在升级' }),
    2: formatMessage({ id: 'upgradeManage.laterUpgra', defaultMessage: '稍后升级' }),
  };
  //关联设备字段
  const deviceSelectColumns = [
    {
      title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
      dataIndex: 'deviceName',
      width: 150,
      ellipsis: true,
      //hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'common.equipmentSerial', defaultMessage: '设备序列号' }),
      dataIndex: 'deviceSn',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'common.currentVersion', defaultMessage: '当前版本' }),
      dataIndex: 'version',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'common.siteName', defaultMessage: '站点名称' }),
      dataIndex: 'siteName',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
  ];

  const columns = [
    {
      title: formatMessage({ id: 'upgradeManage.taskName', defaultMessage: '任务名称' }),
      dataIndex: 'taskName',
      formItemProps: {
        rules: [{ required: true, message: '请输入' }],
      },
      colProps: {
        span: 12,
      },
    },
    //siteColumn,
    productTypeColumn,
    productSnColumn,
    moduleColumn,
    versionNameColumn,
    {
      title: formatMessage({ id: 'upgradeManage.upgradeType', defaultMessage: '升级类型' }),
      dataIndex: 'type', //升级类型 1现在升级 2稍后升级
      colProps: {
        span: 12,
      },
      valueType: 'radio',
      valueEnum: updateTimeList,
      formItemProps: {
        initialValue: '2',
        rules: [{ required: true }],
      },
      fieldProps: (form) => {
        return {
          onChange: (e) => {
            //隐藏日期表单
            setUpdateType(e.target.value);
          },
        };
      },
    },
    {
      title: formatMessage({ id: 'upgradeManage.upgradeTime', defaultMessage: '升级时间' }),
      dataIndex: ['upgradeTime'],
      hideInForm: updateType == 1, //稍后升级时才显示时间表单--彻底隐藏，去除校验
      formItemProps: {
        //hidden: updateType == 1,//稍后升级时才显示时间表单
        rules: [
          {
            required: true,
          },
        ],
      },
      fieldProps: {
        style: {
          width: '100%',
        },
        disabledDate: (current: Dayjs) => {
          return current && current < dayjs().startOf('day'); //只能选择今天以及之后的时间
        },
      },
      valueType: 'dateTime',
      dependencies: ['type'],
      colProps: {
        span: 12,
      },
    },
    //关联设备
    {
      title: formatMessage({ id: 'upgradeManage.assoDevice', defaultMessage: '关联设备' }),
      valueType: TABLESELECT,
      dataIndex: 'upgradeDeviceDetailList',
      colProps: {
        span: 12,
      },
      dependencies: ['siteId', 'packageName'],
      fieldProps: (form: any) => {
        return {
          proTableProps: {
            columns: deviceSelectColumns,
            request: (params: any) => {
              return getSelectDeviceList({
                ...params,
                packageId: form?.getFieldValue?.('packageId'),
                siteId: form?.getFieldValue?.('siteId'),
              }).then(({ data }) => {
                return {
                  data: data?.list,
                  total: data?.total,
                  success: true,
                };
              });
            },
          },
          onFocus: () => {
            return form?.validateFields(['packageId']);
          },
          valueId: 'deviceId',
          valueName: 'deviceName',
          tableName: 'deviceName',
          tableId: 'deviceId',
        };
      },
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
  ];
  //config.tsx移过来的
  const convertRequestData = (res: UpdateTaskParam) => {
    if (res) {
      requestProductSn(res?.productTypeId).then((list) => {
        setSnList(list);
      }); //获取产品型号
      requestModule(res?.productId).then((data) => {
        setModelList(data);
      }); //获取模块
      requestVersionName(res?.moduleId).then((data) => {
        setPackageList(data);
      }); //获取软件包名
      res.type = res.type + '';
    }
    return res;
  };
  //提交前的处理函数
  const convertUpdateParams = (params: InstallOrderUpdateInfo) => {
    if (params.upgradeTime) {
      params.upgradeTime = params.upgradeTime.replace(/\//g, '-');
    }
    params.upgradeDevice = params.upgradeDeviceDetailList
      ? params.upgradeDeviceDetailList.map((item) => item.deviceId).join(',')
      : null;
  };
  const submitFormEvents = (item: any) => {
    const updateTypeNum = item.form?.getFieldValue?.('type');
    //立即升级处理逻辑
    if (updateTypeNum == 1) {
      Modal.confirm({
        title: (
          <strong>
            <FormattedMessage id="upgradeManage.upgradeConfirm" defaultMessage="升级确认" />
          </strong>
        ),
        content: formatMessage({
          id: 'upgradeManage.upgradeTips',
          defaultMessage: '立即执行升级操作可能会影响正在运行的设备，是否执行立即升级操作？',
        }),
        okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
        cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
        onOk: (close) => {
          formRef.current?.submit();
          Modal.destroyAll();
        },
      });
    } else {
      formRef.current?.submit();
    }
  };

  //const getConfig = useCallback(() => Columns(props?.operations), [props.operations]);
  return (
    <>
      <SchemaFormProvider<InstallOrderUpdateInfo, TABLESELECTVALUETYPE, InstallOrderUpdateParam>
        width="900px"
        id={props.id}
        type={isCreate(props.operations) ? FormTypeEnum.Add : FormTypeEnum.Edit}
        columns={columns as any}
        open={props.visible}
        onOpenChange={props.onVisibleChange}
        addData={addTaskList}
        editData={updateTaskList}
        //获取编辑的接口
        getData={getEditTaskList}
        beforeSubmit={convertUpdateParams}
        afterRequest={convertRequestData} //获取编辑详情后执行的函数
        // extraData={{ siteId }}
        onSuccess={props?.onSuccess}
        onFocus={props?.onFocus}
        grid={true}
        colProps={{
          span: 8,
        }}
        initialValues={props?.initialValues}
        formRef={formRef}
        submitter={{
          render: (prop: any, doms: any) => {
            return [
              doms[0],
              <Button type="primary" onClick={() => submitFormEvents(prop)} key="submit">
                <FormattedMessage id="common.execute" defaultMessage="执行" />
              </Button>,
            ];
          },
        }}
      />
    </>
  );
};
