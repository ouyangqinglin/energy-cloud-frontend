import { FC, useMemo } from 'react';
import { useEffect } from 'react';
import styles from './index.less';
import { useRequest } from 'umi';
import {
  getChargeAndDischargePower,
  getEnergyStorageChart,
  getEnergyStorageStatistic,
} from './service';
import ChargingStationChart from './Chart';
import Detail from '@/components/Detail';
import {
  DEFAULT_REQUEST_INTERVAL,
  DEFAULT_STATISTICS_REQUEST_INTERVAL,
  digitalFlipperItemConfig,
  gunInfoItem,
  RealtimeStatusMap,
} from './config';
import { isNaN } from 'lodash';
import type { RealtimeStatusEnum, StatisticsRes } from './type';
import { keepTwoDecimalWithUnit } from '@/utils/math';
import { DigitalFlipperItemProps } from '@/pages/screen/components/DigitalFlipper/Item';
import DigitalFlipperGroup from '@/pages/screen/components/DigitalFlipper/Group';
import TimeButtonGroup, { TimeType } from '@/pages/screen/components/TimeButtonGroup';
import { Col, Row, Statistic } from 'antd';
import ChartProcess from '../ChartProcess';
import classnames from 'classnames';
import StatisticChart from '../Chart';

const EnergyStorage: FC = () => {
  const { data: chartData } = useRequest(getEnergyStorageChart, {
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const { data: statisticsData } = useRequest(getEnergyStorageStatistic, {
    pollingInterval: DEFAULT_STATISTICS_REQUEST_INTERVAL,
  });

  const { data: chargeData, run } = useRequest(
    (type = TimeType.DAY) => getChargeAndDischargePower(type),
    {
      manual: true,
    },
  );

  const processedData = useMemo(() => {
    const { statistics = {} } = statisticsData ?? ({} as StatisticsRes);
    const rawData: Record<string, any> = statistics;
    if (!isNaN(rawData?.realTimeStatus)) {
      const realtimeConfig = RealtimeStatusMap[rawData?.realTimeStatus as RealtimeStatusEnum];
      if (realtimeConfig) {
        rawData.realtimeStatus = (
          <span style={{ color: realtimeConfig.color }}>{realtimeConfig.text}</span>
        );
      }
    }
    return rawData;
  }, [statisticsData]);

  const config: DigitalFlipperItemProps[] = useMemo(() => {
    return [
      {
        ...digitalFlipperItemConfig.runningState,
        ...{
          num: 1,
        },
      },
      {
        ...digitalFlipperItemConfig.runningPower,
        ...{
          num: keepTwoDecimalWithUnit(chargeData?.ADC),
        },
      },
      {
        ...digitalFlipperItemConfig.ratedCapacity,
      },
    ];
  }, [chargeData]);

  useEffect(() => {
    run();
  }, []);

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.realtimeStatistic}>
        <DigitalFlipperGroup className={styles.digitalGroup} showDivider={false} config={config} />
      </div>
      <div className={styles.batteryStatus}>
        <ChartProcess />
      </div>
      <div className={styles.dateRange}>
        <TimeButtonGroup onChange={(type) => run(type)} />
      </div>
      <div className={styles.statisticalData}>
        <DigitalFlipperGroup className={styles.digitalGroup} config={config} />
        <div className={classnames([styles.rect, styles['top-left']])} />
        <div className={classnames([styles.rect, styles['top-right']])} />
        <div className={classnames([styles.rect, styles['bottom-right']])} />
        <div className={classnames([styles.rect, styles['bottom-left']])} />
      </div>
      <StatisticChart title="储能系统充放电量" chartData={chartData} />
    </div>
  );
};

export default EnergyStorage;
