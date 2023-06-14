import type { DetailItem } from '@/components/Detail';
import { DigitalFlipperItemProps } from '@/pages/screen/components/DigitalFlipper/Item';
import { keepTwoDecimalWithUnit } from '@/utils/math';
import { RealtimeStatusEnum } from './type';

export const DEFAULT_REQUEST_INTERVAL = 5 * 60 * 1000;

export const DEFAULT_STATISTICS_REQUEST_INTERVAL = 60 * 60 * 1000;

export const gunInfoItem: DetailItem[] = [
  { label: '实时状态', field: 'realtimeStatus' },
  {
    label: '充放电功率：',
    field: 'chargingAndDischargingPower',
    format: (value) => keepTwoDecimalWithUnit(value, 'kW'),
  },
  {
    label: 'SOC',
    field: 'soc',
    format: (value) => keepTwoDecimalWithUnit(Number(value)) + '%',
  },
  {
    label: 'SOH',
    field: 'soh',
    format: (value) => keepTwoDecimalWithUnit(Number(value)) + '%',
  },
];

export const RealtimeStatusMap = {
  [RealtimeStatusEnum.DEFAULT]: {
    text: '静置',
    color: '#28F0EE',
  },
  [RealtimeStatusEnum.CHARGE]: {
    text: '充电',
    color: '#28F0EE',
  },
  [RealtimeStatusEnum.DISCHARGE]: {
    text: '放电',
    color: '#14E6B2',
  },
};

export const digitalFlipperItemConfig: {
  runningState: DigitalFlipperItemProps;
  runningPower: DigitalFlipperItemProps;
  ratedCapacity: DigitalFlipperItemProps;
} = {
  runningState: {
    title: '运行状态',
    render: (status: RealtimeStatusEnum) => RealtimeStatusMap[status]?.text ?? '静置',
    titleStyle: {
      fontWeight: 400,
      fontSize: '14px',
      color: '#D0DEEE',
    },
  },
  runningPower: {
    title: '运行功率',
    unit: 'kW',
    floatLength: 2,
    num: '120',
    titleStyle: {
      fontWeight: 400,
      fontSize: '12x',
      color: '#fff',
    },
    unitStyle: {
      fontSize: '12px',
      color: '#ACCCEC',
    },
    numStyle: {
      background: 'none',
      WebkitTextFillColor: 'inherit',
      fontSize: '20px',
      fontWeight: 500,
      height: 'auto',
      lineHeight: 'inherit',
      color: '#4DD6F0',
      fontFamily: 'DIN-Bold, DIN',
    },
  },
  ratedCapacity: {
    title: '额定容量',
    unit: 'kWh',
    floatLength: 2,
    num: '450',
    titleStyle: {
      fontWeight: 400,
      fontSize: '12x',
      color: '#fff',
    },
    unitStyle: {
      fontSize: '12px',
      color: '#ACCCEC',
    },
    numStyle: {
      background: 'none',
      WebkitTextFillColor: 'inherit',
      fontSize: '20px',
      height: 'auto',
      lineHeight: 'inherit',
      color: '#4DD6F0',
      fontFamily: 'DIN-Bold, DIN',
      fontWeight: 500,
    },
  },
};
