import type { FC } from 'react';
import { useCallback, useMemo } from 'react';
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
  dataSource,
  DEFAULT_REQUEST_INTERVAL,
  DEFAULT_STATISTICS_REQUEST_INTERVAL,
  digitalFlipperItemConfig,
  gunInfoItem,
  realTimeStatisticConfig,
  RealtimeStatusMap,
} from './config';
import { isNaN } from 'lodash';
import type { RealtimeStakeepTwoDecimalWithUnittusEnum, StatisticsRes } from './type';
import { keepTwoDecimalWithUnit } from '@/utils/math';
import { DigitalFlipperItemProps } from '@/pages/screen/components/DigitalFlipper/Item';
import DigitalFlipperGroup from '@/pages/screen/components/DigitalFlipper/Group';
import TimeButtonGroup, { TimeType } from '@/pages/screen/components/TimeButtonGroup';
import { Col, Row, Statistic } from 'antd';
import ChartProcess from '../ChartProcess';
import classnames from 'classnames';
import StatisticChart from '../Chart';
import dayjs from 'dayjs';
import type { Moment } from 'moment';
import type { RangePickerSharedProps } from 'rc-picker/lib/RangePicker';
import type { ChartRes } from '../Chart/type';
import { convertToData, sortedData } from '../Chart/helper';

const EnergyStorage: FC = () => {
  const { data: rawChartData, run: runForChart } = useRequest(getEnergyStorageChart, {
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const { data: statisticsData } = useRequest(getEnergyStorageStatistic);

  const { data: chargeData, run } = useRequest(
    (type = TimeType.DAY) => getChargeAndDischargePower(type),
    {
      manual: true,
    },
  );

  useEffect(() => {
    run();
  }, []);

  const onDateChange: RangePickerSharedProps<Moment>['onChange'] = useCallback((rangeDate) => {
    if (rangeDate) {
      runForChart(
        dayjs(rangeDate[0] as any).format('YYYY-MM-DD'),
        dayjs(rangeDate[1] as any).format('YYYY-MM-DD'),
      );
    }
  }, []);

  const chartData: ChartRes = [];
  if (rawChartData) {
    Object.entries(rawChartData).forEach(([key, value]) => {
      value.forEach((it) => {
        chartData.push({
          ts: it.eventTs,
          value: it.doubleVal,
          field: key,
        });
      });
    });
  }

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.realtimeStatistic}>
        <DigitalFlipperGroup
          className={styles.digitalGroup}
          showDivider={false}
          config={realTimeStatisticConfig}
          data={statisticsData}
        />
      </div>
      <div className={styles.batteryStatus}>
        <span>SOC：{keepTwoDecimalWithUnit(statisticsData?.soc)}%</span>
        <span>SOH：{keepTwoDecimalWithUnit(statisticsData?.soh)}%</span>
      </div>
      <ChartProcess
        discharge={statisticsData?.discharge}
        charge={statisticsData?.charge}
        capacity={statisticsData?.ratedCapacity}
      />
      <div className={styles.dateRange}>
        <TimeButtonGroup onChange={(type) => run(type)} />
      </div>
      <div className={styles.statisticalData}>
        <DigitalFlipperGroup
          className={styles.digitalGroup}
          config={dataSource}
          data={chargeData}
        />
        <div className={classnames([styles.rect, styles['top-left']])} />
        <div className={classnames([styles.rect, styles['top-right']])} />
        <div className={classnames([styles.rect, styles['bottom-right']])} />
        <div className={classnames([styles.rect, styles['bottom-left']])} />
      </div>
      <StatisticChart
        showLegend={true}
        chartConfigMap={{
          charge: {
            name: '充电量',
            unit: 'kWh',
          },
          discharge: {
            name: '充电量',
            unit: 'kWh',
          },
        }}
        title="储能充放电量"
        onDateChange={onDateChange}
        chartData={sortedData(convertToData(chartData))}
      />
    </div>
  );
};

export default EnergyStorage;
