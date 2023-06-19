/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-24 15:15:42
 * @LastEditTime: 2023-06-19 16:16:11
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\work-order\components\workOrder\index.tsx
 */
import React, { useCallback } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import type { WorkOrderType } from './data.d';
import { effectStatus } from '@/utils/dictionary';
import { getAgent } from '@/services/agent';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';

export enum PageTypeEnum {
  Install,
  Maintenance,
}

type WorkOrderProps = {
  type?: PageTypeEnum;
};

const WorkOrder: React.FC<WorkOrderProps> = (props) => {
  const { type } = props;

  const requestList: YTProTableCustomProps<WorkOrderType, WorkOrderType>['request'] = useCallback(
    (params) => {
      return getAgent(params);
    },
    [],
  );

  const onAddClick = useCallback(() => {}, []);

  const onEditClick: ProColumns<WorkOrderType>['render'] = useCallback((_, row) => {}, []);

  const columns: ProColumns<WorkOrderType>[] = [
    {
      title: '工单ID',
      dataIndex: 'id',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '所属站点',
      dataIndex: 'orgName',
      width: 120,
      ellipsis: true,
      hideInSearch: type == PageTypeEnum.Install,
      hideInTable: true,
    },
    {
      title: '工单类型',
      dataIndex: 'orgName',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '工单状态',
      dataIndex: 'orgId',
      width: 120,
      ellipsis: true,
    },
    {
      title: '客户',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: effectStatus,
      width: 100,
      hideInSearch: true,
    },
    {
      title: '维护人员',
      dataIndex: 'remark',
      width: 150,
      ellipsis: true,
    },
    {
      title: '预约时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '工单接收时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '工单完成时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '服务商',
      dataIndex: 'createByName',
      width: 100,
      ellipsis: true,
    },
    {
      title: '工单创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
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
      <YTProTable<WorkOrderType, WorkOrderType>
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

export default WorkOrder;
