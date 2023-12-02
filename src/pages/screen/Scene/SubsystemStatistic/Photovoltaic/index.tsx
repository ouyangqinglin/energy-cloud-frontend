import type { FC } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import styles from './index.less';
import { useRequest } from 'umi';
import { getCurrentPowerGeneration, getPVChart, getStatistics } from './service';
import { dataSource, dataSourceRealTime, DEFAULT_REQUEST_INTERVAL } from './config';
import TimeButtonGroup, { TimeType } from '@/pages/screen/components/TimeButtonGroup';
import { List } from 'antd';
import classnames from 'classnames';
import StatisticChart from '../Chart';
import DigitalFlipperItem from '@/pages/screen/components/DigitalFlipper/Item';
import type { Moment } from 'moment';
import type { RangePickerSharedProps } from 'rc-picker/lib/RangePicker';
import dayjs from 'dayjs';
import type { ChartRes } from '../Chart/type';
import { convertToData, sortedData } from '../Chart/helper';

const Photovoltaic: FC = () => {
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
  }, []);

  const onDateChange: RangePickerSharedProps<Moment>['onChange'] = useCallback((rangeDate) => {
    if (rangeDate) {
      runForChart(
        dayjs(rangeDate[0] as any).format('YYYY-MM-DD'),
        dayjs(rangeDate[1] as any).format('YYYY-MM-DD'),
      );
    }
  }, []);

  const chartData: ChartRes =
    (rawChartData &&
      rawChartData.map((it) => {
        return {
          ts: it.time,
          value: it.value,
          field: '发电量',
        };
      })) ??
    [];

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
            <List.Item>
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
        title="光伏发电量"
        onDateChange={onDateChange}
        // chartConfigMap={{
        //   discharge: {
        //     name: '发电量',
        //     unit: 'kWh',
        //   },
        // }}
        color={['#FFD15C']}
        chartData={sortedData(convertToData(chartData))}
      />
    </div>
  );
};

export default Photovoltaic;
