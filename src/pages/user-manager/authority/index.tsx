/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 14:00:13
 * @LastEditTime: 2023-06-19 14:18:38
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\user-manager\authority\index.tsx
 */
import React, { useCallback } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ProTableProps } from '@ant-design/pro-table';
import { ProConfigProvider, BetaSchemaForm } from '@ant-design/pro-components';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import type { AuthorityType, AgentFormType } from './data.d';
import { effectStatus, dataSource } from '@/utils/dictionary';
import { getAgent } from '@/services/agent';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { tableSelectValueTypeMap, TABLESELECT } from '@/components/TableSelect';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';

const Agent: React.FC = () => {
  const requestList: YTProTableCustomProps<AuthorityType, AuthorityType>['request'] = (params) => {
    return getAgent(params);
  };

  const onAddClick = useCallback(() => {}, []);

  const onEditClick: ProColumns<AuthorityType>['render'] = useCallback((_, row) => {}, []);

  const columns: ProColumns<AuthorityType>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      width: 120,
      ellipsis: true,
    },
    {
      title: '数据来源',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: dataSource,
      width: 120,
      hideInSearch: true,
    },
    {
      title: 'web权限',
      dataIndex: 'authority',
      width: 120,
      hideInSearch: true,
      render: (_, record) => {
        return record.type ? <a>配置</a> : '--';
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      width: 100,
      valueEnum: effectStatus,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
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
      dataIndex: 'updateByName',
      hideInSearch: true,
      width: 100,
      ellipsis: true,
    },
  ];

  return (
    <>
      <YTProTable<AuthorityType, AuthorityType>
        columns={columns}
        option={{
          columnsProp: {
            width: '120px',
          },
          onEditChange: onEditClick,
        }}
        request={requestList}
      />
    </>
  );
};

export default Agent;
