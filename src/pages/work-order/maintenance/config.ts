import type { ProColumns } from '@ant-design/pro-components';
import type { MaintenanceListType } from './type';
import { OrderStatus, OrderType } from './type';
import { formatMessage, getLocale } from '@/utils';
import { YTDATERANGE } from '@/components/YTDateRange';
import type { YTDATERANGEVALUETYPE } from '@/components/YTDateRange';

export const orderStatus = new Map([
  [OrderStatus.READY, formatMessage({ id: 'taskManage.pending', defaultMessage: '待处理' })],
  [OrderStatus.DEALING, formatMessage({ id: 'taskManage.repairing', defaultMessage: '维修中' })],
  [OrderStatus.COMPLETE, formatMessage({ id: 'taskManage.repaired', defaultMessage: '维修完成' })],
]);

// 工单类型 0：安装工单 1：维护工单 2修复工单
export const orderType = new Map([
  [OrderType.INSTALL, formatMessage({ id: 'taskManage.install', defaultMessage: '安装' })],
  [OrderType.MAINTENANCE, formatMessage({ id: 'taskManage.maintenance', defaultMessage: '维护' })],
  [OrderType.REPAIR, formatMessage({ id: 'taskManage.repair', defaultMessage: '修复' })],
]);

export const columns: ProColumns<MaintenanceListType, YTDATERANGEVALUETYPE>[] = [
  {
    title: formatMessage({ id: 'taskManage.workOrderCode', defaultMessage: '工单编码' }),
    dataIndex: 'id',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'taskManage.failureTitle', defaultMessage: '故障标题' }),
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
    title: formatMessage({ id: 'taskManage.maintainer', defaultMessage: '维护人员' }),
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
    ellipsis: true,
    width: 140,
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
    valueType: YTDATERANGE,
    width: 150,
    fieldProps: {
      dateFormat: getLocale().dateFormat,
      format: 'YYYY-MM-DD',
    },
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
    title: formatMessage({ id: 'common.createPerson', defaultMessage: '创建人' }),
    dataIndex: 'creatName',
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
    dataIndex: 'updateBy',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
];
