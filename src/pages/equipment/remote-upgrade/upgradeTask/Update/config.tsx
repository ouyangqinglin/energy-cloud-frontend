import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { TABLESELECT } from '@/components/TableSelect';
import type { FormOperations } from '@/components/YTModalForm/typing';
import type { ProColumns } from '@ant-design/pro-components';
import type { InstallOrderUpdateParam } from '../type';
import { getSelectDeviceList } from '../service';
import { getProductSnList, getModuleList, getSelectedVersionList } from '../../comService';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useSiteColumn } from '@/hooks';
import { DeviceDataType, getProductTypeList } from '@/services/equipment';
import { useCallback, useState } from 'react';

export const Columns: (
  operation: FormOperations,
  list: any,
) => ProColumns<InstallOrderUpdateParam, TABLESELECTVALUETYPE>[] = (operation, list) => {
  const [siteColumn] = useSiteColumn<DeviceDataType>({
    hideInTable: true,
    showAllOption: true,
  });
  const [snList] = useState(); //产品型号下拉框列表
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

  const productTypeColumn = {
    title: '产品类型',
    dataIndex: 'productTypeId', //产品类型id
    formItemProps: {
      name: 'productTypeId', //产品类型id
    },
    fieldProps: {
      rules: [{ required: true, message: '请输入' }],
      onChange: (productTypeId: any) => {
        requestProductSn(productTypeId); //获取产品型号
      },
    },
    hideInTable: true,
    request: requestProductType,
  };

  //获取模块下拉框数据--依赖产品型号id
  const requestModule = useCallback((params) => {
    if (params?.productModel) {
      return getModuleList({
        productId: params?.productModel,
      }).then(({ data }) => {
        return data?.map?.((item: any) => {
          return {
            label: item?.moduleName || '',
            value: item?.moduleMark || '',
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
    // formItemProps: {
    //   name: 'productId',
    // },
    hideInTable: true,
    dependencies: ['productTypeId'], //依赖产品类型--dataIndex
    fieldProps: {
      options: snList,
      rules: [{ required: true, message: '请输入' }],
      onChange: (productId: any) => {
        requestModule(productId); //获取模块
      },
    },
    //request: requestProductSn,
  };

  const moduleColumn = {
    title: '模块',
    dataIndex: 'moduleName',
    formItemProps: {
      name: 'moduleName',
    },
    hideInTable: true,
    dependencies: ['productModel'],
    request: requestModule,
  };

  //获取软件包名--依赖模块
  const requestVersionName = useCallback((params) => {
    if (params?.moduleName) {
      return getSelectedVersionList({
        moduleId: params?.moduleName,
      }).then(({ data }) => {
        return data?.map?.((item: any) => {
          return {
            label: item?.packageName || '',
            value: item?.id || '',
          };
        });
      });
    }
    if (params?.productModel) {
      return getSelectedVersionList({
        productId: params?.productModel,
      }).then(({ data }) => {
        return data?.map?.((item: any) => {
          return {
            label: item?.packageName || '',
            value: item?.id || '',
          };
        });
      });
    }
  }, []);

  const versionNameColumn = {
    title: '软件包名',
    dataIndex: 'packageName',
    formItemProps: {
      name: 'packageName',
    },
    hideInTable: true,
    dependencies: ['moduleName', 'productModel'],
    request: requestVersionName,
  };
  //升级时间表单
  const updateTimeList = {
    1: '现在升级',
    2: '稍后升级',
  };
  //关联设备字段
  const deviceSelectColumns: ProColumns[] = [
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
  return [
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
      dataIndex: 'type', //升级类型 1现在升级 2稍后升级
      colProps: {
        span: 8,
      },
      valueType: 'radio',
      valueEnum: updateTimeList,
      formItemProps: {
        rules: [{ required: true, message: '请选择升级类型' }],
      },
      fieldProps: (form) => {
        return {
          onChange: () => {
            // form?.setFieldValue?.('moduleMark', ''); //清空模块的数据
            // form?.setFieldValue?.('id', '');//清空版本号数据
          },
        };
      },
    },
    {
      title: '升级时间',
      dataIndex: ['upgradeTime'],
      formItemProps: {
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
          return current && current < dayjs().startOf('day');
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
      fieldProps: (form) => {
        return {
          proTableProps: {
            columns: deviceSelectColumns,
            request: (params: any) =>
              getSelectDeviceList({
                ...params,
                packageId: form?.getFieldValue?.('packageName'),
                siteId: form?.getFieldValue?.('siteId'),
              }),
          },
          onFocus: () => {
            return form?.validateFields(['packageName']);
          },
        };
      },
    },
  ];
};
