import type { DigitalFlipperItemProps } from '@/pages/screen/components/DigitalFlipper/Item';
export const DEFAULT_REQUEST_INTERVAL = 5 * 60 * 1000;

export const dataSource: DigitalFlipperItemProps[] = [
  {
    title: '光伏收益',
    unit: '元',
    floatLength: 2,
    field: 'profit',
    numStyle: {
      width: 'auto',
      fontSize: 20,
      fontWeight: 500,
      color: '#FFE04D',
      backgroundImage:
        'linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 221, 155) 82%, rgb(255, 195, 79) 100%)',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
  {
    title: '发电量',
    unit: 'kWh',
    floatLength: 2,
    field: 'charge',
    numStyle: {
      width: 'auto',
      fontWeight: 500,
      fontSize: 20,
      color: '#4DD6F0',
      background: 'none',
      WebkitTextFillColor: 'inherit',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
  {
    title: '自发自用电量',
    floatLength: 2,
    field: 'selfUse',
    unit: 'kWh',
    numStyle: {
      width: 'auto',
      fontWeight: 500,
      fontSize: 20,
      color: '#4DD6F0',
      background: 'none',
      WebkitTextFillColor: 'inherit',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
  {
    title: '上网电量',
    unit: 'kWh',
    floatLength: 2,
    field: 'discharge',
    numStyle: {
      width: 'auto',
      fontWeight: 500,
      fontSize: 20,
      color: '#4DD6F0',
      background: 'none',
      WebkitTextFillColor: 'inherit',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
];

export const dataSourceRealTime: DigitalFlipperItemProps[] = [
  {
    title: '实时发电功率',
    unit: 'kW',
    floatLength: 2,
    field: 'power',
    numStyle: {
      width: 'auto',
      fontSize: 20,
      fontWeight: 500,
      color: '#FFE04D',
      backgroundImage:
        'linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 221, 155) 82%, rgb(255, 195, 79) 100%)',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
  {
    title: '组串总容量',
    unit: 'kWp',
    floatLength: 2,
    field: 'totalCapacity',
    numStyle: {
      width: 'auto',
      fontWeight: 500,
      fontSize: 20,
      color: '#4DD6F0',
      background: 'none',
      WebkitTextFillColor: 'inherit',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
];
