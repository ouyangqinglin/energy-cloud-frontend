import { ReactComponent as IconEnergyStorage } from '@/assets/image/station/overview/icon_储能.svg';
import { ReactComponent as IconLoad } from '@/assets/image/station/overview/icon_负载1.svg';
import { ReactComponent as IconMarketElectric } from '@/assets/image/station/overview/icon_市电.svg';
import { ReactComponent as IconPhotovoltaic } from '@/assets/image/station/overview/icon_光伏1.svg';
import { ReactComponent as IconStorageBattery } from '@/assets/image/station/overview/icon_储能电池.svg';

import type { Load, StoredEnergy } from './type';
import type { DescriptionCardConfig } from '../components/CardDescription/type';

import { formatMessage } from '@/utils';

export const config = (siteType: string) => {
  let defaultConfig: DescriptionCardConfig[] = [
    {
      icon: IconPhotovoltaic,
      title: formatMessage({ id: 'device.pv', defaultMessage: '光伏' }),
      field: 'photovoltaic',
      show: ['123', '12', '13', '1', ''].includes(siteType),
      statistics: [
        {
          label: `${formatMessage({
            id: 'siteMonitor.dayPowerGeneration',
            defaultMessage: '今日发电量',
          })}(kWh)`,
          labelUnit: '/kWh',
          field: 'charge',
          value: '1366.8',
        },
        {
          label: `${formatMessage({
            id: 'siteMonitor.SelfGeneratedElectriConsumption',
            defaultMessage: '今日自发自用电量',
          })}(kWh)`,
          labelUnit: '/kWh',
          field: 'selfElec',
          value: '0',
        },
        {
          label: `${formatMessage({
            id: 'siteMonitor.generatingCapacity',
            defaultMessage: '发电功率',
          })}(kW)`,
          labelUnit: '/kW',
          field: 'power',
          value: '210.03',
        },
      ],
    },
    {
      icon: IconStorageBattery,
      title: formatMessage({ id: 'device.storageBattery', defaultMessage: '储能电池' }),
      field: 'battery',
      show: ['23', '2'].includes(siteType),
      statistics: [
        {
          label: `${formatMessage({
            id: 'siteMonitor.Charge/dischargeDaily',
            defaultMessage: '今日系统充/放电量',
          })}(kWh)`,
          labelUnit: '/kWh',
          value: (entity: StoredEnergy) => `${entity?.charge ?? ''} / ${entity?.discharge ?? ''}`,
        },
        // {
        //   label: `${formatMessage({
        //     id: 'siteMonitor.dayChargingVolume',
        //     defaultMessage: '今日系统充电量',
        //   })}(kWh)`,
        //   labelUnit: '/kWh',
        //   field: 'charge',
        //   value: '1366.8',
        // },
        // {
        //   label: `${formatMessage({
        //     id: 'siteMonitor.dayDischarge',
        //     defaultMessage: '今日系统放电量',
        //   })}(kWh)`,
        //   labelUnit: '/kWh',
        //   field: 'discharge',
        //   value: '0',
        // },
        {
          label: `${formatMessage({
            id: 'siteMonitor.dischargeCapacity',
            defaultMessage: '可放电能量',
          })}(kWh)`,
          labelUnit: '/kWh',
          field: 'dischargeableCapacity',
          value: '210.03',
        },
        {
          label: `${formatMessage({
            id: 'siteMonitor.batteryPower',
            defaultMessage: '储能电池功率',
          })}(kW)`,
          labelUnit: '/kW',
          field: 'power',
          value: '210.03',
        },
      ],
    },
    {
      icon: IconEnergyStorage,
      title: formatMessage({ id: 'device.storage', defaultMessage: '储能系统' }),
      field: 'storedEnergy',
      show: ['123', '12', '23', '2', ''].includes(siteType),
      statistics: [
        {
          label: `${formatMessage({
            id: 'siteMonitor.Charge/dischargeDaily',
            defaultMessage: '今日系统充/放电量',
          })}(kWh)`,
          labelUnit: '/kWh',
          value: (entity: StoredEnergy) => `${entity?.charge ?? ''} / ${entity?.discharge ?? ''}`,
        },
        {
          label: `${formatMessage({
            id: 'siteMonitor.dumpEnergy',
            defaultMessage: '剩余电量',
          })}(kWh)`,
          labelUnit: '/kWh',
          field: 'dischargeableCapacity',
          // value: '164.92',
        },
        {
          label: `${formatMessage({
            id: 'siteMonitor.storageTotallPower',
            defaultMessage: '系统总有功功率',
          })}(kW)`,
          labelUnit: '/kW',
          field: 'power',
          // value: '1083.4/968.3',
          // valueUnit: '(放)',
        },
      ],
    },
    {
      icon: IconMarketElectric,
      title: formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' }),
      field: 'electricSupply',
      statistics: [
        {
          label: `${formatMessage({
            id: 'siteMonitor.dayPowerSupply',
            defaultMessage: '今日市电供电量',
          })}(kWh)`,
          labelUnit: '/kWh',
          field: 'charge',
          value: '14024.9',
        },
        {
          label: `${formatMessage({
            id: 'siteMonitor.dayGridPowerSupply',
            defaultMessage: '今日馈网电量',
          })}(kWh)`,
          labelUnit: '/kWh',
          field: 'discharge',
          value: '0',
        },
        {
          label: `${formatMessage({
            id: 'siteMonitor.mainsPower',
            defaultMessage: '市电功率',
          })}(kW)`,
          labelUnit: '/kW',
          field: 'power',
          value: '462.46',
        },
        {
          label: `${formatMessage({
            id: 'siteMonitor.allPowerSupply',
            defaultMessage: '累计购电量',
          })}(kWh)`,
          labelUnit: '/kWh',
          field: 'accCharge',
          value: '14024.9',
          show: ['1', '3', '13'].includes(siteType),
        },
        {
          label: `${formatMessage({
            id: 'siteMonitor.allGridPowerSupply',
            defaultMessage: '累计售电量',
          })}(kWh)`,
          labelUnit: '/kWh',
          field: 'accDischarge',
          value: '14024.9',
          show: ['1', '3', '13'].includes(siteType),
        },
      ],
    },
    {
      icon: IconLoad,
      title: formatMessage({ id: 'device.load', defaultMessage: '负载' }),
      field: 'load',
      statistics: [
        {
          label: `${formatMessage({
            id: 'siteMonitor.dayPowerConsumption',
            defaultMessage: '今日负载用电量',
          })}(kWh)`,
          labelUnit: '/kWh',
          field: 'charge',
          value: '15286.43',
        },
        {
          label: `${formatMessage({
            id: 'siteMonitor.accCharge',
            defaultMessage: '累计用电量',
          })}(kWh)`,
          labelUnit: '/kWh',
          field: 'accCharge',
          value: '15286.43',
          show: ['12', '1', '2'].includes(siteType),
        },

        {
          label: `·${formatMessage({
            id: 'siteMonitor.chargingPileOther',
            defaultMessage: '充电桩/其他',
          })}(kWh)`,
          labelUnit: '/kWh',
          show: ['123', '23', '13', '3', ''].includes(siteType),
          value: (entity: Load) =>
            `${entity?.chargingPileCharge ?? ''} / ${entity?.otherLoadCharge ?? ''}`,
        },
        {
          label: `${formatMessage({
            id: 'siteMonitor.powerConsumption',
            defaultMessage: '负载用电功率',
          })}(kW)`,
          labelUnit: '/kW',
          field: 'power',
          value: '15286.43',
        },
        {
          label: `·${formatMessage({
            id: 'siteMonitor.chargingPileOther',
            defaultMessage: '充电桩/其他',
          })}(kW)`,
          labelUnit: '/kW',
          show: ['123', '23', '13', '3', ''].includes(siteType),
          value: (entity: Load) =>
            `${entity?.chargingPilePower ?? ''} / ${entity?.otherLoadPower ?? ''}`,
        },
      ],
    },
  ];
  defaultConfig = defaultConfig.map((item) => {
    item.statistics = item.statistics.filter((i) => !i.hasOwnProperty('show') || i.show);
    return item;
  });
  return defaultConfig.filter((item) => item.show || !item.hasOwnProperty('show'));
};
