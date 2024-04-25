/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-18 18:00:46
 * @LastEditTime: 2024-04-25 16:06:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Electric\helper.ts
 */

import { chartTypeEnum } from '@/components/Chart/config';
import { DetailItem } from '@/components/Detail';
import { formatMessage, getPlaceholder } from '@/utils';
import moment from 'moment';

export const chartOption = {
  grid: {
    top: 30,
    bottom: 20,
  },
  legend: {
    top: 'bottom',
  },
  yAxis: {
    name: formatMessage({ id: 'common.unit', defaultMessage: '单位' }) + '（kWh）',
  },
  series: [
    {
      type: 'line',
      color: 'rgba(21, 154, 255, 1)',
    },
    {
      type: 'line',
      color: 'rgba(255, 151, 74, 1)',
    },
  ],
};

export const detailItems: DetailItem[] = [
  {
    label: formatMessage({ id: 'siteMonitor.allCharge', defaultMessage: '总充电量' }),
    field: 'totalCharge',
    unit: 'kWh',
  },
  {
    label: formatMessage({ id: 'siteMonitor.allDisharge', defaultMessage: '总放电量' }),
    field: 'totalDischarge',
    unit: 'kWh',
  },
];

export const typeMap = [
  {
    value: chartTypeEnum.Day,
    label: formatMessage({ id: 'common.time.day', defaultMessage: '日' }),
    dateType: 'date',
    format: 'YYYY-MM-DD',
  },
  {
    value: chartTypeEnum.Month,
    label: formatMessage({ id: 'common.time.month', defaultMessage: '月' }),
    dateType: 'month',
    format: 'YYYY-MM',
  },
  {
    value: chartTypeEnum.Year,
    label: formatMessage({ id: 'common.time.year', defaultMessage: '年' }),
    dateType: 'year',
    format: 'YYYY',
  },
  {
    value: chartTypeEnum.Label,
    label: formatMessage({ id: 'common.time.total', defaultMessage: '累计' }),
    dateType: 'year',
    format: 'YYYY',
  },
];
