import { ProColumns } from '@ant-design/pro-components';
import { orderStatus, orderType } from '../config';
import { InstallOrderUpdateInfo, OrderStatus, OrderType } from '../type';
export const columnsRead: ProColumns<InstallOrderUpdateInfo, 'text'>[] = [
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
    title: '所属安装商',
    dataIndex: ['orgName'],
  },
  {
    title: '联系电话',
    dataIndex: ['phone'],
  },
  {
    title: '预约时间',
    dataIndex: ['timeOfAppointment'],
  },
  {
    title: '安装人',
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
