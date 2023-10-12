import { IntlShape } from '@/types/util';
import { ReactComponent as IconEnergyStorage } from '@/assets/image/home-page/icon_储能.svg';
import { ReactComponent as IconPhotovoltaic } from '@/assets/image/home-page/icon_光伏.svg';
import { ReactComponent as IconAlarm } from '@/assets/image/home-page/icon_告警.svg';
import { ReactComponent as IconCS } from '@/assets/image/home-page/icon_充电桩.svg';
import { ReactComponent as IconSite } from '@/assets/image/home-page/icon_站点.svg';
import { ReactComponent as IconBenifit } from '@/assets/image/home-page/icon_当日收益.svg';
import { ReactComponent as IconCo2 } from '@/assets/image/home-page/icon_碳减排.svg';
import { CardInfo } from './type';

export const getConfig = (intl: IntlShape): CardInfo[] => {
  return [
    {
      title: intl.formatMessage({ id: 'index.siteOverview' }),
      icon: IconSite,
      field: 'powerStationCount',
      value: 2,
      description: intl.formatMessage({ id: 'index.totalSiteNum' }),
      items: [
        {
          label: intl.formatMessage({ id: 'index.pvEnergyChargeNum' }),
          field: 'pvAndEssAndChargePowerStationCount',
          value: 1,
        },
        {
          label: intl.formatMessage({ id: 'index.pvEnergyNum' }),
          field: 'pvAndEssPowerStationCount',
          value: 0,
        },
        {
          label: intl.formatMessage({ id: 'index.energyChargeNum' }),
          field: 'essAndChargePowerStationCount',
          value: 0,
        },
        {
          label: intl.formatMessage({ id: 'index.pvNum' }),
          field: 'pvPowerStationCount',
          value: 0,
        },
        {
          label: intl.formatMessage({ id: 'index.energyNum' }),
          field: 'essPowerStationCount',
          value: 0,
        },
        {
          label: intl.formatMessage({ id: 'index.chargeNum' }),
          field: 'chargePowerStationCount',
          value: 0,
        },
      ],
    },
    {
      title: intl.formatMessage({ id: 'index.pvIndicator' }),
      icon: IconPhotovoltaic,
      field: 'pvGeneratedPower',
      value: 1313.62,
      description: intl.formatMessage({ id: 'index.powerGeneration' }),
      items: [
        {
          label: intl.formatMessage({ id: 'index.componentCapacity' }),
          field: 'moduleCapacity',
          value: 1831.2,
        },
        {
          label: intl.formatMessage({ id: 'index.dailyPowerGeneration' }),
          field: 'generatedElecToday',
          value: 3697.0,
        },
        {
          label: intl.formatMessage({ id: 'index.totalPowerGeneration' }),
          field: 'generatedElecTotal',
          value: 2440036.4,
        },
      ],
    },
    {
      title: intl.formatMessage({ id: 'index.energyIndicator' }),
      icon: IconEnergyStorage,
      field: 'essGeneratedPower',
      value: 526.34,
      description: intl.formatMessage({ id: 'index.energyPower' }),
      items: [
        {
          label: intl.formatMessage({ id: 'index.remainBattery' }),
          field: 'dumpEnergy',
          value: 1,
        },
        {
          label: intl.formatMessage({ id: 'index.todayCharge' }),
          field: 'essChargeElecToday',
          value: 0,
        },
        {
          label: intl.formatMessage({ id: 'index.todayDischarge' }),
          field: 'essDischargeElecToday',
          value: 0,
        },
      ],
    },
    {
      title: intl.formatMessage({ id: 'index.chargeIndicator' }),
      icon: IconCS,
      field: 'chargePower',
      value: 1947.1,
      description: intl.formatMessage({ id: 'index.chargePower' }),
      items: [
        {
          label: intl.formatMessage({ id: 'index.todayChargePower' }),
          field: 'cpChargeElecToday',
          value: 3.14,
        },
        {
          label: intl.formatMessage({ id: 'index.totalChargePower' }),
          field: 'cpChargeElecTotal',
          value: 0.48,
        },
        {
          label: intl.formatMessage({ id: 'index.useChargeGun' }),
          value: 171.04,
          render: (data) => {
            return `${data?.beUsingGunNum ?? '--'}  / ${data?.leisureGunNum ?? '--'} `;
          },
        },
      ],
    },
    {
      title: intl.formatMessage({ id: 'index.alarmMonitor' }),
      icon: IconAlarm,
      field: 'totalNum',
      value: 54,
      description: intl.formatMessage({ id: 'index.alarmNum' }),
      items: [
        {
          label: intl.formatMessage({ id: 'index.seriousLevel' }),
          field: 'errorNum',
          value: 1,
        },
        {
          label: intl.formatMessage({ id: 'index.importantLevel' }),
          field: 'alarmNum',
          value: 0,
        },
        {
          label: intl.formatMessage({ id: 'index.secondaryLevel' }),
          field: 'warnNum',
          value: 53,
        },
        {
          label: intl.formatMessage({ id: 'index.tipLevel' }),
          field: 'infoNum',
          value: 53,
        },
      ],
    },
    {
      title: intl.formatMessage({ id: 'index.economicBenefits' }),
      icon: IconBenifit,
      field: 'gainsDay',
      value: 4755.46,
      description: intl.formatMessage({ id: 'index.todayIncome' }),
      items: [
        {
          label: intl.formatMessage({ id: 'index.todayPvIncome' }),
          field: 'pvGainsDay',
          value: 4085.87,
        },
        {
          label: intl.formatMessage({ id: 'index.todayEnergyIncome' }),
          field: 'essGainsDay',
          value: 672.01,
        },
        {
          label: intl.formatMessage({ id: 'index.totalIncome' }),
          field: 'gainsTotal',
          value: 192963664,
        },
      ],
    },
    {
      title: intl.formatMessage({ id: 'index.socialContribution' }),
      icon: IconCo2,
      field: 'totalReduceCO2',
      value: 1947.1,
      description: intl.formatMessage({ id: 'index.totalCarbonEmission' }),
      items: [
        {
          label: intl.formatMessage({ id: 'index.todayEqualTree' }),
          field: 'equivalentTreeNum',
          value: 3.14,
        },
        {
          label: intl.formatMessage({ id: 'index.todayCarbonEmission' }),
          field: 'todayReduceCO2',
          value: 0.48,
        },
        {
          label: intl.formatMessage({
            id: 'index.todaySaveCoal',
            defaultMessage: '当日节约标准煤/t',
          }),
          field: 'todayReduceCoal',
          value: 171.04,
        },
      ],
    },
  ];
};
