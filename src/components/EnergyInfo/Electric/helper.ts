/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-18 18:00:46
 * @LastEditTime: 2024-03-26 15:49:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Electric\helper.ts
 */

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
  tooltip: {
    formatter: (params: any) => {
      console.log(params);
      const data0 = params?.[0]?.data;
      const data1 = params?.[1]?.data;
      return `<div>
        ${data0[0]}-${moment('2023-01-01 ' + data0[0])
        .add(1, 'h')
        .format('HH:mm')}
        <div>
          <div>${formatMessage({
            id: 'siteMonitor.allCharge',
            defaultMessage: '总充电量',
          })}：<span style="font-weight: bold;">${getPlaceholder(data0[1])}</span></div>
          <div>${formatMessage({
            id: 'siteMonitor.allDisharge',
            defaultMessage: '总放电量',
          })}：<span style="font-weight: bold;">${getPlaceholder(data1[2])}</span></div>
        </div>
      </div>`;
    },
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
