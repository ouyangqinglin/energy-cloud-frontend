
import React, { useCallback,useMemo } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import YTProTable from '@/components/YTProTable';
import { getLogList, getProductSnList, getVersionList, getModuleList } from './service';
import { RemoteUpgradeDataRes } from './type';
import { upgradeStatus } from './config';
import { useSiteColumn, useSearchSelect} from '@/hooks';
import { SearchParams } from '@/hooks/useSearchSelect';
import { DeviceDataType, getProductTypeList } from '@/services/equipment';

const Log: React.FC = () => {
  const requestList = useCallback(
    (params) => {
      return getLogList({ ...params});
    },[]
  );

  //获取产品类型
  const requestProductType = useCallback((searchParams: SearchParams) => {
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
      dataIndex: 'productTypeName',
      formItemProps: {
        name: 'productTypeId',
      },
      fieldProps: {
        onChange: (productTypeId:any) => {
          
        },
      },
      hideInTable: true,
   
    request: requestProductType,
  };
  //获取产品型号--依赖产品类型
  const requestProductSn = useCallback((params) => {
    if(params?.productTypeId) {
      return getProductSnList({
        productTypeId:params?.productTypeId
      }).then(({ data }) => {
        return data?.map?.((item:any) => {
          return {
            label: item?.model || '',
            value: item?.id || '',
          };
        });
      });
    }else {
      return Promise.resolve([]);
    }   
  }, []);
  const productSnColumn = {
      title: '产品型号',
      dataIndex: 'productModel',
      formItemProps: {
        name: 'productModel',
      },
      hideInTable: true,
      dependencies: ['productTypeId'],   
      request: requestProductSn,
  };
  //获取站点信息
  const [siteColumn] = useSiteColumn<DeviceDataType>({
    hideInTable: true,
  });
  //获取模块下拉框数据--依赖产品型号id
  const requestModule = useCallback((params) => {
    if(params?.productModel) {
      return getModuleList({
        productId: params?.productModel
      }).then(({ data }) => {
        return data?.map?.((item:any) => {
          return {
            label: item?.moduleName || '',
            value: item?.moduleMark || '',
          };
        });
      });
    }else {
      return Promise.resolve([]);
    }   
  }, []);
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
//获取升级版本号--依赖产品型号id
const requestVersion = useCallback((params) => {
  return getVersionList(params?.productModel).then(({ data }) => {
    return data?.map?.((item) => {
      return {
        label: item?.version || '',
        value: item?.id || '',
      };
    });
  });
}, []);

const [versionList] = useSearchSelect<DeviceDataType>({
  proColumns: {
    title: '升级版本',
    dataIndex: 'version',
    formItemProps: {
      name: 'version',
    },
    hideInTable: true,
    dependencies: ['productModel'],
  },
  request: requestVersion,
});
//升级时间
const upgradTime = {
  title: '升级时间',
  dataIndex: 'upgradeTime',
  valueType: 'dateTimeRange',
  width: 150,
  render: (_, record:any) => record.upgradeTime,
  search: {
    transform: (value:any) => {
      return {
        startTime: value[0],
        endTime: value[1],
      };
    },
  },
};

  const columnsNew = useMemo<ProColumns<DeviceDataType>[]>(() => {
    return [
      siteColumn,
      productTypeColumn,
      productSnColumn,
      moduleColumn,
      versionList,
      {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 48,
      },
      {
        title: '设备名称',
        dataIndex: 'deviceName',
        width: 120,
        ellipsis: true,
      },
      {
        title: '设备序列号',
        dataIndex: 'deviceSn',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '产品型号',
        dataIndex: 'productModel',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '模块',
        dataIndex: 'moduleName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '产品类型',
        dataIndex: 'typeName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '站点',
        dataIndex: 'siteName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      
    {
      title: '软件包名',
      dataIndex: 'packageName',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '原始版本',
      dataIndex: 'oldVersion',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '升级版本',
      dataIndex: 'newVersion',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '当前版本',
      dataIndex: 'nowVersion',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '升级时间',
      dataIndex: 'upgradeTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '升级状态',
      dataIndex: 'status',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
      valueEnum: upgradeStatus,
    },
    {
      title: '升级人',
      dataIndex: 'upgrader',
      hideInSearch: true,
      width: 100,
      ellipsis: true,
    },
    upgradTime,
    ];
  }, [siteColumn, productTypeColumn]);
  return (
    <>
      <YTProTable<RemoteUpgradeDataRes, RemoteUpgradeDataRes>
        columns = {columnsNew}
        toolBarRenderOptions={{
          add: {
            show:false
          },
        }}
        //影藏掉操作栏
        // option={{
        //   columnsProp: {
        //     width: '120px',
        //   },
          
        //   //onEditChange: onEditClick,
        // }}
        request={requestList}
      />
    </>
  );
};

export default Log;
