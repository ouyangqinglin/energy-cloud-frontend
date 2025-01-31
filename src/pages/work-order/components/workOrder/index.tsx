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
import { effectStatus } from '@/utils/dict';
import { getPage } from './service';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { formatMessage } from '@/utils';

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
      return getPage(params);
    },
    [],
  );

  const onAddClick = useCallback(() => {}, []);

  const onEditClick: ProColumns<WorkOrderType>['render'] = useCallback((_, row) => {}, []);

  const columns: ProColumns<WorkOrderType>[] = [
    {
      title: formatMessage({ id: 'taskManage.workOrderId', defaultMessage: '工单ID' }),
      dataIndex: 'id',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'taskManage.owningSite', defaultMessage: '所属站点' }),
      dataIndex: 'orgName',
      width: 120,
      ellipsis: true,
      hideInSearch: type == PageTypeEnum.Install,
      hideInTable: true,
    },
    {
      title: formatMessage({ id: 'taskManage.workOrderType', defaultMessage: '工单类型' }),
      dataIndex: 'orgName',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'taskManage.workOrderStatus', defaultMessage: '工单状态' }),
      dataIndex: 'orgId',
      width: 120,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'taskManage.custom', defaultMessage: '客户' }),
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: effectStatus,
      width: 100,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'taskManage.maintainer', defaultMessage: '维护人员' }),
      dataIndex: 'remark',
      width: 150,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'taskManage.appointmentTime', defaultMessage: '预约时间' }),
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: formatMessage({
        id: 'taskManage.workOrderReceivingTime',
        defaultMessage: '工单接收时间',
      }),
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: formatMessage({
        id: 'taskManage.workOrderCompletionTime',
        defaultMessage: '工单完成时间',
      }),
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: formatMessage({ id: 'taskManage.installioner', defaultMessage: '安装商' }),
      dataIndex: 'createByName',
      width: 100,
      ellipsis: true,
    },
    {
      title: formatMessage({
        id: 'taskManage.workOrderCreationTime',
        defaultMessage: '工单创建时间',
      }),
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
      title: formatMessage({ id: 'taskManage.creater', defaultMessage: '创建人' }),
      dataIndex: 'createByName',
      hideInSearch: true,
      width: 100,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'taskManage.lastUpdateTime', defaultMessage: '最后更新时间' }),
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: formatMessage({ id: 'taskManage.updatedBy', defaultMessage: '更新人' }),
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
