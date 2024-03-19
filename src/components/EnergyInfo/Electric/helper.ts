/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-18 18:00:46
 * @LastEditTime: 2024-03-19 10:31:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Electric\helper.ts
 */

import { DetailItem } from '@/components/Detail';
import { formatMessage } from '@/utils';

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
    className: 'detail-label-center',
  },
  {
    label: formatMessage({ id: 'siteMonitor.allDisharge', defaultMessage: '总放电量' }),
    field: 'totalDischarge',
    unit: 'kWh',
  },
];
