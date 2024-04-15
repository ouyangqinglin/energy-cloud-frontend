/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-05 15:19:49
 * @LastEditTime: 2024-04-15 16:54:31
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\components\Trend\helper.tsx
 */

import { DetailItem } from '@/components/Detail';
import { formatMessage, getPlaceholder } from '@/utils';
import { powerHourFormat } from '@/utils/format';
import styles from './index.less';
import moment from 'moment';

export const options = {
  grid: {
    left: 0,
    top: 30,
    right: 0,
    bottom: 50,
  },
  legend: {
    icon: 'rect',
    top: 'bottom',
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
            id: 'device.chargeCapacity',
            defaultMessage: '充电电量',
          })}：<span style="font-weight: bold;">${getPlaceholder(data0[1])}</span></div>
          <div>${formatMessage({
            id: 'device.chargeNumber',
            defaultMessage: '充电次数',
          })}：<span style="font-weight: bold;">${getPlaceholder(data1[2])}</span></div>
        </div>
      </div>`;
    },
  },
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
    className: styles.charge,
    unit: 'kWh',
  },
  {
    label: formatMessage({ id: 'device.dailyChargingNumber', defaultMessage: '日充电次数' }),
    field: 'chargeCountTotal',
  },
];
