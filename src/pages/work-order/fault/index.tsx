/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-24 15:15:42
 * @LastEditTime: 2023-06-19 16:59:16
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\work-order\fault\index.tsx
 */
import React, { useCallback } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import type { FaultType } from './data';
import { effectStatus } from '@/utils/dictionary';
import { getPage } from './service';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';

const Fault: React.FC = () => {
  const requestList: YTProTableCustomProps<FaultType, FaultType>['request'] = useCallback(
    (params) => {
      return getPage(params);
    },
    [],
  );

  const onDeleteChange: ProColumns<FaultType>['render'] = useCallback((_, row) => {}, []);

  const columns: ProColumns<FaultType>[] = [
    {
      title: '故障ID',
      dataIndex: 'id',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '故障标题',
      dataIndex: 'title',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: effectStatus,
      width: 100,
    },
    {
      title: '站点',
      dataIndex: 'siteName',
      width: 120,
      ellipsis: true,
    },
    {
      title: '客户',
      dataIndex: 'userName',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '工单完成时间',
      dataIndex: 'completeTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '服务商',
      dataIndex: 'serviceName',
      width: 150,
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
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
      <YTProTable<FaultType, FaultType>
        columns={columns}
        option={{
          onDeleteChange: onDeleteChange,
        }}
        toolBarRender={() => [<></>]}
        request={requestList}
      />
    </>
  );
};

export default Fault;
