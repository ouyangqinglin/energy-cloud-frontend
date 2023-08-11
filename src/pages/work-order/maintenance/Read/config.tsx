import { ProColumns } from '@ant-design/pro-components';
import { orderStatus, orderType } from '../config';
import { MaintenanceOrderUpdateInfo, OrderStatus, OrderType } from '../type';
export const columnsRead: ProColumns<MaintenanceOrderUpdateInfo, 'text'>[] = [
  {
    title: '故障标题',
    dataIndex: ['name'],
    colProps: {
      span: 24,
    },
  },
  {
    title: '故障描述',
    dataIndex: ['content'],
    colProps: {
      span: 24,
    },
  },
  {
    title: '工单类型',
    dataIndex: 'type',
    valueEnum: orderType,
    hideInSearch: true,
    initialValue: OrderType.MAINTENANCE,
  },
  {
    title: '工单编号',
    dataIndex: 'id',
  },
  {
    title: '工单状态',
    dataIndex: 'status',
    valueEnum: orderStatus,
    initialValue: OrderStatus.READY,
  },
  {
    title: '客户名称',
    dataIndex: ['userName'],
  },
  {
    title: '所属站点',
    dataIndex: ['siteName'],
  },
  {
    title: '联系电话',
    dataIndex: ['phone'],
  },
  {
    title: '电话',
    dataIndex: ['phone'],
  },
  {
    title: '预约时间',
    dataIndex: ['timeOfAppointment'],
  },
  {
    title: '维护人',
    dataIndex: ['handlerName'],
  },
  {
    title: '备注',
    dataIndex: ['remark'],
    colProps: {
      span: 24,
    },
  },
];
