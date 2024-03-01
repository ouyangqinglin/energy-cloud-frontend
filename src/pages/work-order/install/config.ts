import type { ProColumns } from '@ant-design/pro-components';
import type { InstallListType } from './type';
import { OrderStatus, OrderType } from './type';
import { formatMessage } from '@/utils';

export const orderStatus = new Map([
  [OrderStatus.READY, formatMessage({ id: 'taskManage.pending', defaultMessage: '待处理' })],
  [OrderStatus.DEALING, formatMessage({ id: 'taskManage.processing', defaultMessage: '安装中' })],
  [OrderStatus.COMPLETE, formatMessage({ id: 'taskManage.completed', defaultMessage: '安装完成' })],
]);

// 工单类型 0：安装工单 1：维护工单 2修复工单
export const orderType = new Map([
  [OrderType.INSTALL, formatMessage({ id: 'taskManage.install', defaultMessage: '安装' })],
  [OrderType.MAINTENANCE, formatMessage({ id: 'taskManage.maintenance', defaultMessage: '维护' })],
  [OrderType.REPAIR, formatMessage({ id: 'taskManage.repair', defaultMessage: '修复' })],
]);

export const columns: ProColumns<InstallListType>[] = [
  {
    title: formatMessage({ id: 'taskManage.workOrderCode', defaultMessage: '工单编码' }),
    dataIndex: 'id',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'taskManage.installTitle', defaultMessage: '安装标题' }),
    dataIndex: 'name',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'taskManage.workOrderType', defaultMessage: '工单类型' }),
    dataIndex: 'type',
    width: 120,
    ellipsis: true,
    valueEnum: orderType,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'taskManage.customerName', defaultMessage: '客户名称' }),
    dataIndex: 'userName',
    hideInSearch: true,
    width: 120,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'common.siteName', defaultMessage: '站点名称' }),
    dataIndex: 'siteName',
    hideInSearch: true,
    width: 120,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'taskManage.workOrderStatus', defaultMessage: '工单状态' }),
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: orderStatus,
    ellipsis: true,
    width: 140,
    hideInTable: true,
  },
  {
    title: formatMessage({ id: 'taskManage.installer', defaultMessage: '安装人员' }),
    dataIndex: 'handlerName',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'taskManage.workOrderStatus', defaultMessage: '工单状态' }),
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: orderStatus,
    width: 140,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'common.appointTime', defaultMessage: '预约时间' }),
    dataIndex: 'timeOfAppointment',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: formatMessage({ id: 'common.recepTime', defaultMessage: '接收时间' }),
    dataIndex: 'processTime',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'common.finishTime', defaultMessage: '完成时间' }),
    dataIndex: 'closeTime',
    hideInSearch: true,
    valueType: 'dateTime',
    width: 150,
  },
  {
    title: formatMessage({ id: 'taskManage.installManu', defaultMessage: '安装商' }),
    dataIndex: 'orgName',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'common.createTime', defaultMessage: '创建时间' }),
    dataIndex: 'createTime',
    valueType: 'dateTime',
    width: 150,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'common.createPerson', defaultMessage: '创建人' }),
    dataIndex: 'createName',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'common.lastTime', defaultMessage: '最后更新时间' }),
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: formatMessage({ id: 'common.renew', defaultMessage: '更新人' }),
    dataIndex: 'updateName',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'common.createTime', defaultMessage: '创建时间' }),
    dataIndex: 'createTime',
    valueType: 'dateRange',
    width: 150,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
    hideInTable: true,
  },
];
