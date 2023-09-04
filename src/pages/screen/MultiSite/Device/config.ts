/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-23 18:59:57
 * @LastEditTime: 2023-09-01 14:46:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Device\config.ts
 */
import { DigitStatItemType } from '../../components/DigitStat';
import IconTotal from '@/assets/image/multi-site/device/total.png';
import IconOnline from '@/assets/image/multi-site/device/online.png';
import IconAlarm from '@/assets/image/multi-site/device/alarm.png';
import IconOffline from '@/assets/image/multi-site/device/offline.png';

export const items: DigitStatItemType[] = [
  {
    icon: IconTotal,
    title: '设备总数',
    unit: '台',
    field: 'allDeviceNum',
    valueStyle: {
      color: '#34E1B6',
    },
  },
  {
    icon: IconOffline,
    title: '离线设备',
    unit: '台',
    field: 'offlineDeviceNum',
    valueStyle: {
      color: '#86A4B3',
    },
  },
];

export const onlineItems: DigitStatItemType[] = [
  {
    items: [
      {
        icon: IconOnline,
        title: '在线设备',
        unit: '台',
        field: 'onlineDeviceNum',
        valueStyle: {
          color: '#34E1B6',
        },
      },
      {
        title: '正常设备',
        unit: '台',
        field: 'normalDeviceNum',
        valueStyle: {
          color: '#4DD6F0',
        },
      },
      {
        title: '告警设备',
        unit: '台',
        field: 'alarmDeviceNum',
        valueStyle: {
          color: '#FF5656',
        },
      },
    ],
  },
];
