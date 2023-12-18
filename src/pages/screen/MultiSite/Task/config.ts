/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-23 19:07:33
 * @LastEditTime: 2023-08-23 19:08:29
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Task\config.ts
 */
import { formatMessage } from '@/utils';
import { DigitStatItemType } from '../../components/DigitStat';

export const items: DigitStatItemType[] = [
  {
    items: [
      {
        title: formatMessage({ id: 'screen.installationOrder', defaultMessage: '安装工单' }),
        unit: formatMessage({ id: 'screen.order', defaultMessage: '单' }),
        field: 'installationInfo.total',
        valueStyle: {
          color: '#34E1B6',
        },
        format: (value) => ({ value, unit: '' }),
      },
      {
        title: formatMessage({ id: 'taskManage.pending', defaultMessage: '待处理' }),
        unit: formatMessage({ id: 'screen.order', defaultMessage: '单' }),
        field: 'installationInfo.pendingProcessing',
        valueStyle: {
          color: '#FFD15C',
        },
        format: (value) => ({ value, unit: '' }),
      },
      {
        title: formatMessage({
          id: 'screen.ordersExceedingDay',
          defaultMessage: '超24h未处理工单',
        }),
        unit: formatMessage({ id: 'screen.order', defaultMessage: '单' }),
        field: 'installationInfo.timeout',
        valueStyle: {
          color: '#4DD6F0',
        },
        format: (value) => ({ value, unit: '' }),
      },
    ],
  },
  {
    items: [
      {
        title: formatMessage({ id: 'screen.maintenanceOrder', defaultMessage: '维护工单' }),
        unit: formatMessage({ id: 'screen.order', defaultMessage: '单' }),
        field: 'maintenanceInfo.total',
        valueStyle: {
          color: '#34E1B6',
        },
        format: (value) => ({ value, unit: '' }),
      },
      {
        title: formatMessage({ id: 'taskManage.pending', defaultMessage: '待处理' }),
        unit: formatMessage({ id: 'screen.order', defaultMessage: '单' }),
        field: 'maintenanceInfo.pendingProcessing',
        valueStyle: {
          color: '#FFD15C',
        },
        format: (value) => ({ value, unit: '' }),
      },
      {
        title: formatMessage({
          id: 'screen.ordersExceedingDay',
          defaultMessage: '超24h未处理工单',
        }),
        unit: formatMessage({ id: 'screen.order', defaultMessage: '单' }),
        field: 'maintenanceInfo.timeout',
        valueStyle: {
          color: '#4DD6F0',
        },
        format: (value) => ({ value, unit: '' }),
      },
    ],
  },
  {
    items: [
      {
        title: formatMessage({ id: 'screen.customerReportForm', defaultMessage: '客户报障单' }),
        unit: formatMessage({ id: 'screen.order', defaultMessage: '单' }),
        field: 'obstacleInfo.total',
        valueStyle: {
          color: '#34E1B6',
        },
        format: (value) => ({ value, unit: '' }),
      },
      {
        title: formatMessage({ id: 'taskManage.pending', defaultMessage: '待处理' }),
        unit: formatMessage({ id: 'screen.order', defaultMessage: '单' }),
        field: 'obstacleInfo.pendingProcessing',
        valueStyle: {
          color: '#FFD15C',
        },
        format: (value) => ({ value, unit: '' }),
      },
      {
        title: formatMessage({
          id: 'screen.ordersExceedingDay',
          defaultMessage: '超24h未处理工单',
        }),
        unit: formatMessage({ id: 'screen.order', defaultMessage: '单' }),
        field: 'obstacleInfo.timeout',
        valueStyle: {
          color: '#4DD6F0',
        },
        format: (value) => ({ value, unit: '' }),
      },
    ],
  },
];
