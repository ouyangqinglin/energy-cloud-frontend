import { ReactComponent as IconEnergyStorage } from '@/assets/image/station/overview/icon_储能.svg';
import { ReactComponent as IconLoad } from '@/assets/image/station/overview/icon_负载1.svg';
import { ReactComponent as IconMarketElectric } from '@/assets/image/station/overview/icon_市电.svg';
import { ReactComponent as IconPhotovoltaic } from '@/assets/image/station/overview/icon_光伏1.svg';
import type { Load, StoredEnergy } from './type';
import { keepTwoDecimalWithoutNull } from '../helper';

export const config = [
  {
    icon: IconPhotovoltaic,
    title: '光伏',
    field: 'photovoltaic',
    statistics: [
      {
        label: '当日发电量(kWh)',
        labelUnit: '/kWh',
        field: 'charge',
        value: '1366.8',
      },
      {
        label: '发电功率(kW)',
        labelUnit: '/kW',
        field: 'power',
        value: '210.03',
      },
    ],
  },
  {
    icon: IconEnergyStorage,
    title: '储能',
    field: 'storedEnergy',
    statistics: [
      {
        label: '当日充/放电量(kWh)',
        labelUnit: '/kWh',
        value: (entity: StoredEnergy) =>
          `${keepTwoDecimalWithoutNull(entity?.charge)} / ${keepTwoDecimalWithoutNull(
            entity?.discharge,
          )}`,
      },
      {
        label: '剩余电量(kWh)',
        labelUnit: '/kWh',
        field: 'dischargeableCapacity',
        // value: '164.92',
      },
      {
        label: '储能功率(kW)',
        labelUnit: '/kW',
        field: 'power',
        // value: '1083.4/968.3',
        // valueUnit: '(放)',
      },
    ],
  },
  {
    icon: IconMarketElectric,
    title: '市电',
    field: 'electricSupply',
    statistics: [
      {
        label: '当日购电量(kWh)',
        labelUnit: '/kWh',
        field: 'charge',
        value: '14024.9',
      },
      {
        label: '当日售电量(kWh)',
        labelUnit: '/kWh',
        field: 'discharge',
        value: '0',
      },
      {
        label: '市电功率(kW)',
        labelUnit: '/kW',
        field: 'power',
        value: '462.46',
      },
    ],
  },
  {
    icon: IconLoad,
    title: '负载',
    field: 'load',
    statistics: [
      {
        label: '当日用电量(kWh)',
        labelUnit: '/kWh',
        field: 'charge',
        value: '15286.43',
      },
      {
        label: '·充电桩/其他(kWh)',
        labelUnit: '/kWh',
        value: (entity: Load) =>
          `${keepTwoDecimalWithoutNull(entity?.chargingPileCharge)} / ${keepTwoDecimalWithoutNull(
            entity?.otherLoadCharge,
          )}`,
      },
      {
        label: '用电功率(kW)',
        labelUnit: '/kW',
        field: 'power',
        value: '15286.43',
      },
      {
        label: '·充电桩/其他(kW)',
        labelUnit: '/kW',
        value: (entity: Load) =>
          `${keepTwoDecimalWithoutNull(entity?.chargingPilePower)} / ${keepTwoDecimalWithoutNull(
            entity?.otherLoadPower,
          )}`,
      },
    ],
  },
];
