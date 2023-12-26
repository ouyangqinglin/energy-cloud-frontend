import { formatMessage } from '@/utils';
import { TimeType } from '../../components/TimeButtonGroup';
import { ChartConfigType, FlagType } from '../type';

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
  [TimeType.MONTH, 'YYYY-MM-DD'],
  [TimeType.YEAR, 'YYYY-MM'],
  [TimeType.TOTAL, 'YYYY'],
]);

export const lineFieldMap: ChartConfigType[] = [
  {
    name: formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' }),
    field: 'me',
    flag: FlagType.ELECTRIC_SUPPLY_TYPE,
    show: false,
  },
  {
    name: formatMessage({ id: 'device.pv', defaultMessage: '光伏' }),
    field: 'pv',
    flag: FlagType.PHOTOVOLTAIC_TYPE,
    show: false,
  },
  {
    name: formatMessage({ id: 'device.storage', defaultMessage: '储能' }),
    field: 'es',
    flag: FlagType.ES_TYPE,
    show: false,
  },
  {
    name: formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
    field: 'cs',
    flag: FlagType.CHARGING_TYPE,
    show: false,
  },
  {
    name: formatMessage({ id: 'device.otherLoad', defaultMessage: '其他负载' }),
    field: 'load',
    flag: FlagType.LOAD_TYPE,
    show: false,
  },
];

export const barFieldMap: ChartConfigType[] = [
  {
    name: formatMessage({
      id: 'siteMonitor.SelfGeneratedElectriConsumption',
      defaultMessage: '自发自用电量',
    }),
    field: 'pvSelfUse',
    flag: FlagType.PHOTOVOLTAIC_TYPE,
    show: false,
  },
  {
    name: formatMessage({ id: 'siteManage.set.pvPowerGeneration', defaultMessage: '光伏发电量' }),
    field: 'pvPowerGeneration',
    flag: FlagType.PHOTOVOLTAIC_TYPE,
    show: false,
  },
  {
    name: formatMessage({ id: 'siteMonitor.mainsCapacity', defaultMessage: '市电电量' }),
    field: 'mainsUse',
    flag: FlagType.ELECTRIC_SUPPLY_TYPE,
    show: false,
  },
  {
    name: formatMessage({ id: 'siteManage.set.energyStorageCharge', defaultMessage: '储能充电量' }),
    field: 'essCharge',
    flag: FlagType.ES_TYPE,
    show: false,
  },
  {
    name: formatMessage({
      id: 'siteManage.set.energyStorageDischarge',
      defaultMessage: '储能放电量',
    }),
    field: 'essDisCharge',
    flag: FlagType.ES_TYPE,
    show: false,
  },
  {
    name: formatMessage({
      id: 'siteMonitor.chargingPileChargingAmount',
      defaultMessage: '充电桩充电量',
    }),
    field: 'cpCharge',
    flag: FlagType.CHARGING_TYPE,
    show: false,
  },
  {
    name: formatMessage({
      id: 'siteMonitor.otherLoadElectricConsumption',
      defaultMessage: '其他负载用电量',
    }),
    field: 'loadUse',
    flag: FlagType.LOAD_TYPE,
    show: false,
  },
];
