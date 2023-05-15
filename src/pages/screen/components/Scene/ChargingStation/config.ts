import type { DetailItem } from '@/components/Detail';
import { keepTwoDecimalWithUnit } from '@/utils/math';

export const gunInfoItem: DetailItem[] = [
  {
    label: '充电功率',
    field: 'chargingPower',
    format: (value) => keepTwoDecimalWithUnit(value, 'kW'),
  },
  {
    label: '今日充电量',
    field: 'chargingCapacity',
    format: (value) => keepTwoDecimalWithUnit(value, 'kWh'),
  },
  { label: '充电枪空闲/使用', field: 'gunStatus' },
  {
    label: '今日收益',
    field: 'profit',
    format: (value) => keepTwoDecimalWithUnit(value, '元'),
  },
];

export const DEFAULT_STATISTICS = {
  chargingPower: '--',
  chargingCapacity: '--',
  profit: '--',
};
