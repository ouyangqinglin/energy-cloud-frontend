import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import styles from './index.less';
import { useRequest } from 'umi';
import { getCurrentPowerGeneration, getPVChart, getStatistics } from './service';
import { dataSource, dataSourceRealTime, DEFAULT_REQUEST_INTERVAL } from './config';
import TimeButtonGroup, { TimeType } from '@/pages/screen/components/TimeButtonGroup';
import { List } from 'antd';
import classnames from 'classnames';
import StatisticChart from '../Chart';
import { getChartData } from '../Chart/config';
import DigitalFlipperItem from '@/pages/screen/components/DigitalFlipper/Item';
import type { Moment } from 'moment';
import type { RangePickerSharedProps } from 'rc-picker/lib/RangePicker';
import dayjs from 'dayjs';
import { formatMessage } from '@/utils';
import type { TypeChartDataType } from '@/components/Chart/TypeChart';

const Photovoltaic: FC = () => {
  const [chartData, setChartData] = useState<TypeChartDataType[]>([]);
  const [series, setSeries] = useState<any[]>([]);

  const { data: currentPowerData } = useRequest(getCurrentPowerGeneration, {
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const { data: rawChartData, run: runForChart } = useRequest(getPVChart, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const { data: statistics, run } = useRequest((type = TimeType.DAY) => getStatistics(type), {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });
  useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const chartConfigMap = new Map([
    [
      'pv',
      {
        name: formatMessage({ id: 'screen.dieselGeneration', defaultMessage: '柴发发电' }),
        unit: 'kWh',
        color: '#7A79FF',
      },
    ],
  ]);

  useEffect(() => {
    const result: any = [];
    const seriesMap: any[] = [];
    chartConfigMap.forEach(({ name, unit, color }) => {
      result.push({ data: getChartData([] || rawChartData, 'time', 'value'), name, unit });
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
          column: 2,
        }}
        dataSource={dataSourceRealTime}
        renderItem={(item) => (
          <List.Item>
            <div className={styles.realtimeStatistic}>
              <DigitalFlipperItem
                {...item}
                itemClassNameWrapper={styles.innerBox}
                data={currentPowerData}
              />
            </div>
          </List.Item>
        )}
      />
      <div className={styles.dateRange}>
        <TimeButtonGroup onChange={(type) => run(type)} />
      </div>
      <div className={styles.digitalFlipperWrapper}>
        <List
          grid={{
            gutter: 16,
            column: 2,
          }}
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item style={{ marginBottom: '8px' }}>
              <div className={styles.box}>
                <DigitalFlipperItem {...item} data={statistics} />
                <div className={classnames([styles.rect, styles['top-left']])} />
                <div className={classnames([styles.rect, styles['top-right']])} />
                <div className={classnames([styles.rect, styles['bottom-right']])} />
                <div className={classnames([styles.rect, styles['bottom-left']])} />
              </div>
            </List.Item>
          )}
        />
      </div>
      <StatisticChart
        title={formatMessage({ id: 'screen.generatingCapacity', defaultMessage: '发电量' })}
        onDateChange={onDateChange}
        series={series}
        height={224}
        chartData={chartData}
      />
    </div>
  );
};

export default Photovoltaic;
