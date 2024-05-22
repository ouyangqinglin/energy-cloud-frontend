import { formatMessage } from '@/utils';
import { ReactComponent as IconEnergyStorage } from '@/assets/image/home-page/icon_储能.svg';
import { ReactComponent as IconPhotovoltaic } from '@/assets/image/home-page/icon_光伏.svg';
import { ReactComponent as IconAlarm } from '@/assets/image/home-page/icon_告警.svg';
import { ReactComponent as IconCS } from '@/assets/image/home-page/icon_充电桩.svg';
import { ReactComponent as IconSite } from '@/assets/image/home-page/icon_站点.svg';
import { ReactComponent as IconBenifit } from '@/assets/image/home-page/icon_今日收益.svg';
import { ReactComponent as IconCo2 } from '@/assets/image/home-page/icon_碳减排.svg';
import type { CardInfo } from './type';
import { SiteTypeStrEnum } from '@/utils/dict';

export const config: CardInfo[] = [
  {
    title: formatMessage({
      id: 'index.siteOverview',
      defaultMessage: '站点概览',
    }),
    icon: IconSite,
    field: 'powerStationCount',
    value: 2,
    description: formatMessage({
      id: 'index.totalSiteNum',
      defaultMessage: '站点总数(个)',
    }),
    items: [
      {
        label: formatMessage({
          id: 'index.pvEnergyChargeNum',
          defaultMessage: '光储充站点(个)',
        }),
        field: 'pvAndEssAndChargePowerStationCount',
        value: 1,
        show: (value, data) =>
          value ||
          (!data.pvAndEssPowerStationCount &&
            !data.essAndChargePowerStationCount &&
            !data.pvPowerStationCount &&
            !data.essPowerStationCount &&
            !data.chargePowerStationCount),
      },
      {
        label: formatMessage({
          id: 'index.pvEnergyNum',
          defaultMessage: '光储站点(个)',
        }),
        field: 'pvAndEssPowerStationCount',
        value: 0,
        show: (value) => value,
      },
      {
        label: formatMessage({
          id: 'index.energyChargeNum',
          defaultMessage: '储充站点(个)',
        }),
        field: 'essAndChargePowerStationCount',
        value: 0,
        show: (value) => value,
      },
      {
        label: formatMessage({
          id: 'index.pvNum',
          defaultMessage: '光伏站点(个)',
        }),
        field: 'pvPowerStationCount',
        value: 0,
        show: (value) => value,
      },
      {
        label: formatMessage({
          id: 'index.energyNum',
          defaultMessage: '储能站点(个)',
        }),
        field: 'essPowerStationCount',
        value: 0,
        show: (value) => value,
      },
      {
        label: formatMessage({
          id: 'index.chargeNum',
          defaultMessage: '充电站点(个)',
        }),
        field: 'chargePowerStationCount',
        value: 0,
        show: (value) => value,
      },
    ],
  },
  {
    title: formatMessage({
      id: 'index.economicBenefits',
      defaultMessage: '经济效益',
    }),
    icon: IconBenifit,
    field: 'gainsTotal',
    value: 192963664,
    description: formatMessage({
      id: 'index.totalIncome',
      defaultMessage: '累计收益(元)',
    }),
    items: [
      {
        label: formatMessage({
          id: 'index.todayPvIncome',
          defaultMessage: '今日光伏收益(元)',
        }),
        field: 'pvGainsDay',
        value: 4085.87,
        show: (_, data) => !data?.siteType || data?.siteType?.indexOf?.(SiteTypeStrEnum.PV) > -1,
      },
      {
        label: formatMessage({
          id: 'index.todayEnergyIncome',
          defaultMessage: '今日储能收益(元)',
        }),
        field: 'essGainsDay',
        value: 672.01,
        show: (_, data) => !data?.siteType || data?.siteType?.indexOf?.(SiteTypeStrEnum.ES) > -1,
      },
      {
        label: formatMessage({
          id: 'index.todayIncome',
          defaultMessage: '今日收益(元)',
        }),
        field: 'gainsDay',
        value: 4755.46,
      },
    ],
  },
  {
    title: formatMessage({
      id: 'index.socialContribution',
      defaultMessage: '社会贡献',
    }),
    icon: IconCo2,
    field: 'totalReduceCO2',
    value: 1947.1,
    description: formatMessage({
      id: 'index.totalCarbonEmission',
      defaultMessage: '累计CO2减排(t)',
    }),
    items: [
      {
        label: formatMessage({
          id: 'index.todayEqualTree',
          defaultMessage: '今日等效植树(棵)',
        }),
        field: 'equivalentTreeNum',
        value: 3.14,
      },
      {
        label: formatMessage({
          id: 'index.todayCarbonEmission',
          defaultMessage: '今日CO2减排(t)',
        }),
        field: 'todayReduceCO2',
        value: 0.48,
      },
      {
        label: formatMessage({
          id: 'index.todaySaveCoal',
          defaultMessage: '今日节约标准煤(t)',
        }),
        field: 'todayReduceCoal',
        value: 171.04,
      },
    ],
  },
  {
    title: formatMessage({
      id: 'index.pvIndicator',
      defaultMessage: '光伏指标',
    }),
    icon: IconPhotovoltaic,
    field: 'pvGeneratedPower',
    value: 1313.62,
    description: formatMessage({
      id: 'index.powerGeneration',
      defaultMessage: '发电功率(kW)',
    }),
    items: [
      {
        label: formatMessage({
          id: 'index.componentCapacity',
          defaultMessage: '组件容量(kWp)',
        }),
        field: 'moduleCapacity',
        value: 1831.2,
      },
      {
        label: formatMessage({
          id: 'index.dailyPowerGeneration',
          defaultMessage: '今日发电(kWh)',
        }),
        field: 'generatedElecToday',
        value: 3697.0,
      },
      {
        label: formatMessage({
          id: 'index.totalPowerGeneration',
          defaultMessage: '累计发电(kWh)',
        }),
        field: 'generatedElecTotal',
        value: 2440036.4,
      },
    ],
  },
  {
    title: formatMessage({
      id: 'index.energyIndicator',
      defaultMessage: '储能指标',
    }),
    icon: IconEnergyStorage,
    field: 'essGeneratedPower',
    value: 526.34,
    description: formatMessage({
      id: 'index.energyPower',
      defaultMessage: '储能功率(kW)',
    }),
    items: [
      {
        label: formatMessage({
          id: 'index.remainBattery',
          defaultMessage: '剩余电量(kWh)',
        }),
        field: 'dumpEnergy',
        value: 1,
      },
      {
        label: formatMessage({
          id: 'index.todayCharge',
          defaultMessage: '今日充电(kWh)',
        }),
        field: 'essChargeElecToday',
        value: 0,
      },
      {
        label: formatMessage({
          id: 'index.todayDischarge',
          defaultMessage: '今日放电(kWh)',
        }),
        field: 'essDischargeElecToday',
        value: 0,
      },
    ],
  },
  {
    title: formatMessage({
      id: 'index.chargeIndicator',
      defaultMessage: '充电桩指标',
    }),
    icon: IconCS,
    field: 'chargePower',
    value: 1947.1,
    description: formatMessage({
      id: 'index.chargePower',
      defaultMessage: '充电功率(kW)',
    }),
    items: [
      {
        label: formatMessage({
          id: 'index.todayChargePower',
          defaultMessage: '今日充电量(kWh)',
        }),
        field: 'cpChargeElecToday',
        value: 3.14,
      },
      {
        label: formatMessage({
          id: 'index.totalChargePower',
          defaultMessage: '累计充电量(kWh)',
        }),
        field: 'cpChargeElecTotal',
        value: 0.48,
      },
      {
        label: formatMessage({
          id: 'index.useChargeGun',
          defaultMessage: '充电枪使用/空闲',
        }),
        value: 171.04,
        render: (data) => {
          return `${data?.beUsingGunNum ?? '--'}  / ${data?.leisureGunNum ?? '--'} `;
        },
      },
    ],
  },
  {
    title: formatMessage({
      id: 'index.alarmMonitor',
      defaultMessage: '告警监视',
    }),
    icon: IconAlarm,
    field: 'totalNum',
    value: 54,
    description: formatMessage({
      id: 'index.alarmNum',
      defaultMessage: '告警总数(条)',
    }),
    items: [
      {
        label: formatMessage({
          id: 'index.seriousLevel',
          defaultMessage: '严重等级(条)',
        }),
        field: 'errorNum',
        value: 1,
      },
      {
        label: formatMessage({
          id: 'index.importantLevel',
          defaultMessage: '重要等级(条)',
        }),
        field: 'alarmNum',
        value: 0,
      },
      {
        label: formatMessage({
          id: 'index.secondaryLevel',
          defaultMessage: '次要等级(条)',
        }),
        field: 'warnNum',
        value: 53,
      },
      {
        label: formatMessage({
          id: 'index.tipLevel',
          defaultMessage: '提示等级(条)',
        }),
        field: 'infoNum',
        value: 53,
      },
    ],
  },
];
