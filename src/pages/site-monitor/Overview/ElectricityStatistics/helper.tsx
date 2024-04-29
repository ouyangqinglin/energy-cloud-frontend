/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-04-25 14:41:29
 * @LastEditTime: 2024-04-25 16:19:56
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Overview\ElectricityStatistics\helper.tsx
 */

import { DetailItem } from '@/components/Detail';
import { formatMessage } from '@/utils';

export const options = {
  grid: {
    left: 0,
    top: 30,
    right: 20,
    bottom: 50,
  },
  legend: {
    top: 'bottom',
    icon: 'rect',
  },
  dataZoom: [
    {
      type: 'inside',
    },
    {
      start: 0,
      end: 100,
      height: 15,
      bottom: 30,
    },
  ],
  yAxis: [
    {
      name: '（kWh）',
      nameTextStyle: {
        align: 'left',
      },
      alignTicks: true,
    },
    {
      name: formatMessage({ id: 'siteMonitor.order', defaultMessage: '单' }),
      nameTextStyle: {
        align: 'right',
      },
    },
  ],
  series: [
    {
      type: 'bar',
      color: '#FF7B7B',
      barMaxWidth: 10,
    },
    {
      type: 'bar',
      color: '#007DFF',
      barMaxWidth: 10,
    },
    {
      type: 'bar',
      color: '#50B5FF',
      barMaxWidth: 10,
    },
    {
      type: 'bar',
      color: '#3DD598',
      barMaxWidth: 10,
      yAxisIndex: 1,
    },
  ],
};

export const detailItems: DetailItem[] = [
  {
    label: formatMessage({ id: 'siteMonitor.mainsCapacity', defaultMessage: '市电供电量' }),
    field: 'grid',
    unit: 'kWh',
  },
  {
    label: formatMessage({
      id: 'siteMonitor.chargingPileChargingAmount',
      defaultMessage: '充电桩充电量',
    }),
    field: 'charge',
    unit: 'kWh',
  },
  {
    label: formatMessage({
      id: 'siteMonitor.otherLoadElectricConsumption',
      defaultMessage: '其他负载用电量',
    }),
    field: 'otherLoad',
    unit: 'kWh',
  },
  {
    label: formatMessage({ id: 'device.numberOfChargingOrders', defaultMessage: '充电订单数' }),
    field: 'order',
    unit: formatMessage({ id: 'siteMonitor.order', defaultMessage: '单' }),
  },
];
