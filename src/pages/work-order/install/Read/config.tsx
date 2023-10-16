import { ProColumns } from '@ant-design/pro-components';
import { orderStatus, orderType } from '../config';
import { InstallOrderUpdateInfo, OrderStatus, OrderType } from '../type';
import { formatMessage } from '@/utils'
import { FormattedMessage, } from 'umi';
export const columnsRead: ProColumns<InstallOrderUpdateInfo, 'text'>[] = [
  {
    title: formatMessage({ id: 'taskManage.installTitle', defaultMessage: '安装标题' }),
    dataIndex: 'name',
    colProps: {
      span: 24,
    },
  },
  {
    title: formatMessage({ id: 'taskManage.installDesc', defaultMessage: '安装描述' }),
    dataIndex: 'content',
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
    title: formatMessage({ id: 'taskManage.installManu', defaultMessage: '安装商' }),
    dataIndex: ['orgName'],
  },
  {
    title: formatMessage({ id: 'common.telephone', defaultMessage: '联系电话' }),
    dataIndex: ['phone'],
  },
  {
    title: formatMessage({ id: 'common.appointTime', defaultMessage: '预约时间' }),
    dataIndex: ['timeOfAppointment'],
  },
  {
    title: formatMessage({ id: 'taskManage.installer', defaultMessage: '安装人' }),
    dataIndex: ['handlerName'],
  },
  {
    title: formatMessage({ id: 'common.remark', defaultMessage: '备注' }),
    dataIndex: ['remark'],
    colProps: {
      span: 24,
    },
  },
];
