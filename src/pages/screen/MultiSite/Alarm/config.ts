/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-23 15:56:10
 * @LastEditTime: 2023-08-29 10:48:04
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Alarm\config.ts
 */
import { DigitStatItemType } from '../../components/DigitStat';
import IconAlarm from '@/assets/image/multi-site/alarm.png';

export const items: DigitStatItemType[] = [
  {
    icon: IconAlarm,
    title: '告警',
    unit: '条',
    field: 'total',
    valueStyle: {
      color: '#FF5656',
    },
  },
  {
    icon: IconAlarm,
    title: '超24h未处理报警',
    unit: '条',
    field: 'timeOut',
    valueStyle: {
      color: '#FFD15C',
    },
  },
];
