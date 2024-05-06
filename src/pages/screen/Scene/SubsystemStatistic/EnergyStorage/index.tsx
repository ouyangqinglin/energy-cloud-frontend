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
import DigitalFlipperItem, {
  DigitalFlipperItemProps,
} from '@/pages/screen/components/DigitalFlipper/Item';
import DigitalFlipperGroup from '@/pages/screen/components/DigitalFlipper/Group';
import TimeButtonGroup, { TimeType } from '@/pages/screen/components/TimeButtonGroup';
import { Col, List, Row, Statistic } from 'antd';
import ChartProcess from '../ChartProcess';
import classnames from 'classnames';
import StatisticChart from '../Chart';
import dayjs from 'dayjs';
import type { Moment } from 'moment';
import type { RangePickerSharedProps } from 'rc-picker/lib/RangePicker';
import type { ChartRes } from '../Chart/type';
import { convertToData, sortedData } from '../Chart/helper';
import { formatMessage } from '@/utils';

const chartConfigMap = {
  charge: {
    name: formatMessage({ id: 'screen.chargingCapacity', defaultMessage: '充电量' }),
    unit: 'kWh',
  },
  discharge: {
    name: formatMessage({ id: 'screen.dischargingCapacity', defaultMessage: '放电量' }),
    unit: 'kWh',
  },
};

const EnergyStorage: FC = () => {
  const { data: rawChartData, run: runForChart } = useRequest(getEnergyStorageChart, {
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
    manual: true,
  });

  const { data: statisticsData } = useRequest(getEnergyStorageStatistic, {
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const { data: chargeData, run } = useRequest(
    (type = TimeType.DAY) => getChargeAndDischargePower(type),
    {
      manual: true,
    },
  );

  useEffect(() => {
    run();
  }, []);

  const onDateChange: RangePickerSharedProps<Moment>['onChange'] = useCallback(
    (rangeDate) => {
      if (rangeDate) {
        runForChart(
          dayjs(rangeDate[0] as any).format('YYYY-MM-DD'),
          dayjs(rangeDate[1] as any).format('YYYY-MM-DD'),
        );
      }
    },
    [runForChart],
  );

  const chartData: ChartRes = [];
  if (rawChartData) {
    Object.entries(rawChartData).forEach(([key, value]) => {
      value.forEach((it) => {
        chartData.push({
          ts: it.time,
          value: it.value,
          field: chartConfigMap[key]?.name,
        });
      });
    });
  }

  return (
    <div className={styles.contentWrapper}>
      <List
        grid={{
          gutter: 16,
          column: 3,
        }}
        dataSource={realTimeStatisticConfig}
        renderItem={(item) => (
          <List.Item>
            <div className={styles.realtimeStatistic}>
              <DigitalFlipperItem
                {...item}
                itemClassNameWrapper={styles.innerBox}
                data={statisticsData}
              />
            </div>
          </List.Item>
        )}
      />
      <div className={styles.batteryStatus}>
        <span>SOC：{keepTwoDecimalWithUnit(statisticsData?.soc)}%</span>
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
        // chartConfigMap={{
        //   charge: {
        //     name: '充电量',
        //     unit: 'kWh',
        //   },
        //   discharge: {
        //     name: '放电量',
        //     unit: 'kWh',
        //   },
        // }}
        color={['#159AFF', '#00E0DB']}
        title={formatMessage({
          id: 'screen.storageChargingDischargingCapacity',
          defaultMessage: '储能充放电量',
        })}
        onDateChange={onDateChange}
        chartData={sortedData(convertToData(chartData))}
      />
    </div>
  );
};

export default EnergyStorage;
