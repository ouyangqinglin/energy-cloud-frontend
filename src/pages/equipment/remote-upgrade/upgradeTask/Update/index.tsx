import { getEditTaskList, addTaskList, updateTaskList } from '../service';
import { useCallback, useState, useRef, useMemo } from 'react';
import { FormAndDetailType } from '@/components/Detail/Detail';

import type {
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
import { getProductTypeList } from '@/services/equipment';
import { Modal, Button } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { formatMessage } from '@/utils';
import { FormattedMessage } from 'umi';
import { log } from 'lodash-decorators/utils';

export const Update = (props: FormUpdateBaseProps) => {
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
    if (params?.productType) {
      return getProductSnList({
        productTypeId: params.productType, //传递产品类型id
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
    if (params?.productId) {
      return getModuleList({
        productId: params.productId,
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
  const productTypeColumn: FormAndDetailType = {
    title: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
    dataIndex: 'productType', //产品类型id
    formItemProps: {
      name: 'productType', //产品类型id
      rules: [{ required: true }],
    },
    hideInTable: true,
    request: requestProductType,
    fieldProps: (form) => {
      return {
        onChange: () => {
          form.setFieldValue('productId', null);
          form.setFieldValue('moduleId', null);
          form.setFieldValue('packageId', null);
          form.setFieldValue('upgradeDeviceDetailList', []);
        },
      };
    },
    colProps: {
      span: 12,
    },
  };

  const productSnColumn: FormAndDetailType = {
    title: formatMessage({ id: 'common.model', defaultMessage: '产品型号' }),
    dataIndex: 'productId',
    valueType: 'select',
    formItemProps: {
      name: 'productId', //产品型号id
      rules: [{ required: true }],
    },
    hideInTable: true,
    dependencies: ['productType'], //依赖产品类型--dataIndex
    fieldProps: (form) => {
      return {
        onChange: () => {
          form.setFieldValue('moduleId', null);
          form.setFieldValue('packageId', null);
          form.setFieldValue('upgradeDeviceDetailList', []);
        },
      };
    },
    colProps: {
      span: 12,
    },
    request: requestProductSn,
  };
  //获取软件包名--依赖模块
  const requestVersionName = useCallback((params) => {
    if (params?.moduleId) {
      return getSelectedVersionList({
        moduleId: params.moduleId,
      }).then(({ data }) => {
        return data?.map?.((item: any) => {
          return {
            label: item?.packageName || '',
            value: item?.id || '',
          };
        });
      });
    } else {
      return Promise.resolve([]);
    }
  }, []);
  const moduleColumn: FormAndDetailType = {
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
    fieldProps: (form) => {
      return {
        onChange: () => {
          form.setFieldValue('packageId', null);
          form.setFieldValue('upgradeDeviceDetailList', []);
        },
      };
    },
    hideInTable: true,
    dependencies: ['productId'],
    request: requestModule,
  };

  const versionNameColumn: FormAndDetailType = {
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
    fieldProps: (form) => {
      return {
        onChange: () => {
          form.setFieldValue('upgradeDeviceDetailList', []);
        },
      };
    },
    hideInTable: true,
    dependencies: ['moduleId'],
    request: requestVersionName,
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

  const columns = useMemo<FormAndDetailType[]>(
    () => [
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
          rules: [
            {
              required: true,
            },
          ],
        },
      },
      {
        valueType: 'dependency',
        name: ['type'],
        columns: ({ type }) => {
          return type == 1
            ? [
                {
                  title: formatMessage({
                    id: 'upgradeManage.assoDevice',
                    defaultMessage: '关联设备',
                  }),
                  valueType: TABLESELECT as any,
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
              ]
            : [
                {
                  title: formatMessage({
                    id: 'upgradeManage.upgradeTime',
                    defaultMessage: '升级时间',
                  }),
                  dataIndex: ['upgradeTime'],
                  name: 'upgradeTime',
                  dependencies: ['type'],
                  fieldProps: {
                    style: {
                      width: '100%',
                    },
                    disabledDate: (current: Dayjs) => {
                      return current && current < dayjs().startOf('day'); //只能选择今天以及之后的时间
                    },
                  },
                  valueType: 'dateTime',
                  colProps: {
                    span: 12,
                  },
                  formItemProps: {
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  },
                },
                {
                  title: formatMessage({
                    id: 'upgradeManage.assoDevice',
                    defaultMessage: '关联设备',
                  }),
                  valueType: TABLESELECT as any,
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
        },
      },
    ],
    [],
  );
  //config.tsx移过来的
  const convertRequestData = (res: UpdateTaskParam) => {
    if (res) {
      res.type = res.type + '';
    }
    return res;
  };
  //提交前的处理函数
  const convertUpdateParams = (params: InstallOrderUpdateInfo) => {
    if (params?.upgradeTime) {
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
