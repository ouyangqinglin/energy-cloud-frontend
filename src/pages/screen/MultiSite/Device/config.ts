/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-23 18:59:57
 * @LastEditTime: 2023-09-05 09:25:42
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Device\config.ts
 */
import { DigitStatItemType } from '../../components/DigitStat';
import IconTotal from '@/assets/image/multi-site/device/total.png';
import IconOnline from '@/assets/image/multi-site/device/online.png';
import IconAlarm from '@/assets/image/multi-site/device/alarm.png';
import IconOffline from '@/assets/image/multi-site/device/offline.png';
import { formatMessage } from '@/utils';

export const items: DigitStatItemType[] = [
  {
    icon: IconTotal,
    title: formatMessage({ id: 'screen.totalNumberDevices', defaultMessage: '设备总数' }),
    unit: formatMessage({ id: 'siteMonitor.number', defaultMessage: '台' }),
    field: 'allDeviceNum',
    valueStyle: {
      color: 'white',
    },
  },
  {
    icon: IconOffline,
    title: formatMessage({ id: 'screen.offLineDevices', defaultMessage: '离线设备' }),
    unit: formatMessage({ id: 'siteMonitor.number', defaultMessage: '台' }),
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
        title: formatMessage({ id: 'screen.onLineDevices', defaultMessage: '在线设备' }),
        unit: formatMessage({ id: 'siteMonitor.number', defaultMessage: '台' }),
        field: 'onlineDeviceNum',
        valueStyle: {
          color: '#34E1B6',
        },
      },
      {
        title: formatMessage({ id: 'screen.normalDevices', defaultMessage: '正常设备' }),
        unit: formatMessage({ id: 'siteMonitor.number', defaultMessage: '台' }),
        field: 'normalDeviceNum',
        valueStyle: {
          color: '#4DD6F0',
        },
      },
      {
        title: formatMessage({ id: 'screen.alarmDevice', defaultMessage: '告警设备' }),
        unit: formatMessage({ id: 'siteMonitor.number', defaultMessage: '台' }),
        field: 'alarmDeviceNum',
        valueStyle: {
          color: '#FF5656',
        },
      },
    ],
  },
];
