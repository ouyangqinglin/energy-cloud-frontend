import { ProColumns } from '@ant-design/pro-components';
import { orderStatus, orderType } from '../config';
import { MaintenanceOrderUpdateInfo, OrderStatus, OrderType } from '../type';
import { formatMessage } from '@/utils';
export const columnsRead: ProColumns<MaintenanceOrderUpdateInfo, 'text'>[] = [
  {
    title: formatMessage({ id: 'taskManage.faultHeading', defaultMessage: '故障标题' }),
    dataIndex: ['name'],
    colProps: {
      span: 24,
    },
  },
  {
    title: formatMessage({ id: 'taskManage.faultDescription', defaultMessage: '故障描述' }),
    dataIndex: ['content'],
    colProps: {
      span: 24,
    },
  },
  {
    title: formatMessage({ id: 'taskManage.workOrderType', defaultMessage: '工单类型' }),
    dataIndex: 'type',
    valueEnum: orderType,
    hideInSearch: true,
    initialValue: OrderType.MAINTENANCE,
  },
  {
    title: formatMessage({ id: 'taskManage.workOrderNumber', defaultMessage: '工单编号' }),
    dataIndex: 'id',
  },
  {
    title: formatMessage({ id: 'taskManage.workOrderStatus', defaultMessage: '工单状态' }),
    dataIndex: 'status',
    valueEnum: orderStatus,
    initialValue: OrderStatus.READY,
  },
  {
    title: formatMessage({ id: 'taskManage.customerName', defaultMessage: '客户名称' }),
    dataIndex: ['userName'],
  },
  {
    title: formatMessage({ id: 'taskManage.owningSite', defaultMessage: '所属站点' }),
    dataIndex: ['siteName'],
  },
  {
    title: formatMessage({ id: 'taskManage.contactNumber', defaultMessage: '联系电话' }),
    dataIndex: ['phone'],
  },
  {
    title: formatMessage({ id: 'taskManage.phone', defaultMessage: '电话' }),
    dataIndex: ['phone'],
  },
  {
    title: formatMessage({ id: 'taskManage.appointmentTime', defaultMessage: '预约时间' }),
    dataIndex: ['timeOfAppointment'],
  },
  {
    title: formatMessage({ id: 'taskManage.maintainer', defaultMessage: '维护人员' }),
    dataIndex: ['handlerName'],
  },
  {
    title: formatMessage({ id: 'taskManage.remark', defaultMessage: '备注' }),
    dataIndex: ['remark'],
    colProps: {
      span: 24,
    },
  },
];
