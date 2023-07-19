/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-24 15:15:42
 * @LastEditTime: 2023-06-14 10:36:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\partner\agent\index.tsx
 */
import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ProTableProps } from '@ant-design/pro-table';
import { ProConfigProvider, BetaSchemaForm } from '@ant-design/pro-components';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import type { AgentType, AgentFormType } from './data.d';
import { effectStatus } from '@/utils/dictionary';
import { getAgent } from '@/services/agent';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { tableSelectValueTypeMap, TABLESELECT } from '@/components/TableSelect';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';

const Agent: React.FC = () => {
  const requestList: YTProTableCustomProps<AgentType, AgentType>['request'] = (params) => {
    return getAgent(params);
  };

  const onAddClick = () => {};

  const onEditClick: ProColumns<AgentType, TABLESELECTVALUETYPE>['render'] = (_, row) => {};

  const columns: ProColumns<AgentType, TABLESELECTVALUETYPE>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
    },
    {
      title: '安装商名称',
      dataIndex: 'name',
      width: 120,
      ellipsis: true,
    },
    {
      title: '安装商ID',
      dataIndex: 'id',
      width: 120,
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: effectStatus,
    },
    {
      title: '关联安装商',
      dataIndex: 'service',
      valueType: TABLESELECT,
      key: 'service',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 150,
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
      title: '创建人',
      dataIndex: 'creator',
      hideInSearch: true,
      width: 100,
      ellipsis: true,
    },
    {
      title: '最后更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '更新人',
      dataIndex: 'operator',
      hideInSearch: true,
      width: 100,
      ellipsis: true,
    },
  ];

  const requestTable = (params: Record<string, any>) => {
    return getAgent(params).then(({ data }) => {
      return {
        data: data?.list,
        total: data?.total,
        success: true,
      };
    });
  };

  const onFinish = (params) => {
    console.log(params);
  };

  const tableSelectColumns: ProColumns<AgentType>[] = [
    {
      title: '安装商ID',
      dataIndex: 'id',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '安装商名称',
      dataIndex: 'name',
      width: 200,
      ellipsis: true,
    },
  ];

  const formColumns: ProFormColumnsType<AgentFormType, TABLESELECTVALUETYPE>[] = [
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      width: 150,
      fieldProps: {},
    },
    {
      title: '安装商',
      dataIndex: 'service',
      valueType: TABLESELECT,
      key: 'service',
      fieldProps: {
        proTableProps: { columns: tableSelectColumns, request: requestTable },
      },
    },
  ];

  return (
    <>
      <ProConfigProvider valueTypeMap={tableSelectValueTypeMap}>
        <YTProTable<AgentType, AgentType, TABLESELECTVALUETYPE>
          columns={columns}
          toolBarRender={() => [
            <BetaSchemaForm
              key="add"
              trigger={
                <Button type="primary">
                  <PlusOutlined />
                  新建
                </Button>
              }
              columns={formColumns}
              layoutType="ModalForm"
              onFinish={onFinish}
            />,
          ]}
          option={{
            columnsProp: {
              width: '120px',
            },
            onEditChange: onEditClick,
          }}
          request={requestList}
        />
      </ProConfigProvider>
    </>
  );
};

export default Agent;
