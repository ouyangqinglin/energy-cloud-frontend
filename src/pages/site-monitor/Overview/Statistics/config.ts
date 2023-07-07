import { ReactComponent as IconEnergyStorage } from '@/assets/image/station/overview/icon_储能1.svg';
import { ReactComponent as IconLoad } from '@/assets/image/station/overview/icon_负载1.svg';
import { ReactComponent as IconMarketElectric } from '@/assets/image/station/overview/icon_市电1.svg';
import { ReactComponent as IconPhotovoltaic } from '@/assets/image/station/overview/icon_光伏1.svg';

export const columns = [
  {
    icon: IconMarketElectric,
    title: '市电',
    statistics: [
      {
        label: '当日充/放电',
        labelUnit: '/kWh',
        field: 'charge',
        value: '14024.9',
      },
      {
        label: '剩余电量',
        labelUnit: '/kWh',
        field: 'ratePower',
        value: '0',
      },
      {
        label: '储能功率',
        labelUnit: '/kW',
        field: 'ratePower',
        value: '462.46',
      },
    ],
  },
  {
    icon: IconPhotovoltaic,
    title: '光伏',
    statistics: [
      {
        label: '当日发电',
        labelUnit: '/kWh',
        field: 'charge',
        value: '1366.8',
      },
      {
        label: '发电功率',
        labelUnit: '/kW',
        field: 'ratePower',
        value: '210.03',
      },
    ],
  },
  {
    icon: IconEnergyStorage,
    title: '储能',
    statistics: [
      {
        label: '当日充/放电',
        labelUnit: '/kWh',
        field: 'charge',
        value: '1083.4/968.3',
      },
      {
        label: '剩余电量',
        labelUnit: '/kWh',
        field: 'ratePower',
        value: '164.92',
      },
      {
        label: '储能功率',
        labelUnit: '/kW',
        field: 'ratePower',
        value: '1083.4/968.3',
        // valueUnit: '(放)',
      },
    ],
  },
  {
    icon: IconLoad,
    title: '负载',
    statistics: [
      {
        label: '当日用电量',
        labelUnit: '/kWh',
        field: 'charge',
        value: '15286.43',
      },
      {
        label: '·充电桩/其他',
        labelUnit: '/kWh',
        field: 'ratePower',
        value: '915.62',
      },
      {
        label: '用电功率',
        labelUnit: '/kW',
        field: 'charge',
        value: '15286.43',
      },
      {
        label: '·充电桩/其他',
        labelUnit: '/kW',
        field: 'ratePower',
        value: '915.62',
      },
    ],
  },
];
