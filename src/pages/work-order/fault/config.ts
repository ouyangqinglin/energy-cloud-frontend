import type { ProColumns } from '@ant-design/pro-components';
import type { FaultType } from './type';
import { formatMessage } from '@/utils';
import { OrderType } from '../maintenance/type';
import { getLocale } from '@/utils';
import { YTDATERANGE } from '@/components/YTDateRange';
import type { YTDATERANGEVALUETYPE } from '@/components/YTDateRange';
// export const orderStatus = new Map([
//   [OrderStatus.READY, '待处理'],
//   [OrderStatus.DEALING, '维修中'],
//   [OrderStatus.CLOSE, '维修完成'],
// ]);
// 工单类型 0：安装工单 1：维护工单 2修复工单
export const orderType = new Map([
  [OrderType.INSTALL, formatMessage({ id: 'taskManage.install', defaultMessage: '安装' })],
  [OrderType.MAINTENANCE, formatMessage({ id: 'taskManage.maintenance', defaultMessage: '维护' })],
  [OrderType.REPAIR, formatMessage({ id: 'taskManage.repair', defaultMessage: '修复' })],
]);
export const orderStatus = {
  0: {
    text: formatMessage({ id: 'taskManage.pending', defaultMessage: '待处理' }),
  },
  1: {
    text: formatMessage({ id: 'taskManage.repairing', defaultMessage: '维修中' }),
  },
  3: {
    text: formatMessage({ id: 'taskManage.repaired', defaultMessage: '维修完成' }),
  },
  // 4: {
  //   text: '拒绝处理',
  // },
  // 5: {
  //   text: '待分配',
  // },
  6: {
    text: formatMessage({ id: 'taskManage.finished', defaultMessage: '完成' }),
  },
};
export const columns: ProColumns<FaultType, YTDATERANGEVALUETYPE>[] = [
  {
    title: formatMessage({ id: 'taskManage.creationTime', defaultMessage: '创建时间' }),
    dataIndex: 'createTime',
    valueType: YTDATERANGE,
    fieldProps: {
      dateFormat: getLocale().dateFormat,
      format: 'YYYY-MM-DD',
    },
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
    title: formatMessage({ id: 'taskManage.creater', defaultMessage: '创建人' }),
    dataIndex: 'createName',
    width: 100,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'taskManage.customerName', defaultMessage: '客户名称' }),
    dataIndex: 'userName',
    width: 120,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'siteManage.siteList.siteName', defaultMessage: '站点名称' }),
    dataIndex: 'siteName',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },

  {
    title: formatMessage({ id: 'taskManage.faultHeading', defaultMessage: '故障标题' }),
    dataIndex: 'title',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'taskManage.state', defaultMessage: '状态' }),
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: orderStatus,
    width: 100,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'taskManage.finishTime', defaultMessage: '完成时间' }),
    dataIndex: 'completeTime',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: formatMessage({ id: 'taskManage.installioner', defaultMessage: '安装商' }),
    dataIndex: 'service',
    width: 150,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'taskManage.state', defaultMessage: '状态' }),
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: orderStatus,
    width: 100,
    hideInTable: true,
  },
  {
    title: formatMessage({ id: 'taskManage.lastUpdateTime', defaultMessage: '最后更新时间' }),
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: formatMessage({ id: 'taskManage.updatedBy', defaultMessage: '更新人' }),
    dataIndex: 'updateName',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
];
