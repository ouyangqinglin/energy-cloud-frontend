/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-23 18:59:57
 * @LastEditTime: 2023-08-23 19:32:41
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
    field: 'a',
    valueStyle: {
      color: '#34E1B6',
    },
  },
  {
    icon: IconOnline,
    title: '在线设备',
    unit: '台',
    field: 'b',
  },
  {
    icon: IconAlarm,
    title: '告警设备',
    unit: '台',
    field: 'c',
    valueStyle: {
      color: '#FF5656',
    },
  },
  {
    icon: IconOffline,
    title: '离线设备',
    unit: '台',
    field: 'i',
    valueStyle: {
      color: '#86A4B3',
    },
  },
];
