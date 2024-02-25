import type { DetailItem } from '@/components/Detail';
import type { DigitalFlipperItemProps } from '@/pages/screen/components/DigitalFlipper/Item';
import { keepTwoDecimalWithUnit } from '@/utils/math';
import styles from './index.less';
import { formatMessage } from '@/utils';

export const DEFAULT_REQUEST_INTERVAL = 5 * 60 * 1000;

export const DEFAULT_STATISTICS_REQUEST_INTERVAL = 60 * 60 * 1000;

export const config: DigitalFlipperItemProps[] = [
  {
    title: formatMessage({ id: 'device.chargingRevenue', defaultMessage: '充电桩收益' }),
    unit: formatMessage({ id: 'common.rmb', defaultMessage: '元' }),
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
    title: formatMessage({ id: 'screen.chargingCapacity', defaultMessage: '充电量' }),
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
    title: formatMessage({
      id: 'screen.chargingPowerUtilizationRate',
      defaultMessage: '充电桩功率利用率',
    }),
    field: 'useRatio',
    floatLength: 2,
    format: (value) => Number(value),
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
    title: formatMessage({ id: 'screen.chargingCycles', defaultMessage: '充电次数' }),
    field: 'totalCount',
    unit: formatMessage({ id: 'screen.times', defaultMessage: '次' }),
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

export const realTimeStatisticConfig: DigitalFlipperItemProps[] = [
  {
    title:
      formatMessage({
        id: 'siteMonitor.chargingPileRealtimePower',
        defaultMessage: '充电桩实时功率',
      }) + '：',
    field: 'power',
    unit: 'kW',
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
    title:
      formatMessage({
        id: 'screen.chargingGunUsageTotalNumber',
        defaultMessage: '充电枪使用/总数',
      }) + '：',
    field: 'occupyCount',
    render: (num, entity) => {
      return (
        <>
          <div className={styles.number}>{keepTwoDecimalWithUnit(entity?.occupyCount)}</div>
          <span className={styles.number} style={{ color: '#fff' }}>
            /{keepTwoDecimalWithUnit(entity?.totalCount)}
          </span>
        </>
      );
    },
  },
];
