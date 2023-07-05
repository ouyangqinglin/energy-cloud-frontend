import { ReactComponent as IconPhotovoltaicPanel } from '@/assets/image/screen/decoration/photovoltaic_panel.svg';
import { ReactComponent as EnergyStorageCapacity } from '@/assets/image/screen/decoration/energy_storage_capacity.svg';
import { ReactComponent as VoltageLevel } from '@/assets/image/screen/decoration/voltage_level.svg';

export const columns = [
  {
    icon: IconPhotovoltaicPanel,
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
    icon: EnergyStorageCapacity,
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
        valueUnit: '(放)',
      },
    ],
  },
  {
    icon: EnergyStorageCapacity,
    title: '电网',
    statistics: [
      {
        label: '当日购电',
        labelUnit: '/kWh',
        field: 'charge',
        value: '14024.9',
      },
      {
        label: '当日售电',
        labelUnit: '/kWh',
        field: 'ratePower',
        value: '0',
      },
      {
        label: '电网功率',
        labelUnit: '/kW',
        field: 'ratePower',
        value: '462.46',
        valueUnit: '(购电)',
      },
    ],
  },
  {
    icon: VoltageLevel,
    title: '负载',
    statistics: [
      {
        label: '当日用电',
        labelUnit: '/kWh',
        field: 'charge',
        value: '15286.43',
      },
      {
        label: '用电功率',
        labelUnit: '/kW',
        field: 'ratePower',
        value: '915.62',
      },
    ],
  },
];
