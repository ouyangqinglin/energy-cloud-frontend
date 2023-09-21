import type { ProColumns } from '@ant-design/pro-components';
import type { FaultType } from './type';
import { OrderStatus } from './type';

export const orderStatus = new Map([
  [OrderStatus.READY, '待处理'],
  [OrderStatus.DEALING, '维修中'],
  [OrderStatus.CLOSE, '维修完成'],
]);

export const columns: ProColumns<FaultType>[] = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateRange',
    width: 150,
    render: (_, record) => record.createTime,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '创建人',
    dataIndex: 'createName',
    width: 100,
    ellipsis: true,
  },
  {
    title: '客户名称',
    dataIndex: 'userName',
    width: 120,
    ellipsis: true,
  },
  {
    title: '站点名称',
    dataIndex: 'siteName',
    width: 120,
    ellipsis: true,
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
    valueEnum: orderStatus,
    width: 100,
    hideInSearch: true,
  },
  {
    title: '完成时间',
    dataIndex: 'completeTime',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '安装商',
    dataIndex: 'service',
    width: 150,
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: orderStatus,
    width: 100,
    hideInTable: true,
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
    dataIndex: 'updateName',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
];
