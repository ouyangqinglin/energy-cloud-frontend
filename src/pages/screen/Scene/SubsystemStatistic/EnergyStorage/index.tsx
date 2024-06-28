import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import styles from './index.less';
import { useRequest } from 'umi';
import {
  getChargeAndDischargePower,
  getEnergyStorageChart,
  getEnergyStorageStatistic,
} from './service';
import { dataSource, DEFAULT_REQUEST_INTERVAL, realTimeStatisticConfig } from './config';
import { keepTwoDecimalWithUnit } from '@/utils/math';
import DigitalFlipperItem from '@/pages/screen/components/DigitalFlipper/Item';
import DigitalFlipperGroup from '@/pages/screen/components/DigitalFlipper/Group';
import TimeButtonGroup, { TimeType } from '@/pages/screen/components/TimeButtonGroup';
import { List } from 'antd';
import ChartProcess from '../ChartProcess';
import classnames from 'classnames';
import StatisticChart from '../Chart';
import dayjs from 'dayjs';
import type { Moment } from 'moment';
import type { RangePickerSharedProps } from 'rc-picker/lib/RangePicker';
import { formatMessage } from '@/utils';
import { getChartData } from '../Chart/config';
import type { TypeChartDataType } from '@/components/Chart/TypeChart';

const chartConfigMap = new Map([
  [
    'charge',
    {
      name: formatMessage({ id: 'screen.chargingCapacity', defaultMessage: '充电量' }),
      unit: 'kWh',
      color: '#159AFF',
    },
  ],
  [
    'discharge',
    {
      name: formatMessage({ id: 'screen.dischargingCapacity', defaultMessage: '放电量' }),
      unit: 'kWh',
      color: '#FF974A',
    },
  ],
]);

const EnergyStorage: FC = () => {
  const [chartData, setChartData] = useState<TypeChartDataType[]>([]);
  const [series, setSeries] = useState<any[]>([]);
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
  }, [run]);

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

  useEffect(() => {
    const result: any = [];
    const seriesMap: any[] = [];
    chartConfigMap.forEach(({ name, unit, color }, key) => {
      result.push({ data: getChartData(rawChartData?.[key] || [], 'time', 'value'), name, unit });
      seriesMap.push({ type: 'bar', color, barWidth: '20%' });
    });
    setChartData(result);
    setSeries(seriesMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawChartData]);

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
        title={formatMessage({
          id: 'screen.storageChargingDischargingCapacity',
          defaultMessage: '储能充放电量',
        })}
        onDateChange={onDateChange}
        series={series}
        chartData={chartData}
      />
    </div>
  );
};

export default EnergyStorage;
