/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-24 15:15:42
 * @LastEditTime: 2023-06-19 14:31:47
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\partner\service\index.tsx
 */
import React, { useCallback } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ProTableProps } from '@ant-design/pro-table';
import { ProConfigProvider, BetaSchemaForm } from '@ant-design/pro-components';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import type { ServiceType, AgentFormType } from './data.d';
import { effectStatus } from '@/utils/dictionary';
import { getAgent } from '@/services/agent';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { tableSelectValueTypeMap, TABLESELECT } from '@/components/TableSelect';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';

const Service: React.FC = () => {
  const requestList: YTProTableCustomProps<ServiceType, ServiceType>['request'] = useCallback(
    (params) => {
      return getAgent(params);
    },
    [],
  );

  const onAddClick = useCallback(() => {}, []);

  const onEditClick: ProColumns<ServiceType>['render'] = useCallback((_, row) => {}, []);

  const columns: ProColumns<ServiceType>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
    },
    {
      title: '服务商名称',
      dataIndex: 'orgName',
      width: 120,
      ellipsis: true,
    },
    {
      title: '服务商ID',
      dataIndex: 'orgId',
      width: 120,
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: effectStatus,
      width: 100,
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
      dataIndex: 'createByName',
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
      dataIndex: 'updateBy',
      hideInSearch: true,
      width: 100,
      ellipsis: true,
    },
  ];

  return (
    <>
      <YTProTable<ServiceType, ServiceType>
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

export default Service;
