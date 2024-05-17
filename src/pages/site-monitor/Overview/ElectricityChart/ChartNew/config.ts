import { formatMessage } from '@/utils';
import { TimeType } from '../../components/TimeButtonGroup';
import { ChartConfigType, FlagType, TotalConfigType } from '../type';

export const enum SubTypeEnum {
  Power,
  Electricity,
}

export const subTypeMap = [
  { label: formatMessage({ id: 'siteMonitor.power', defaultMessage: '功率' }), value: 0 },
  { label: formatMessage({ id: 'dataManage.electricQuantity', defaultMessage: '电量' }), value: 1 },
];

export const barLegendMap = new Map([
  [
    'charge',
    formatMessage({ id: 'siteMonitor.SelfGeneratedElectriConsumption', defaultMessage: '充电量' }),
  ],
  [
    'discharge',
    formatMessage({ id: 'siteMonitor.SelfGeneratedElectriConsumption', defaultMessage: '放电量' }),
  ],
  [
    'selfUse',
    formatMessage({
      id: 'siteMonitor.SelfGeneratedElectriConsumption',
      defaultMessage: '自发自用电量',
    }),
  ],
  [
    'pvPowerGeneration',
    formatMessage({ id: 'siteManage.set.pvPowerGeneration', defaultMessage: '光伏发电量' }),
  ],
]);

export const TimeFormat = new Map([
  [TimeType.DAY, 'HH:mm'],
  [TimeType.MONTH, 'YYYY-MM-DD'],
  [TimeType.YEAR, 'YYYY-MM'],
  [TimeType.TOTAL, 'YYYY'],
]);

export const lineFieldMap: ChartConfigType[] = [
  {
    name: formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' }),
    field: 'me',
    show: false,
    color: '#FF7B7B',
    unit: 'kWh',
  },
  {
    name: formatMessage({ id: 'device.pv', defaultMessage: '光伏' }),
    field: 'pv',
    show: false,
    color: '#FFC542',
    unit: 'kWh',
  },
  {
    name: formatMessage({ id: 'device.storage', defaultMessage: '储能' }),
    field: 'es',
    show: false,
    color: '#007DFF',
    unit: 'kWh',
  },
  {
    name: formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
    field: 'cs',
    show: false,
    color: '#3DD598',
    unit: 'kWh',
  },
  {
    name: formatMessage({ id: 'device.otherLoad', defaultMessage: '其他负载' }),
    field: 'load',
    show: false,
    color: '#50B5FF',
    unit: 'kWh',
  },
];

export const barFieldMap: ChartConfigType[] = [
  {
    name: formatMessage({ id: 'siteMonitor.mainsCapacity', defaultMessage: '市电供电量' }),
    field: 'mainsUse',
    show: false,
    color: '#FF7B7B',
    unit: 'kWh',
  },
  {
    name: formatMessage({ id: 'siteManage.set.pvPowerGeneration', defaultMessage: '光伏发电量' }),
    field: 'pvPowerGeneration',
    show: false,
    color: '#FFC542',
    unit: 'kWh',
  },
  {
    name: formatMessage({ id: 'siteManage.set.energyStorageCharge', defaultMessage: '储能充电量' }),
    field: 'essCharge',
    show: false,
    color: '#007DFF',
    unit: 'kWh',
  },
  {
    name: formatMessage({
      id: 'siteManage.set.energyStorageDischarge',
      defaultMessage: '储能放电量',
    }),
    field: 'essDischarge',
    show: false,
    color: '#FF974A',
    unit: 'kWh',
  },
  {
    name: formatMessage({
      id: 'siteManage.set.chargeElectricConsumption',
      defaultMessage: '充电桩充电量',
    }),
    field: 'cpCharge',
    show: false,
    color: '#3DD598',
    unit: 'kWh',
  },
  {
    name: formatMessage({
      id: 'siteMonitor.otherLoadElectricConsumption',
      defaultMessage: '其他负载用电量',
    }),
    field: 'loadUse',
    show: false,
    color: '#50B5FF',
    unit: 'kWh',
  },
  {
    name: formatMessage({
      id: 'siteMonitor.SelfGeneratedElectriConsumption',
      defaultMessage: '自发自用电量',
    }),
    field: 'pvSelfUse',
    show: false,
    color: '#7A79FF',
    unit: 'kWh',
  },
  {
    name: formatMessage({
      id: 'index.tab.income',
      defaultMessage: '收益',
    }),
    field: 'gain',
    show: false,
    color: '#FF7B7B',
    unit: formatMessage({
      id: 'common.rmb',
      defaultMessage: '元',
    }),
  },
];
