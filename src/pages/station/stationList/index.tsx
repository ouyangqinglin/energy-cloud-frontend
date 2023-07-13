/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-28 17:41:49
 * @LastEditTime: 2023-07-13 20:18:06
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\index.tsx
 */
import React, { useRef, useState, useCallback } from 'react';
import { Button, Modal, message } from 'antd';
import { useHistory } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import YTProTable from '@/components/YTProTable';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { StationType, StationFormType } from './data.d';
import { buildStatus } from '@/utils/dictionary';
import { getList, removeData } from './service';
import StationForm from './components/edit';
import { FormTypeEnum } from '@/utils/dictionary';
import { useArea } from '@/hooks';

const StationList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [siteId, setSiteId] = useState('');
  const history = useHistory();
  const actionRef = useRef<ActionType>();
  const { state: areaOptions } = useArea();

  const requestList = useCallback((params) => {
    const [countryCode, provinceCode, cityCode] = params?.area || [];
    return getList({ ...params, countryCode, provinceCode, cityCode });
  }, []);

  const onAddClick = useCallback(() => {
    setOpen(true);
    setSiteId('');
  }, []);

  const onSiteClick = useCallback((record: StationType) => {
    history.push({
      pathname: '/site-monitor/overview',
      search: `?id=${record.id}`,
    });
  }, []);

  const onSettingClick = useCallback((record) => {
    history.push({
      pathname: `/station/setting`,
      search: `?id=${record.id}`,
    });
  }, []);

  const onSuccess = () => {
    actionRef?.current?.reload?.();
  };

  const toolBar = () => [
    <Button type="primary" key="add" onClick={onAddClick}>
      <PlusOutlined />
      新建站点
    </Button>,
  ];

  const rowBar = (_: any, record: StationType) => (
    <>
      <Button type="link" size="small" key="in" onClick={() => onSettingClick(record)}>
        站点配置
      </Button>
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
    </>
  );
  const columns: ProColumns<StationType>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
    },
    {
      title: '站点名称',
      dataIndex: 'name',
      width: 150,
      ellipsis: true,
      render: (_, record) => {
        return <a onClick={() => onSiteClick(record)}>{record.name}</a>;
      },
    },
    {
      title: '站点ID',
      dataIndex: 'id',
      hideInSearch: true,
      width: 150,
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      render: (_, record) => <span>{record.createTime}</span>,
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
      title: '交付时间',
      dataIndex: 'deliveryTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '地区',
      dataIndex: 'area',
      valueType: 'cascader',
      hideInTable: true,
      fieldProps: {
        options: areaOptions,
        fieldNames: {
          value: 'id',
        },
        changeOnSelect: true,
      },
    },
    {
      title: '国家',
      dataIndex: 'country',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '省份',
      dataIndex: 'province',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '城市',
      dataIndex: 'city',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '服务商',
      dataIndex: 'agent',
      hideInSearch: true,
      ellipsis: true,
      width: 150,
    },
    {
      title: '建设状态',
      dataIndex: 'constructionStatus',
      valueType: 'select',
      valueEnum: buildStatus,
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '最后操作时间',
      dataIndex: 'lastOperationTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: rowBar,
    },
  ];

  return (
    <>
      <YTProTable
        actionRef={actionRef}
        columns={columns}
        toolBarRender={toolBar}
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

export default StationList;
