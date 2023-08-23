import { ReactComponent as IconEnergyStorage } from '@/assets/image/home-page/icon_储能.svg';
import { ReactComponent as IconPhotovoltaic } from '@/assets/image/home-page/icon_光伏.svg';
import { ReactComponent as IconAlarm } from '@/assets/image/home-page/icon_告警.svg';
import { ReactComponent as IconCS } from '@/assets/image/home-page/icon_充电桩.svg';
import { ReactComponent as IconSite } from '@/assets/image/home-page/icon_站点.svg';
import { ReactComponent as IconBenifit } from '@/assets/image/home-page/icon_当日收益.svg';
import { ReactComponent as IconCo2 } from '@/assets/image/home-page/icon_碳减排.svg';
import { CardInfo } from './type';

export const config: CardInfo[] = [
  {
    title: '站点概览',
    icon: IconSite,
    field: 'powerStationCount',
    value: 2,
    description: '站点总数/个',
    items: [
      {
        label: '光储充站点/个',
        field: 'pvAndEssAndChargePowerStationCount',
        value: 1,
      },
      {
        label: '光储站点/个',
        field: 'pvAndEssPowerStationCount',
        value: 0,
      },
      {
        label: '储充站点/个',
        field: 'essAndChargePowerStationCount',
        value: 0,
      },
      {
        label: '光伏站点/个',
        field: 'pvPowerStationCount',
        value: 0,
      },
      {
        label: '储能站点/个',
        field: 'essPowerStationCount',
        value: 0,
      },
      {
        label: '充电站点/个',
        field: 'chargePowerStationCount',
        value: 0,
      },
    ],
  },
  {
    title: '光伏指标',
    icon: IconPhotovoltaic,
    field: 'pvGeneratedPower',
    value: 1313.62,
    description: '发电功率/kW',
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
    description: '储能功率/kW',
    items: [
      {
        label: '剩余电量/kwh',
        field: 'dumpEnergy',
        value: 1,
      },
      {
        label: '当日充电/kwh',
        field: 'essChargeElecToday',
        value: 0,
      },
      {
        label: '当日放电/kwh',
        field: 'essDischargeElecToday',
        value: 0,
      },
    ],
  },
  {
    title: '充电桩指标',
    icon: IconCS,
    field: 'chargePower',
    value: 1947.1,
    description: '充电功率/kW',
    items: [
      {
        label: '当日充电量/kwh',
        field: 'cpChargeElecToday',
        value: 3.14,
      },
      {
        label: '累计充电量/kwh',
        field: 'cpChargeElecTotal',
        value: 0.48,
      },
      {
        label: '充电枪使用/空闲',
        value: 171.04,
        render: (data) => {
          return `${data?.beUsingGunNum}  / ${data?.leisureGunNum} `;
        },
      },
    ],
  },
  {
    title: '告警监视',
    icon: IconAlarm,
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
    title: '经济效益',
    icon: IconBenifit,
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
    title: '社会贡献',
    icon: IconCo2,
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
