import { ReactComponent as IconEnergyStorage } from '@/assets/image/station/overview/icon_储能.svg';
import { ReactComponent as IconLoad } from '@/assets/image/station/overview/icon_负载1.svg';
import { ReactComponent as IconMarketElectric } from '@/assets/image/station/overview/icon_市电.svg';
import { ReactComponent as IconPhotovoltaic } from '@/assets/image/station/overview/icon_光伏1.svg';
import { CardInfo } from './type';

export const config: CardInfo[] = [
  {
    title: '电站概览',
    icon: IconLoad,
    field: 'powerStationCount',
    value: 2,
    description: '电站总数/',
    items: [
      {
        label: '光储充电站/个',
        field: 'pvAndEssAndChargePowerStationCount',
        value: 1,
      },
      {
        label: '光储电站/个',
        field: 'pvAndEssPowerStationCount',
        value: 0,
      },
      {
        label: '储充电站/个',
        field: 'essAndChargePowerStationCount',
        value: 0,
      },
      {
        label: '储能电站/个',
        field: 'essPowerStationCount',
        value: 0,
      },
    ],
  },
  {
    title: '光伏指标',
    icon: IconPhotovoltaic,
    field: 'pvGeneratedPower',
    value: 1313.62,
    description: '发电功率/kw',
    items: [
      {
        label: '组件容量/kWp',
        field: 'moduleCapacity',
        value: 1831.2,
      },
      {
        label: '当日发电/kwh',
        field: 'generatedElecToday',
        value: 3697.0,
      },
      {
        label: '累计发电/kWh',
        field: 'generatedElecTotal',
        value: 2440036.4,
      },
    ],
  },
  {
    title: '储能指标',
    icon: IconEnergyStorage,
    field: 'essGeneratedPower',
    value: 526.34,
    description: '储能功率/kw',
    items: [
      {
        label: '剩余电量/kwh',
        field: 'dumpEnergy',
        value: 1,
      },
      {
        label: '当日充电/kwh',
        field: 'chargeElecToday',
        value: 0,
      },
      {
        label: '当日放电/kwh',
        field: 'dischargeElecToday',
        value: 0,
      },
    ],
  },
  {
    title: '告警监视',
    icon: IconLoad,
    field: 'totalNum',
    value: 54,
    description: '告警总数/条',
    items: [
      {
        label: '严重等级/条',
        field: 'errorNum',
        value: 1,
      },
      {
        label: '重要等级/条',
        field: 'alarmNum',
        value: 0,
      },
      {
        label: '次要等级/条',
        field: 'warnNum',
        value: 53,
      },
      {
        label: '提示等级/条',
        field: 'infoNum',
        value: 53,
      },
    ],
  },
  {
    title: '经济收益',
    icon: IconPhotovoltaic,
    field: 'gainsDay',
    value: 4755.46,
    description: '当日收益/元',
    items: [
      {
        label: '当日光伏收益/元',
        field: 'pvGainsDay',
        value: 4085.87,
      },
      {
        label: '当日储能收益/元',
        field: 'essGainsDay',
        value: 672.01,
      },
      {
        label: '累计收益/元',
        field: 'gainsTotal',
        value: 192963664,
      },
    ],
  },
  {
    title: '环境收益',
    icon: IconEnergyStorage,
    field: 'totalReduceCO2',
    value: 1947.1,
    description: '累计CO2减排/t',
    items: [
      {
        label: '当日等效植树/棵',
        field: 'equivalentTreeNum',
        value: 3.14,
      },
      {
        label: '当日CO2减排/t',
        field: 'todayReduceCO2',
        value: 0.48,
      },
      {
        label: '当日节约标准煤/t',
        field: 'todayReduceCoal',
        value: 171.04,
      },
    ],
  },
];
