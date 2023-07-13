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
  icon: ReactNode;
  value: number;
  unit: string;
  field: string;
}

export const config: EnergyStatisticInfo[] = [
  {
    title: '正在发电',
    icon: icon_正在发电,
    field: 'generatingElectricityInverter',
    value: 12,
    unit: '台',
  },
  {
    title: '未发电',
    icon: icon_未发电,
    field: 'noGenerateElectricityInverter',
    value: 6,
    unit: '台',
  },
  {
    title: '未发电组串',
    icon: icon_未发电组串,
    field: 'noGenerateElectricityPv',
    value: 56,
    unit: '串',
  },
  {
    title: '低效发电组串',
    icon: icon_低效发电组串,
    field: 'lowEfficiencyGeneratingElectricityPv',
    value: 56,
    unit: '串',
  },
  {
    title: '通信断链',
    icon: icon_通信断链,
    field: 'offline',
    value: 6,
    unit: '台',
  },
  {
    title: '自发自用比例',
    icon: icon_自发自用比例,
    field: 'selfUseRate',
    value: 50,
    unit: '%',
  },
  {
    title: '自给自足比例',
    icon: icon_自给自足比例,
    field: 'selfSufficiencyRate',
    value: 50,
    unit: '%',
  },
];
