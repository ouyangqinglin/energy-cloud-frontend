import { ProColumns } from '@ant-design/pro-components';
import { InstallListType, OrderStatus, OrderType } from './type';

export const orderStatus = new Map([
  [OrderStatus.READY, '待处理'],
  [OrderStatus.DEALING, '维修中'],
  [OrderStatus.CLOSE, '维修完成'],
  [OrderStatus.REJECT, '拒绝处理'],
]);

// 工单类型 0：安装工单 1：维护工单 2修复工单
export const orderType = new Map([
  [OrderType.INSTALL, '安装'],
  [OrderType.MAINTENANCE, '维护'],
  [OrderType.REPAIR, '修复'],
]);

export const columns: ProColumns<InstallListType>[] = [
  {
    title: '工单ID',
    dataIndex: 'id',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '工单类型',
    dataIndex: 'type',
    width: 120,
    ellipsis: true,
    valueEnum: orderType,
    hideInSearch: true,
  },
  {
    title: '工单状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: orderStatus,
    width: 100,
  },
  {
    title: '客户',
    dataIndex: 'userName',
    hideInSearch: true,
    width: 120,
    ellipsis: true,
  },
  {
    title: ' 维护人员',
    dataIndex: 'handlerName',
    width: 120,
    ellipsis: true,
  },
  {
    title: '预约时间',
    dataIndex: 'timeOfAppointment',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '工单接收时间',
    dataIndex: 'processTime',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '工单完成时间',
    dataIndex: 'closeTime',
    hideInSearch: true,
    valueType: 'dateTime',
    width: 150,
  },
  {
    title: '服务商',
    dataIndex: 'service',
    // hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
  {
    title: '工单创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    width: 150,
  },
  {
    title: '创建人',
    dataIndex: 'creatName',
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
