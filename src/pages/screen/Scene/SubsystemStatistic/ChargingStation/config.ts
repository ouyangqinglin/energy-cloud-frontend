import type { DetailItem } from '@/components/Detail';
import type { DigitalFlipperItemProps } from '@/pages/screen/components/DigitalFlipper/Item';
import { keepTwoDecimalWithUnit } from '@/utils/math';

export const DEFAULT_REQUEST_INTERVAL = 5 * 60 * 1000;

export const DEFAULT_STATISTICS_REQUEST_INTERVAL = 60 * 60 * 1000;

export const config: DigitalFlipperItemProps[] = [
  {
    title: '充电桩收益',
    unit: '元',
    field: 'totalIncome',
    floatLength: 2,
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
    title: '充电量',
    field: 'totalApf',
    unit: 'kWh',
    floatLength: 2,
    numStyle: {
      width: 'auto',
      fontSize: 20,
      color: '#4DD6F0',
      fontWeight: 500,
      background: 'none',
      WebkitTextFillColor: 'inherit',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
  {
    title: '充电桩功率利用率',
    field: 'useRatio',
    floatLength: 0,
    format: (value) => Number(value) * 100,
    unit: '%',
    numStyle: {
      width: 'auto',
      fontSize: 20,
      color: '#4DD6F0',
      fontWeight: 500,
      background: 'none',
      WebkitTextFillColor: 'inherit',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
  {
    title: '充电次数',
    field: 'totalCount',
    unit: '次',
    floatLength: 0,
    numStyle: {
      width: 'auto',
      fontSize: 20,
      color: '#4DD6F0',
      fontWeight: 500,
      background: 'none',
      WebkitTextFillColor: 'inherit',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
];
