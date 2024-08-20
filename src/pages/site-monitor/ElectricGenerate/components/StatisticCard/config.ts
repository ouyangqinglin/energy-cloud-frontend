import { formatMessage } from '@/utils';
import { ReactComponent as icon_未发电 } from './svg/icon_未发电.svg';
import { ReactComponent as icon_正在发电 } from './svg/icon_正在发电.svg';
import { ReactComponent as icon_自发自用比例 } from './svg/icon_自发自用比例.svg';
import { ReactComponent as icon_自给自足比例 } from './svg/icon_自给自足比例.svg';
import { ReactComponent as icon_自发自用电量 } from './svg/icon_自发自用电量.svg';
import { ReactComponent as icon_自给自足电量 } from './svg/icon_自给自足电量.svg';
import { ReactComponent as icon_通信断链 } from './svg/icon_通信断链.svg';
import type { ReactNode } from 'react';

export interface EnergyStatisticInfo {
  title: string;
  icon: ReactNode;
  value: number;
  unit: string;
  field: string;
}

export const config: EnergyStatisticInfo[] = [
  {
    title: formatMessage({ id: 'siteMonitor.generatingElectricity', defaultMessage: '正在发电' }),
    icon: icon_正在发电,
    field: 'generatingElectricityDevice',
    value: 12,
    unit: formatMessage({ id: 'siteMonitor.number', defaultMessage: '台' }),
  },
  {
    title: formatMessage({ id: 'siteMonitor.notGeneratingElectricity', defaultMessage: '未发电' }),
    icon: icon_未发电,
    field: 'noGenerateElectricityDevice',
    value: 6,
    unit: formatMessage({ id: 'siteMonitor.number', defaultMessage: '台' }),
  },
  {
    title: formatMessage({ id: 'siteMonitor.communicationBreak', defaultMessage: '通信断链' }),
    icon: icon_通信断链,
    field: 'offline',
    value: 6,
    unit: formatMessage({ id: 'siteMonitor.number', defaultMessage: '台' }),
  },
  {
    title: formatMessage({
      id: 'siteMonitor.SelfGeneratedElectriConsumption',
      defaultMessage: '自发自用电量',
    }),
    icon: icon_自发自用电量,
    field: 'selfUseElectricity',
    value: 50,
    unit: 'KWh',
  },
  {
    title: formatMessage({
      id: 'siteMonitor.spontaneousSelfUseRatio',
      defaultMessage: '自发自用比例',
    }),
    icon: icon_自发自用比例,
    field: 'selfUseRate',
    value: 50,
    unit: '%',
  },
  {
    title: formatMessage({
      id: 'siteMonitor.selfSufficiencyConsumption',
      defaultMessage: '自给自足电量',
    }),
    icon: icon_自给自足电量,
    field: 'selfSufficiencyElectricity',
    value: 50,
    unit: 'KWh',
  },

  {
    title: formatMessage({
      id: 'siteMonitor.selfSufficiencyRatio',
      defaultMessage: '自给自足比例',
    }),
    icon: icon_自给自足比例,
    field: 'selfSufficiencyRate',
    value: 50,
    unit: '%',
  },
  // {
  //   title: formatMessage({ id: 'siteMonitor.ungeneratedSetString', defaultMessage: '未发电组串' }),
  //   icon: icon_未发电组串,
  //   field: 'noGenerateElectricityPv',
  //   value: 56,
  //   unit: formatMessage({ id: 'siteMonitor.string', defaultMessage: '串' }),
  // },
  // {
  //   title: formatMessage({
  //     id: 'siteMonitor.lowEfficiencyGeneratedSetString',
  //     defaultMessage: '低效发电组串',
  //   }),
  //   icon: icon_低效发电组串,
  //   field: 'lowEfficiencyGeneratingElectricityPv',
  //   value: 56,
  //   unit: formatMessage({ id: 'siteMonitor.string', defaultMessage: '串' }),
  // },
];
