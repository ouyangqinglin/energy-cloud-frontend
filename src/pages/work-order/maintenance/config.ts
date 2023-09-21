import type { ProColumns } from '@ant-design/pro-components';
import type { MaintenanceListType } from './type';
import { OrderStatus, OrderType } from './type';

export const orderStatus = new Map([
  [OrderStatus.READY, '待处理'],
  [OrderStatus.DEALING, '维修中'],
  [OrderStatus.COMPLETE, '维修完成'],
]);

// 工单类型 0：安装工单 1：维护工单 2修复工单
export const orderType = new Map([
  [OrderType.INSTALL, '安装'],
  [OrderType.MAINTENANCE, '维护'],
  [OrderType.REPAIR, '修复'],
]);

export const columns: ProColumns<MaintenanceListType>[] = [
  {
    title: '工单编码',
    dataIndex: 'id',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '故障标题',
    dataIndex: 'name',
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
    title: '客户名称',
    dataIndex: 'userName',
    hideInSearch: true,
    width: 120,
    ellipsis: true,
  },
  {
    title: '站点名称',
    dataIndex: 'siteName',
    hideInSearch: true,
    width: 120,
    ellipsis: true,
  },
  {
    title: '工单状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: orderStatus,
    width: 100,
    hideInTable: true,
  },
  {
    title: ' 维护人员',
    dataIndex: 'handlerName',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '工单状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: orderStatus,
    width: 100,
    hideInSearch: true,
  },
  {
    title: '预约时间',
    dataIndex: 'timeOfAppointment',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '接收时间',
    dataIndex: 'processTime',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '完成时间',
    dataIndex: 'closeTime',
    hideInSearch: true,
    valueType: 'dateTime',
    width: 150,
  },
  {
    title: '安装商',
    dataIndex: 'service',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
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
