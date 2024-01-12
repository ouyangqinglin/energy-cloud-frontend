import { formatMessage } from '@/utils';
import { ReactComponent as icon_低效发电组串 } from './svg/icon_低效发电组串.svg';
import { ReactComponent as icon_未发电 } from './svg/icon_未发电.svg';
import { ReactComponent as icon_未发电组串 } from './svg/icon_未发电组串.svg';
import { ReactComponent as icon_正在发电 } from './svg/icon_正在发电.svg';
import { ReactComponent as icon_自发自用比例 } from './svg/icon_自发自用比例.svg';
import { ReactComponent as icon_自给自足比例 } from './svg/icon_自给自足比例.svg';
import { ReactComponent as icon_通信断链 } from './svg/icon_通信断链.svg';
import { ReactNode } from 'react';

export interface EnergyStatisticInfo {
  title: string;
  icon?: ReactNode;
  value?: (entity: any) => string;
  unit: string;
  field?: string;
}

export const config: EnergyStatisticInfo[] = [
  {
    title: formatMessage({
      id: 'siteMonitor.totalNumber/numberUsed',
      defaultMessage: '充电枪总数/使用数',
    }),
    value: (entity: any) =>
      `${entity?.chargingPile?.totalGunNum ?? 0}/${entity?.chargingPile?.beUsingGunNum ?? 0} `,
    unit: formatMessage({ id: 'siteMonitor.number', defaultMessage: '台' }),
  },
  {
    title: `${formatMessage({
      id: 'siteMonitor.chargingPileRealtimePower',
      defaultMessage: '充电桩实时功率',
    })}(kW)`,
    field: 'chargingPile.power',
    unit: formatMessage({ id: 'siteMonitor.number', defaultMessage: '台' }),
  },
  {
    title: `${formatMessage({
      id: 'siteMonitor.chargingPileDayCapacity',
      defaultMessage: '充电桩今日充电量',
    })}(kWh)`,
    icon: icon_未发电,
    field: 'chargingPile.todayCharge',
    unit: formatMessage({ id: 'siteMonitor.number', defaultMessage: '台' }),
  },
  {
    title: `${formatMessage({
      id: 'siteMonitor.chargingPileTotalCapacity',
      defaultMessage: '充电桩累计充电量',
    })}(kWh)`,
    icon: icon_未发电组串,
    field: 'chargingPile.totalCharge',
    unit: formatMessage({ id: 'siteMonitor.string', defaultMessage: '串' }),
  },
  {
    title: `${formatMessage({
      id: 'siteMonitor.otherLoadRealtimePower',
      defaultMessage: '其他负载实时功率',
    })}(kW)`,
    icon: icon_低效发电组串,
    field: 'otherLoad.power',
    unit: formatMessage({ id: 'siteMonitor.string', defaultMessage: '串' }),
  },
  {
    title: `${formatMessage({
      id: 'siteMonitor.otherLoadDayPower',
      defaultMessage: '其他负载今日用电量',
    })}(kWh)`,
    icon: icon_通信断链,
    field: 'otherLoad.todayCharge',
    unit: formatMessage({ id: 'siteMonitor.number', defaultMessage: '台' }),
  },
  {
    title: `${formatMessage({
      id: 'siteMonitor.otherLoadTotalPower',
      defaultMessage: '其他负载累计用电量',
    })}(kWh)`,
    icon: icon_自发自用比例,
    field: 'otherLoad.totalCharge',
    unit: '%',
  },
];
