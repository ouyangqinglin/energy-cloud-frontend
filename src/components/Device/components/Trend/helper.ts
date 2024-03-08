/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-05 15:19:49
 * @LastEditTime: 2024-03-08 14:13:15
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\components\Trend\helper.ts
 */

import { DetailItem } from '@/components/Detail';
import { formatMessage } from '@/utils';
import { powerHourFormat } from '@/utils/format';
import styles from './index.less';

export const options = {
  grid: {
    left: 0,
    top: 30,
    right: 0,
    bottom: 30,
  },
  legend: {
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
      bottom: 10,
    },
  ],
  yAxis: [
    {
      name: formatMessage({ id: 'device.chargeCapacity', defaultMessage: '充电电量' }) + '（kWh）',
      nameTextStyle: {
        align: 'left',
      },
      alignTicks: true,
    },
    {
      name: formatMessage({ id: 'device.chargeNumberUnit', defaultMessage: '充电次数（次）' }),
      nameTextStyle: {
        align: 'right',
      },
    },
  ],
  series: [
    {
      type: 'bar',
      color: 'rgba(21, 154, 255, 1)',
    },
    {
      type: 'bar',
      color: 'rgba(255, 151, 74, 1)',
    },
  ],
};

export const detailItems: DetailItem[] = [
  {
    label: formatMessage({ id: 'device.dailyChargingCapacity', defaultMessage: '日充电量' }),
    field: 'chargeElectricityTotal',
    format: powerHourFormat,
    className: styles.charge,
  },
  {
    label: formatMessage({ id: 'device.dailyChargingNumber', defaultMessage: '日充电次数' }),
    field: 'chargeCountTotal',
  },
];
