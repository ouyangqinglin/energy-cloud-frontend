import type { DetailItem } from '@/components/Detail';
import type { DigitalFlipperItemProps } from '@/pages/screen/components/DigitalFlipper/Item';
import { keepTwoDecimalWithUnit } from '@/utils/math';
import { RealtimeStatusEnum } from './type';
import ChargeIcon from '@/assets/image/screen/subsystemStatistic/储能_icon _充电@2x.png';
import DischargeIcon from '@/assets/image/screen/subsystemStatistic/储能_icon _放电@2x.png';
import DefaultIcon from '@/assets/image/screen/subsystemStatistic/储能_icon _静置@2x.png';
import styles from './index.less';

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
    icon: DefaultIcon,
  },
  [RealtimeStatusEnum.CHARGE]: {
    text: '充电',
    color: '#14E6B2',
    icon: ChargeIcon,
  },
  [RealtimeStatusEnum.DISCHARGE]: {
    text: '放电',
    color: '#FFE04D',
    icon: DischargeIcon,
  },
};

export const realTimeStatisticConfig: DigitalFlipperItemProps[] = [
  {
    title: '运行状态',
    field: 'status',
    render: (status: RealtimeStatusEnum = RealtimeStatusEnum.DEFAULT) => {
      const statusItem = RealtimeStatusMap[status] || RealtimeStatusMap[0];
      return (
        <div className={styles.runningStatus}>
          <div className={styles.icon} style={{ backgroundImage: `url(${statusItem.icon})` }} />
          <span style={{ color: statusItem.color }}>{statusItem.text}</span>
        </div>
      );
    },
    titleStyle: {
      fontWeight: 400,
      fontSize: '14px',
      color: '#fff',
    },
    itemStyleWrapper: {
      paddingLeft: 0,
    },
  },
  {
    title: '运行功率',
    unit: 'kW',
    floatLength: 2,
    field: 'power',
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
    itemStyleWrapper: {
      paddingLeft: 0,
    },
  },
  {
    title: '额定容量',
    unit: 'kWh',
    field: 'ratedCapacity',
    floatLength: 2,
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
    itemStyleWrapper: {
      paddingLeft: 0,
    },
  },
];

export const dataSource: DigitalFlipperItemProps[] = [
  {
    title: '储能收益',
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
    title: '充电量',
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
    title: '放电量',
    floatLength: 2,
    field: 'discharge',
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
];
