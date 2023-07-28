import { TimeType } from '../../components/TimeButtonGroup';
import { ChartConfigType, FlagType } from '../type';

export const barLegendMap = new Map([
  ['charge', '充电量'],
  ['discharge', '放电量'],
  ['selfUse', '自发自用电量'],
  ['pvPowerGeneration', '光伏发电量'],
]);

export const TimeFormat = new Map([
  [TimeType.MONTH, 'YYYY-MM-DD'],
  [TimeType.YEAR, 'YYYY-MM'],
  [TimeType.TOTAL, 'YYYY'],
]);

export const lineFieldMap: ChartConfigType[] = [
  {
    name: '市电',
    field: 'me',
    flag: FlagType.ELECTRIC_SUPPLY_TYPE,
    show: false,
  },
  {
    name: '光伏',
    field: 'pv',
    flag: FlagType.PHOTOVOLTAIC_TYPE,
    show: false,
  },
  {
    name: '储能',
    field: 'es',
    flag: FlagType.ES_TYPE,
    show: false,
  },
  {
    name: '充电桩',
    field: 'cs',
    flag: FlagType.CHARGING_TYPE,
    show: false,
  },
  {
    name: '其他负载',
    field: 'load',
    flag: FlagType.LOAD_TYPE,
    show: false,
  },
];

export const barFieldMap: ChartConfigType[] = [
  {
    name: '自发自用电量',
    field: 'pvSelfUse',
    flag: FlagType.PHOTOVOLTAIC_TYPE,
    show: false,
  },
  {
    name: '光伏发电量',
    field: 'pvPowerGeneration',
    flag: FlagType.PHOTOVOLTAIC_TYPE,
    show: false,
  },
  {
    name: '市电电量',
    field: 'mainsUse',
    flag: FlagType.ELECTRIC_SUPPLY_TYPE,
    show: false,
  },
  {
    name: '储能充电量',
    field: 'essCharge',
    flag: FlagType.ES_TYPE,
    show: false,
  },
  {
    name: '储能放电量',
    field: 'essDisCharge',
    flag: FlagType.ES_TYPE,
    show: false,
  },
  {
    name: '充电桩充电量',
    field: 'cpCharge',
    flag: FlagType.CHARGING_TYPE,
    show: false,
  },
  {
    name: '其他负载用电量',
    field: 'loadUse',
    flag: FlagType.LOAD_TYPE,
    show: false,
  },
];
