import { formatMessage } from '@/utils';
import { TimeType } from '../../components/TimeButtonGroup';
import { ChartConfigType, FlagType, TotalConfigType } from '../type';

export const subTypeMap = [
  { label: formatMessage({ id: 'siteMonitor.powerCurve', defaultMessage: '功率曲线' }), value: 0 },
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
    flag: FlagType.ELECTRIC_SUPPLY_TYPE,
    show: false,
    color: '#FF7B7B',
  },
  {
    name: formatMessage({ id: 'device.pv', defaultMessage: '光伏' }),
    field: 'pv',
    flag: FlagType.PHOTOVOLTAIC_TYPE,
    show: false,
    color: '#FFC542',
  },
  {
    name: formatMessage({ id: 'device.storage', defaultMessage: '储能系统' }),
    field: 'es',
    flag: FlagType.ES_TYPE,
    show: false,
    color: '#FFC542',
  },
  {
    name: formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
    field: 'cs',
    flag: FlagType.CHARGING_TYPE,
    show: false,
    color: '#3DD598',
  },
  {
    name: formatMessage({ id: 'device.otherLoad', defaultMessage: '其他负载' }),
    field: 'load',
    flag: FlagType.LOAD_TYPE,
    show: false,
    color: '#50B5FF',
  },
];

export const totalMap: TotalConfigType[] = [
  {
    name: formatMessage({ id: 'device.electricSupplyTotalize', defaultMessage: '市电累计值' }),
    field: 'mainsUseTotal',
    value: '--',
  },
  {
    name: formatMessage({
      id: 'screen.pvPowerGenerationTotalize',
      defaultMessage: '光伏发电累计值',
    }),
    field: 'pvPowerGenerationTotal',
    value: '--',
  },
  {
    name: formatMessage({ id: 'screen.pvPowerSelfuseTotalize', defaultMessage: '光伏自用累计值' }),
    field: 'pvSelfPowerTotal',
    value: '--',
  },
  {
    name: formatMessage({
      id: 'dataManage.storageChargingTotalize',
      defaultMessage: '储能充电累计值',
    }),
    field: 'essChargeTotal',
    value: '--',
  },
  {
    name: formatMessage({
      id: 'dataManage.storageDischargeTotalize',
      defaultMessage: '储能放电累计值',
    }),
    field: 'essDischargeTotal',
    value: '--',
  },
  {
    name: formatMessage({ id: 'device.chargingPileTotalize', defaultMessage: '充电桩累计值' }),
    field: 'cpChargeTotal',
    value: '--',
  },
  {
    name: formatMessage({ id: 'device.otherLoadTotalize', defaultMessage: '其他负载累计值' }),
    field: 'loadUseTotal',
    value: '--',
  },
  {
    name: formatMessage({ id: 'index.tab.incomeTotalize', defaultMessage: '收益累计值' }),
    field: 'gainTotal',
    value: '--',
  },
];

export const barFieldMap: ChartConfigType[] = [
  {
    name: formatMessage({ id: 'siteMonitor.mainsCapacity', defaultMessage: '市电电量' }),
    field: 'mainsUse',
    flag: FlagType.ELECTRIC_SUPPLY_TYPE,
    show: false,
    color: '#FF7B7B',
  },
  {
    name: formatMessage({ id: 'siteManage.set.pvPowerGeneration', defaultMessage: '光伏发电量' }),
    field: 'pvPowerGeneration',
    flag: FlagType.PHOTOVOLTAIC_TYPE,
    show: false,
    color: '#FFC542',
  },
  {
    name: formatMessage({ id: 'siteManage.set.energyStorageCharge', defaultMessage: '储能充电量' }),
    field: 'essCharge',
    flag: FlagType.ES_TYPE,
    show: false,
    color: '#007DFF',
  },
  {
    name: formatMessage({
      id: 'siteManage.set.energyStorageDischarge',
      defaultMessage: '储能放电量',
    }),
    field: 'essDisCharge',
    flag: FlagType.ES_TYPE,
    show: false,
    color: '#FF974A',
  },
  {
    name: formatMessage({
      id: 'siteMonitor.chargingPileChargingAmount',
      defaultMessage: '充电桩充电量',
    }),
    field: 'cpCharge',
    flag: FlagType.CHARGING_TYPE,
    show: false,
    color: '#3DD598',
  },
  {
    name: formatMessage({
      id: 'siteMonitor.otherLoadElectricConsumption',
      defaultMessage: '其他负载用电量',
    }),
    field: 'loadUse',
    flag: FlagType.LOAD_TYPE,
    show: false,
    color: '#50B5FF',
  },
  {
    name: formatMessage({
      id: 'siteMonitor.SelfGeneratedElectriConsumption',
      defaultMessage: '自发自用电量',
    }),
    field: 'pvSelfUse',
    flag: FlagType.PHOTOVOLTAIC_TYPE,
    show: false,
    color: '#7A79FF',
  },
  {
    name: formatMessage({
      id: 'index.tab.income',
      defaultMessage: '收益',
    }),
    field: 'gain',
    flag: FlagType.GAIN,
    show: false,
    color: '#FF7B7B',
  },
];
