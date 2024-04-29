/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-04-24 14:07:40
 * @LastEditTime: 2024-04-24 14:07:50
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Overview\EnergyFlow\RealTimeData\Charge\helper.ts
 */
import IconCharge from '@/assets/image/site-monitor/icon_充电桩_全部.png';
import IconCharging from '@/assets/image/site-monitor/icon_充电桩_充电中.png';
import IconIdle from '@/assets/image/site-monitor/icon_充电桩_空闲中.png';
import IconOffline from '@/assets/image/site-monitor/icon_充电桩_离线中.png';
import IconAlarm from '@/assets/image/site-monitor/icon_充电桩_故障中.png';
import IconOccupy from '@/assets/image/site-monitor/icon_充电桩_占用中.png';
import { DetailItem } from '@/components/Detail';
import { formatMessage } from '@/utils';

type ConfigType = {
  icon: string;
  items: DetailItem[];
};

export const config: ConfigType[] = [
  {
    icon: IconCharge,
    items: [
      {
        label: formatMessage({ id: 'common.all', defaultMessage: '全部' }),
        field: 'totalGunNum',
      },
    ],
  },
  {
    icon: IconCharging,
    items: [
      {
        label: formatMessage({ id: 'siteMonitor.charging', defaultMessage: '充电中' }),
        field: 'chargingNum',
      },
    ],
  },
  {
    icon: IconIdle,
    items: [
      {
        label: formatMessage({ id: 'siteMonitor.idle', defaultMessage: '空闲中' }),
        field: 'freeNum',
      },
    ],
  },
  {
    icon: IconOffline,
    items: [
      {
        label: formatMessage({ id: 'siteMonitor.offline', defaultMessage: '离线中' }),
        field: 'offLineNum',
      },
    ],
  },
  {
    icon: IconAlarm,
    items: [
      {
        label: formatMessage({ id: 'siteMonitor.malfunctioning', defaultMessage: '故障中' }),
        field: 'errorNum',
      },
    ],
  },
  {
    icon: IconOccupy,
    items: [
      {
        label: formatMessage({ id: 'siteMonitor.occupied', defaultMessage: '占用中' }),
        field: 'hasUseNum',
      },
    ],
  },
];
