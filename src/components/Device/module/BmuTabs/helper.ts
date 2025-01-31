/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-06 15:45:35
 * @LastEditTime: 2024-07-09 16:27:17
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\BmuTabs\helper.ts
 */

import { formatMessage } from '@/utils';
import { DeviceTypeEnum } from '@/utils/dictionary';

export const cellText = formatMessage({ id: 'siteMonitor.cell', defaultMessage: '电芯' });
export const tempText = formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' });
const voltageText = formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压' });

export const chartOptions = {
  grid: {
    bottom: 50,
  },
  legend: {
    icon: 'rect',
  },
  tooltip: {
    formatter: (params: any) => {
      const { value, name } = (params || {})[0];
      return (
        name + '：' + (value[1] === '' ? (value[2] === '' ? '' : value[2] + '℃') : value[1] + 'V')
      );
    },
  },
  xAxis: {
    triggerEvent: true,
  },
  yAxis: [
    {
      name: voltageText + '(V)',
      nameTextStyle: {
        align: 'left',
      },
      alignTicks: true,
    },
    {
      name: tempText + '(℃)',
      nameTextStyle: {
        align: 'right',
      },
    },
  ],
  series: [
    {
      type: 'bar',
      barMaxWidth: 10,
      stack: 'Total',
      itemStyle: {
        color: 'rgba(0, 125, 255, 1)',
      },
    },
    {
      type: 'bar',
      yAxisIndex: 1,
      barMaxWidth: 10,
      stack: 'Total',
      itemStyle: {
        color: 'rgba(61, 213, 152, 1)',
      },
    },
  ],
  dataZoom: [
    {
      type: 'inside',
    },
    {
      start: 0,
      end: 100,
      height: 15,
    },
  ],
};

export const getFieldByLabel = (label: string) => {
  const num = label.replace(cellText, '').replace(tempText, '');
  const field = label.indexOf(cellText) > -1 ? 'Voltage' : 'Temperature';
  return field + num;
};

export const defaultLables = [
  cellText + 1,
  cellText + 2,
  tempText + 1,
  cellText + 3,
  cellText + 4,
  tempText + 2,
  cellText + 5,
  cellText + 6,
  tempText + 3,
  cellText + 7,
  cellText + 8,
  tempText + 4,
  cellText + 9,
  cellText + 10,
  tempText + 5,
  cellText + 11,
  cellText + 12,
  tempText + 6,
  cellText + 13,
  cellText + 14,
  tempText + 7,
  cellText + 15,
  cellText + 16,
  tempText + 8,
  cellText + 17,
  cellText + 18,
  tempText + 9,
  cellText + 19,
  cellText + 20,
  tempText + 10,
  cellText + 21,
  cellText + 22,
  tempText + 11,
  cellText + 23,
  cellText + 24,
  tempText + 12,
  tempText + 13,
];

const lables24_12 = [
  cellText + 1,
  cellText + 2,
  tempText + 1,
  cellText + 3,
  cellText + 4,
  tempText + 2,
  cellText + 5,
  cellText + 6,
  tempText + 3,
  cellText + 7,
  cellText + 8,
  tempText + 4,
  cellText + 9,
  cellText + 10,
  tempText + 5,
  cellText + 11,
  cellText + 12,
  tempText + 6,
  cellText + 13,
  cellText + 14,
  tempText + 7,
  cellText + 15,
  cellText + 16,
  tempText + 8,
  cellText + 17,
  cellText + 18,
  tempText + 9,
  cellText + 19,
  cellText + 20,
  tempText + 10,
  cellText + 21,
  cellText + 22,
  tempText + 11,
  cellText + 23,
  cellText + 24,
  tempText + 12,
];

const lables52_29 = [
  tempText + 1,
  cellText + 1,
  tempText + 2,
  cellText + 2,
  cellText + 3,
  tempText + 3,
  cellText + 4,
  cellText + 5,
  tempText + 4,
  cellText + 6,
  cellText + 7,
  tempText + 5,
  cellText + 8,
  cellText + 9,
  tempText + 6,
  cellText + 10,
  cellText + 11,
  tempText + 7,
  cellText + 12,
  cellText + 13,
  tempText + 8,
  cellText + 14,
  cellText + 15,
  cellText + 16,
  tempText + 9,
  cellText + 17,
  cellText + 18,
  tempText + 10,
  cellText + 19,
  cellText + 20,
  tempText + 11,
  cellText + 21,
  cellText + 22,
  tempText + 12,
  cellText + 23,
  cellText + 24,
  tempText + 13,
  cellText + 25,
  cellText + 26,
  tempText + 14,
  cellText + 27,
  tempText + 15,
  tempText + 16,
  cellText + 28,
  cellText + 29,
  tempText + 17,
  cellText + 30,
  cellText + 31,
  tempText + 18,
  cellText + 32,
  cellText + 33,
  tempText + 19,
  cellText + 34,
  cellText + 35,
  tempText + 20,
  cellText + 36,
  cellText + 37,
  tempText + 21,
  cellText + 38,
  cellText + 39,
  tempText + 22,
  cellText + 40,
  cellText + 41,
  cellText + 42,
  tempText + 23,
  cellText + 43,
  cellText + 44,
  tempText + 24,
  cellText + 45,
  cellText + 46,
  tempText + 25,
  cellText + 47,
  cellText + 48,
  tempText + 26,
  cellText + 49,
  cellText + 50,
  tempText + 27,
  cellText + 51,
  cellText + 52,
  tempText + 28,
  tempText + 29,
];

