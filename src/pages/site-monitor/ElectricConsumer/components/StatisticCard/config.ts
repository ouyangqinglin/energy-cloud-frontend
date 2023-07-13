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
  value: number;
  unit: string;
}

export const config: EnergyStatisticInfo[] = [
  {
    title: '充电枪总数/使用数',
    value: 12,
    unit: '台',
  },
  {
    title: '实时功率(kW)',
    icon: icon_未发电,
    value: 6,
    unit: '台',
  },
  {
    title: '当日充电量(kWh)',
    icon: icon_未发电组串,
    value: 56,
    unit: '串',
  },
  {
    title: '累计充电量(kWh)',
    icon: icon_低效发电组串,
    value: 56,
    unit: '串',
  },
  {
    title: '实时功率(kW)',
    icon: icon_通信断链,
    value: 6,
    unit: '台',
  },
  {
    title: '当日用电量(kWh)',
    icon: icon_自发自用比例,
    value: 50,
    unit: '%',
  },
  {
    title: '累计用电量(kWh)',
    icon: icon_自给自足比例,
    value: 50,
    unit: '%',
  },
];
