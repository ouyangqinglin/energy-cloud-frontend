import { ProColumns } from '@ant-design/pro-components';
import { FaultType, OrderStatus } from './type';

export const columns: ProColumns<FaultType>[] = [
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
    valueEnum: new Map([
      [OrderStatus.READY, '待处理'],
      [OrderStatus.DEALING, '维修中'],
      [OrderStatus.CLOSE, '维修完成'],
      [OrderStatus.REJECT, '拒绝处理'],
    ]),
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
    title: '安装商',
    dataIndex: 'service',
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
    dataIndex: 'createName',
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
    dataIndex: 'updateName',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
];
