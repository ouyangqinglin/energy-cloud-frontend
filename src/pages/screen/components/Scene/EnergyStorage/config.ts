import type { DetailItem } from '@/components/Detail';
import type { DigitalFlipperItemProps } from '../../DigitalFlipper/Item';
import { RealtimeStatusEnum } from './type';

export const DEFAULT_REQUEST_INTERVAL = 5 * 60 * 1000;

export const DEFAULT_STATISTICS_REQUEST_INTERVAL = 60 * 60 * 1000;

export const gunInfoItem: DetailItem[] = [
  { label: '实时状态', field: 'realtimeStatus' },
  { label: '充放电功率：', field: 'chargingAndDischargingPower' },
  { label: 'SOC', field: 'soc' },
  { label: 'SOH', field: 'soh' },
];

export const DEFAULT_STATISTICS = {
  soc: '--',
  soh: '--',
  chargingAndDischargingPower: '--',
  electricCurrent: '--',
  voltage: '--',
  realTimeStatus: '--',
};

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
  charging: DigitalFlipperItemProps;
  discharging: DigitalFlipperItemProps;
} = {
  charging: {
    title: '充电量',
    unit: 'kWh',
    num: '1397',
    titleStyle: {
      fontWeight: 400,
      fontSize: '14px',
      color: '#D0DEEE',
    },
    unitStyle: {
      fontSize: '12px',
      color: '#28F0EE',
    },
    numStyle: {
      backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, #28F0EE 100%), linear-gradient(180deg, #FFFFFF 0%, rgba(40, 240, 238, 0.6) 67%, #28F0EE 100%)`,
      fontSize: '16px',
      color: '#28F0EE',
      height: 'auto',
      lineHeight: 'inherit',
      fontFamily: 'DIN-Bold, DIN',
      fontWeight: 'bold',
    },
  },
  discharging: {
    title: '放电量',
    unit: 'kWh',
    num: '100',
    titleStyle: {
      fontWeight: 400,
      fontSize: '14px',
      color: '#D0DEEE',
    },
    unitStyle: {
      fontSize: '12px',
      color: '#14E6B2 ',
    },
    numStyle: {
      backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, #14E6B2  100%), linear-gradient(180deg, #FFFFFF 0%, rgba(20, 230, 178, 0.6) 67%, #14E6B2  100%)`,
      fontSize: '16px',
      height: 'auto',
      lineHeight: 'inherit',
      color: '#14E6B2 ',
      fontFamily: 'DIN-Bold, DIN',
      fontWeight: 'bold',
    },
  },
};
