/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-23 15:56:10
 * @LastEditTime: 2023-08-29 10:48:04
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Alarm\config.ts
 */
import { formatMessage } from '@/utils';
import { DigitStatItemType } from '../../components/DigitStat';
import IconAlarm from '@/assets/image/multi-site/alarm.png';

export const items: DigitStatItemType[] = [
  {
    icon: IconAlarm,
    title: formatMessage({ id: 'common.warning', defaultMessage: '告警'}),
    unit: formatMessage({ id: 'screen.num', defaultMessage: '条' }),
    field: 'total',
    valueStyle: {
      color: '#FF5656',
    },
  },
  {
    icon: IconAlarm,
    title: formatMessage({ id: 'screen.alarmNotHandledOverDay', defaultMessage: '超24h未处理报警' }),
    unit: formatMessage({ id: 'screen.num', defaultMessage: '条' }),
    field: 'timeOut',
    valueStyle: {
      color: '#FFD15C',
    },
  },
];
