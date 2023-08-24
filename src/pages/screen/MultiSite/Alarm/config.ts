/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-23 15:56:10
 * @LastEditTime: 2023-08-23 15:56:14
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
    field: 'a',
    valueStyle: {
      color: '#FF5656',
    },
  },
  {
    icon: IconAlarm,
    title: '超24h未处理报警',
    unit: '条',
    field: 'b',
    valueStyle: {
      color: '#FFD15C',
    },
  },
];
