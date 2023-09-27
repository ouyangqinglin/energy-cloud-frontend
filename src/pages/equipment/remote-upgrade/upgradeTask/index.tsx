
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import YTProTable from '@/components/YTProTable';
import { FormOperations } from '@/components/YTModalForm/typing';
import { getUpgradeTaskList, getProductSnList, getVersionList, getModuleList, deleteTaskList } from './service';
import { UpgradeListType } from './type';
import { taskStatus, taskDetailColumns } from './config';
import { SearchParams } from '@/hooks/useSearchSelect';
import { DeviceDataType, getProductTypeList } from '@/services/equipment';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { ActionType } from '@ant-design/pro-components';
import { useToggle } from 'ahooks';
import { Update } from './Update';
import { Modal, message, Button } from 'antd';
import { RemoteUpgradeDataRes } from '../log/type';
import { TaskDetail } from './ReadDetail/config';
import {
  getTaskDetail
} from './service';
import DetailDialog from '@/components/DetailDialog';
import Detail from '@/components/Detail';


const UpgradeTask: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [initialValues, setInitialValues] = useState<UpgradeListType>({} as UpgradeListType);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [updateModal, { set: setUpdateModal }] = useToggle<boolean>(false);
  
  const onAddClick = useCallback(() => {
    setOperations(FormOperations.CREATE);
    setInitialValues({type:'2'});
    setUpdateModal(true);//打开弹窗
  }, []);
  const customListConfig: YTProTableCustomProps<UpgradeListType, any> = {
    toolBarRenderOptions: {
      add: {
        onClick: onAddClick,
      },
    },
  };
  const customConfig: YTProTableCustomProps<UpgradeListType, any> = {
    toolBarRenderOptions: {
      add: {
        show:false
      },
    },
  };
  
  const requestList = useCallback(
    (params) => {
      return getUpgradeTaskList({ ...params});
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
      fieldProps: (form) => {
        return {
          onChange: () => {
            form?.setFieldValue?.('productModel', ''); //清空产品型号的数据
          },
        };
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
      fieldProps: (form) => {
        return {
          onChange: () => {
            form?.setFieldValue?.('moduleMark', ''); //清空模块的数据
            form?.setFieldValue?.('id', '');//清空版本号数据
          },
        };
      },
  };
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
        name: 'moduleMark',
      },
      hideInTable: true,
      dependencies: ['productModel'],   
      request: requestModule,
  };
  //获取升级版本号--依赖产品型号id
const requestVersion = useCallback((params) => {
  if(params?.productModel) {
    return getVersionList({productId:params?.productModel,current:1,pageSize:2000}).then(({ data }) => {
      return data?.map?.((item) => {
        return {
          label: item?.version || '',
          value: item?.id || '',
        };
      });
    });
  } else {
    return Promise.resolve([]);
  } 
}, []);
const versionList= {
    title: '升级版本',
    dataIndex: 'version',
    formItemProps: {
      name: 'id',
    },
    hideInTable: true,
    dependencies: ['productModel'],
    request: requestVersion,
};
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
//删除升级任务
const onCleanClick = useCallback((record: any) => {
  Modal.confirm({
    title: <strong>清除确认</strong>,
    content: '您确认要删除该升级任务吗？删除之后无法恢复！',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return deleteTaskList({ id: record.id })?.then?.(({ code, data }) => {
        if (code == '200' || data) {
          message.success('删除成功');
          actionRef?.current?.reload?.();
        }
    })
  }
  });
}, []);

//编辑升级任务
let onEditEvents = useCallback((record: any) => {
  //掉接口获取数据吗
    setInitialValues({ ...record });
    setOperations(FormOperations.UPDATE);
    setUpdateModal(true);
}, []);
const [open, setOpen] = useState(false);//打开查看详情弹窗
const switchOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

const [viewDetailData, setViewDetailData] = useState();
const [detailParams, setDetailParams] = useState();
//查看详情
let onViewEvents = useCallback((record) => {
  switchOpen();
  setViewDetailData(record);
  setDetailParams(record);
}, []);
//查看详情列表--根据列表id获取
const requestDetailList = useCallback(
  (params) => {
   return  getTaskDetail(params).then(({ data }) => {    
      const listdata = {data:{
        list: data?.upgradeRecordList,
        total: data?.upgradeRecordList.length,
      }};
      return listdata;
    });    
  },[]
);
  const columnsNew = useMemo<ProColumns<DeviceDataType>[]>(() => {
    return [
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
        title: '产品型号',
        dataIndex: 'productModel',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '版本号',
        dataIndex: 'version',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '软件包名',
        dataIndex: 'packageName',
        width: 120,
        ellipsis: true,
      },
      {
        title: '模块',
        dataIndex: 'moduleName',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '产品类型',
        dataIndex: 'productTypeName',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'dateTime',
        hideInSearch: true,
        width: 150,
      },
    {
      title: '升级时间',
      dataIndex: 'upgradeTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '最后更新人',
      dataIndex: 'updater',
      hideInSearch: true,
      width: 100,
      ellipsis: true,
    },
    {
      title: '任务状态',
      dataIndex: 'status',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
      valueEnum: taskStatus,
    },
    upgradTime,
    //自定义操作栏
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: (_, record, action) => {
        return record.status ==1 ? ( 
            <Button type="link" size="small" key="detail" onClick={() => onViewEvents(record)}>
             查看详情
           </Button>     
        ) : (
         <div>
            <Button type="link" size="small" key="edit" onClick={() => onEditEvents(record)}>
             编辑
           </Button>
           <Button type="link" size="small" key="del" onClick={() =>onCleanClick(record)}>
             删除
           </Button>
         </div>        
        );
      },
    },
    ];
  }, [productTypeColumn]);

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, [actionRef]);


//查看详情--设备列表
  const viewDetailTable = <>
  <Detail.DotLabel title="升级结果"/>
  <YTProTable<RemoteUpgradeDataRes, RemoteUpgradeDataRes>
    columns = {taskDetailColumns}
    request = {requestDetailList}
    //request={requestList}
    rowKey="id"
    {...customConfig}
    params={detailParams}
    search = {false} //隐藏搜索重置按钮
    options={{
      setting: false,//隐藏设置按钮
      density: false,
      fullScreen: false,
      reload: false,       
    }}
/></>
  return (
    <>
      <YTProTable<RemoteUpgradeDataRes, RemoteUpgradeDataRes>
        columns = {columnsNew}
        actionRef={actionRef}
        request={requestList}
        rowKey="id"
        {...customListConfig}
      />
      <Update
        {...{
          operations: operations,
          visible: updateModal,
          onVisibleChange: setUpdateModal,
          id: initialValues?.id,
          initialValues:initialValues,
          onSuccess: onSuccess,
        }}
      />
      {/* 查看详情弹窗 */}
      <DetailDialog
        width="50%"
        title="查看详情"
        open={open}
        onCancel={switchOpen}
        detailProps={{
          data: viewDetailData,
          items: TaskDetail,
          column: 4,
          labelStyle: { width: '90px' },
        }}
        prepend={<Detail.DotLabel title="任务详情"/>}
        append={viewDetailTable}
      />  
    </>
  );
};
export default UpgradeTask;
