
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import { useHistory, useModel } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { StationType, packageStatus } from './config';
import { getPackageList, removeData } from './service';
import StationForm from './components/editDialog';
import { FormTypeEnum, siteType as siteTypeEnum } from '@/utils/dictionary';
import { useAuthority } from '@/hooks';
import eventBus from '@/utils/eventBus';
import { getProductTypeList } from '@/services/equipment';
import { SearchParams } from '@/hooks/useSearchSelect';
import {getProductSnList } from '../comService';

const Package: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [siteId, setSiteId] = useState('');
  const history = useHistory();
  const actionRef = useRef<ActionType>();
  const { siteType } = useModel('site', (model) => ({ siteType: model?.state?.siteType }));
  const { authorityMap } = useAuthority([
    'system:site:config',
    'system:site:delete',
    'system:site:create',   
    'oss:site:update',      
  ]);
  const requestList = useCallback(
    (params) => {
      return getPackageList({ ...params});
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



  const onAddClick = useCallback(() => {
    setOpen(true);
    setSiteId('');
  }, []);

  const onEditClick = useCallback((record: StationType) => {
    setOpen(true);
    setSiteId(record.id);
  }, []);

  const onSiteClick = useCallback((record: StationType) => {
    eventBus.emit('changeSite', record.id);
    history.push({
      pathname: '/site-monitor/overview',
      search: `?id=${record.id}`,
    });
  }, []);

  const onSuccess = () => {
    actionRef?.current?.reload?.();
  };

  useEffect(() => {
    actionRef?.current?.reload?.();
  }, [siteType]);

  const toolBar = () => [
    <Button type="primary" key="add" onClick={onAddClick}>
      <PlusOutlined />
      新建
    </Button>,
  ];

  const rowBar = (_: any, record: StationType) => (
    <>
      {authorityMap.get('oss:site:update') && (
        <Button type="link" size="small" key="in" onClick={() => onEditClick(record)}>
          编辑
        </Button>
      )}
      {authorityMap.get('system:site:delete') && (
        <Button
          type="link"
          size="small"
          key="delete"
          onClick={() => {
            Modal.confirm({
              title: '删除',
              content: '确定要删除改站点吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: () => {
                removeData({ siteId: record.id }).then(() => {
                  message.success('删除成功');
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                });
              },
            });
          }}
        >
          删除
        </Button>
      )}
    </>
  );
  const columns: ProColumns<StationType>[] = [
    productTypeColumn,
    productSnColumn,
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
      render: (_, record) => {
        return <a onClick={() => onSiteClick(record)}>{record.name}</a>;
      },
    },
    {
      title: '版本号',
      dataIndex: 'version',
      hideInSearch: true,
      width: 120,
      ellipsis: true,
    },
    {
      title: '软件包名',
      dataIndex: 'packageName',
      width: 100,
      ellipsis: true,
      hideInSearch: false,
    },
    {
      title: '产品类型',
      dataIndex: 'productTypeName',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      valueType: 'dateRange',
      render: (_, record) => <span>{record.uploadTime}</span>,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
      width: 150,
    },
    {
      title: '上传人',
      dataIndex: 'uploaderName',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      width: 100,
      valueEnum: packageStatus,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 180,
      fixed: 'right',
      render: rowBar,
      hideInTable:
        !authorityMap.get('system:site:config') &&
        !authorityMap.get('system:site:delete') &&
        !authorityMap.get('oss:site:update'),
    },
  ];

  return (
    <>
      <YTProTable
        actionRef={actionRef}
        columns={columns}
        toolBarRender={authorityMap.get('system:site:create') ? toolBar : () => [<></>]}
        request={requestList}
      />
      <StationForm
        id={siteId}
        open={open}
        onOpenChange={setOpen}
        type={siteId ? FormTypeEnum.Edit : FormTypeEnum.Add}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default Package;
