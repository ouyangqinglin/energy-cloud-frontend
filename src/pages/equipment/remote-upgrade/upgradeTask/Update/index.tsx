//import { Columns } from './config';
import {
  getEditTaskList, addTaskList, updateTaskList
} from '../service';
import { omit } from 'lodash';
import { useCallback, useState } from 'react';
import type { InstallListType, InstallOrderUpdateParam, InstallOrderUpdateInfo, FormUpdateBaseProps, UpdateTaskParam, } from '../type';
import { isCreate } from '@/components/YTModalForm/helper';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { FormTypeEnum } from '@/utils/dictionary';
import { SchemaFormProvider } from '@/components/SchemaForm';

import { TABLESELECT } from '@/components/TableSelect';
import { getSelectDeviceList } from '../service';
import { getProductSnList, getModuleList, getSelectedVersionList } from '../../comService';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useSiteColumn } from '@/hooks';
import { DeviceDataType, getProductTypeList } from '@/services/equipment';

export const Update = (props: FormUpdateBaseProps<InstallListType>) => {
  const [siteColumn] = useSiteColumn<DeviceDataType>({
    hideInTable: true,
    showAllOption: true,
  });
  const [snList, setSnList] = useState();//产品型号下拉框列表
  const [modelList, setModelList] = useState();//模块下拉框列表
  const [packageList, setPackageList] = useState();//软件包名下拉框列表
  const [updateType, setUpdateType] = useState(2);//升级类型
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

  const productTypeColumn = {
    title: '产品类型',
    dataIndex: 'productType',//产品类型id
    formItemProps: {
      name: 'productType',//产品类型id
      rules: [{ required: true, message: '请输入' }], 
    },
    fieldProps: {
      rules: [{ required: true, message: '请输入' }],
      onChange: (productType: any) => {
        requestProductSn(productType).then((list) => {
        setSnList(list);
      });//获取产品型号
      },
    },
    hideInTable: true,
    request: requestProductType,
  };
  //获取产品型号--依赖产品类型
  const requestProductSn = useCallback((params) => {
    if (params) {
      return getProductSnList({
        productType: params//传递产品类型id
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

  const productSnColumn = {
    title: '产品型号',
    dataIndex: 'productId',
    valueType: 'select',
    formItemProps: {
      name: 'productId',//产品型号id
      rules: [{ required: true, message: '请输入' }], 
    },
    hideInTable: true,
    dependencies: ['productType'],   //依赖产品类型--dataIndex
    fieldProps: {
      options: snList,
      rules: [{ required: true, message: '请输入' }],
      onChange: (productId: any) => {
        requestModule(productId).then((list) => {
          setModelList(list);
        });//获取模块
      },
    },
    //request: requestProductSn,
  };
  //获取软件包名--依赖模块
  const requestVersionName = useCallback((params) => {
    if (params?.moduleId) {
      return getSelectedVersionList({
        moduleId: params?.moduleName
      }).then(({ data }) => {
        return data?.map?.((item: any) => {
          return {
            label: item?.packageName || '',
            value: item?.id || '',
          };
        });
      });
    } else if (params?.productId) {
      return getSelectedVersionList({
        productId: params?.productId
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
  //获取模块下拉框数据--依赖产品型号id
  const requestModule = useCallback((params) => {
    if (params) {
      return getModuleList({
        productId: params
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
  const moduleColumn = {
    title: '模块',
    dataIndex: 'moduleName',
    valueType: 'select',
    formItemProps: {
      name: 'moduleId',
      rules: [{ required: true, message: '请输入' }], 
    },
    hideInTable: true,
    dependencies: ['productModel'],
    fieldProps: {
      options: modelList,
      rules: [{ required: true, message: '请输入' }],
      onChange: (moduleName: any) => {
        requestVersionName(moduleName).then((list) => {
          setPackageList(list);
        });//获取软件包名
      },
    },
    //request: requestModule,
  };

  const versionNameColumn = {
    title: '软件包名',
    dataIndex: 'packageName',
    valueType:"select",
    formItemProps: {
      name: 'packageId',
      rules: [{ required: true, message: '请输入' }],
    },
    hideInTable: true,
    dependencies: ['moduleName', 'productModel'],
    //request: requestVersionName,
    fieldProps: {
      options: packageList,
      rules: [{ required: true, message: '请输入' }],
    },
  };
  //升级时间表单
  const updateTimeList = {
    1: '现在升级',
    2: '稍后升级',
  };
  //关联设备字段
  const deviceSelectColumns = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      width: 150,
      ellipsis: true,
      //hideInSearch: true,
    },
    {
      title: '设备序列号',
      dataIndex: 'deviceSn',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '当前版本',
      dataIndex: 'version',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '站点名称',
      dataIndex: 'siteName',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
  ];

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'taskName',
      formItemProps: {
        rules: [{ required: true, message: '请输入' }],
      },
      colProps: {
        span: 8,
      },
    },
    siteColumn,
    productTypeColumn,
    productSnColumn,
    moduleColumn,
    versionNameColumn,
    {
      title: '',
      dataIndex: 'type',//升级类型 1现在升级 2稍后升级
      colProps: {
        span: 8,
      },
      valueType: 'radio',
      valueEnum: updateTimeList,
      formItemProps: {
        initialValue:'2',
        rules: [{ required: true, message: '请选择升级类型' }],
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
      title: '升级时间',
      dataIndex: ['upgradeTime'],
      formItemProps: {
        hidden: updateType == 1,//稍后升级时才显示时间表单
        rules: [
          {
            required: true,
            message: '请选择升级时间',
          },
        ],
      },
      fieldProps: {
        style: {
          width: '100%',
        },
        showTime: true,
        format: 'YYYY-MM-DD hh:mm:ss',
        disabledDate: (current: Dayjs) => {
          return current && current < dayjs().startOf('day');//只能选择今天以及之后的时间
        },
      },
      valueType: 'date',
      dependencies: ['type'],
    },
    //关联设备
    {
      title: '关联设备',
      dataIndex: 'upgradeDevice',
      valueType: TABLESELECT,
      colProps: {
        span: 24,
      },
      
      dependencies: ['siteId', 'packageName'],
      fieldProps: (form:any) => {
        return {
          proTableProps: {
            columns: deviceSelectColumns,
            request: (params: any) => {
              return getSelectDeviceList({ ...params, packageId: form?.getFieldValue?.('packageId'), siteId: form?.getFieldValue?.('siteId'),}).then(({ data }) => {
                return {
                  data: data?.list,
                  total: data?.total,
                  success: true,
                };
              });
            }
          },
          onFocus: () => {       
            return form?.validateFields(['packageName']);
          },
          valueId: 'deviceId',
          valueName: 'deviceName',
          tableName: 'deviceName',
          tableId:'deviceId',
        };
      },
    },
  ];
  //config.tsx移过来的
  const convertRequestData = (res: UpdateTaskParam) => {
    if (res) {
      requestProductSn(res?.productType).then((list) => {
        setSnList(list);
      });//获取产品型号
      requestModule(res?.productId).then((data) => {
        setModelList(data);
      });//获取模块11111
      requestVersionName(res).then((data) => {
        setPackageList(data);
      });//获取软件包名
      res.type = res.type + '';
    };
    return res;
  };
 //提交前的处理函数
  const convertUpdateParams = (params: InstallOrderUpdateInfo) => {
    console.log(params,'zhjssgggg');
    // const { orgId, orgName } = params.serviceProvider?.[0] ?? {};
    // const { handlerBy } = params.handler?.[0] ?? {};
    // const { userId, userName } = params.customer?.[0] ?? {};

    // return {
    //   ...omit(params, 'serviceProvider', 'handler', 'customer', 'status'),
    //   ...{ orgId, orgName, handlerBy, userId, userName },
    // } as InstallOrderUpdateParam;
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
        afterRequest={convertRequestData}//获取编辑详情后执行的函数
        // extraData={{ siteId }}
        onSuccess={props?.onSuccess}
        onFocus={props?.onFocus}
        grid={true}
        colProps={{
          span: 8,
        }}
        initialValues={props?.initialValues}
      />
    </>
  );
};
