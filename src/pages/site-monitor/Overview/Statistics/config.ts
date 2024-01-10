import { ReactComponent as IconEnergyStorage } from '@/assets/image/station/overview/icon_储能.svg';
import { ReactComponent as IconLoad } from '@/assets/image/station/overview/icon_负载1.svg';
import { ReactComponent as IconMarketElectric } from '@/assets/image/station/overview/icon_市电.svg';
import { ReactComponent as IconPhotovoltaic } from '@/assets/image/station/overview/icon_光伏1.svg';
import type { Load, StoredEnergy } from './type';
import { keepTwoDecimalWithoutNull } from '../helper';
import { formatMessage } from '@/utils';

export const config = [
  {
    icon: IconPhotovoltaic,
    title: formatMessage({ id: 'device.pv', defaultMessage: '光伏' }),
    field: 'photovoltaic',
    statistics: [
      {
        label: `${formatMessage({
          id: 'siteMonitor.dayPowerGeneration',
          defaultMessage: '当日发电量',
        })}(kWh)`,
        labelUnit: '/kWh',
        field: 'charge',
        value: '1366.8',
      },
      {
        label: `${formatMessage({
          id: 'siteMonitor.SelfGeneratedElectriConsumption',
          defaultMessage: '自发自用电量',
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
    icon: IconEnergyStorage,
    title: formatMessage({ id: 'device.storage', defaultMessage: '储能' }),
    field: 'storedEnergy',
    statistics: [
      {
        label: `${formatMessage({
          id: 'siteMonitor.Charge/dischargeDaily',
          defaultMessage: '当日充/放电量',
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
          id: 'siteMonitor.storagePower',
          defaultMessage: '储能功率',
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
          defaultMessage: '当日供电量',
        })}(kWh)`,
        labelUnit: '/kWh',
        field: 'charge',
        value: '14024.9',
      },
      {
        label: `${formatMessage({
          id: 'siteMonitor.dayGridPowerSupply',
          defaultMessage: '当日馈网电量',
        })}(kWh)`,
        labelUnit: '/kWh',
        field: 'discharge',
        value: '0',
      },
      {
        label: `${formatMessage({ id: 'siteMonitor.mainsPower', defaultMessage: '市电功率' })}(kW)`,
        labelUnit: '/kW',
        field: 'power',
        value: '462.46',
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
          defaultMessage: '当日用电量',
        })}(kWh)`,
        labelUnit: '/kWh',
        field: 'charge',
        value: '15286.43',
      },
      {
        label: `·${formatMessage({
          id: 'siteMonitor.chargingPileOther',
          defaultMessage: '充电桩/其他',
        })}(kWh)`,
        labelUnit: '/kWh',
        value: (entity: Load) =>
          `${entity?.chargingPileCharge ?? ''} / ${entity?.otherLoadCharge ?? ''}`,
      },
      {
        label: `${formatMessage({
          id: 'siteMonitor.powerConsumption',
          defaultMessage: '用电功率',
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
        value: (entity: Load) =>
          `${entity?.chargingPilePower ?? ''} / ${entity?.otherLoadPower ?? ''}`,
      },
    ],
  },
];