const lables48_16 = [
  tempText + 1,
  cellText + 1,
  cellText + 2,
  tempText + 2,
  cellText + 3,
  cellText + 4,
  cellText + 5,
  cellText + 6,
  cellText + 7,
  tempText + 3,
  cellText + 8,
  cellText + 9,
  cellText + 10,
  cellText + 11,
  cellText + 12,
  tempText + 4,
  tempText + 5,
  cellText + 13,
  tempText + 6,
  cellText + 14,
  cellText + 15,
  cellText + 16,
  cellText + 17,
  cellText + 18,
  cellText + 19,
  tempText + 7,
  cellText + 20,
  cellText + 21,
  cellText + 22,
  cellText + 23,
  cellText + 24,
  tempText + 8,
  tempText + 9,
  cellText + 25,
  tempText + 10,
  cellText + 26,
  cellText + 27,
  cellText + 28,
  cellText + 29,
  cellText + 30,
  cellText + 31,
  tempText + 11,
  cellText + 32,
  cellText + 33,
  cellText + 34,
  cellText + 35,
  cellText + 36,
  tempText + 12,
  tempText + 13,
  cellText + 37,
  tempText + 14,
  cellText + 38,
  cellText + 39,
  cellText + 40,
  cellText + 41,
  cellText + 42,
  cellText + 43,
  tempText + 15,
  cellText + 44,
  cellText + 45,
  cellText + 46,
  cellText + 47,
  cellText + 48,
  tempText + 16,
];

const lables48_29 = [
  tempText + 1,
  cellText + 1,
  tempText + 2,
  cellText + 2,
  cellText + 3,
  tempText + 3,
  cellText + 4,
  cellText + 5,
  tempText + 4,
  cellText + 6,
  cellText + 7,
  tempText + 5,
  cellText + 8,
  cellText + 9,
  tempText + 6,
  cellText + 10,
  cellText + 11,
  tempText + 7,
  cellText + 12,
  tempText + 8,
  cellText + 13,
  tempText + 9,
  cellText + 14,
  cellText + 15,
  tempText + 10,
  cellText + 16,
  cellText + 17,
  tempText + 11,
  cellText + 18,
  cellText + 19,
  tempText + 12,
  cellText + 20,
  cellText + 21,
  tempText + 13,
  cellText + 22,
  cellText + 23,
  tempText + 14,
  cellText + 24,
  tempText + 15,
  cellText + 25,
  tempText + 16,
  cellText + 26,
  cellText + 27,
  tempText + 17,
  cellText + 28,
  cellText + 29,
  tempText + 18,
  cellText + 30,
  cellText + 31,
  tempText + 19,
  cellText + 32,
  cellText + 33,
  tempText + 20,
  cellText + 34,
  cellText + 35,
  tempText + 21,
  cellText + 36,
  tempText + 22,
  cellText + 37,
  tempText + 23,
  cellText + 38,
  cellText + 39,
  tempText + 24,
  cellText + 40,
  cellText + 41,
  tempText + 25,
  cellText + 42,
  cellText + 43,
  tempText + 26,
  cellText + 44,
  cellText + 45,
  tempText + 27,
  cellText + 46,
  cellText + 47,
  tempText + 28,
  cellText + 48,
  tempText + 29,
];

export const bumConfigMap = new Map<
  DeviceTypeEnum | undefined,
  { bmuNum: number; labels: string[] }
>([
  [DeviceTypeEnum.Device, { bmuNum: 10, labels: defaultLables }],
  [DeviceTypeEnum.LiquidEnergy232BatteryPack, { bmuNum: 5, labels: lables52_29 }],
  [DeviceTypeEnum.Liquid2Battery16, { bmuNum: 5, labels: lables48_16 }],
  [DeviceTypeEnum.LiquidEnergy232ABatteryPack, { bmuNum: 5, labels: lables52_29 }],

  [DeviceTypeEnum.LiquidEnergyBatteryStack, { bmuNum: 5, labels: lables48_29 }],
  [DeviceTypeEnum.Liquid2EnergyBatteryCluster, { bmuNum: 5, labels: lables48_29 }],

  [DeviceTypeEnum.SmallEnergyBatteryCluster, { bmuNum: 10, labels: lables24_12 }],
  [DeviceTypeEnum.PvEnergyBms, { bmuNum: 9, labels: lables24_12 }],
  [DeviceTypeEnum.FGCCEnergyBatteryCluster, { bmuNum: 7, labels: defaultLables }],
]);
