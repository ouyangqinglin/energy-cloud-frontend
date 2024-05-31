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
import { formatMessage } from '@/utils';

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

  const chartConfigMap = {
    pv: {
      name: formatMessage({ id: 'screen.owerPvGeneration', defaultMessage: '光伏发电' }),
      unit: 'kWh',
    },
    fan: {
      name: formatMessage({ id: 'screen.1014', defaultMessage: '风机发电量' }),
      unit: 'kWh',
    },
  };
  const chartData: ChartRes =
    (rawChartData &&
      rawChartData.map((it, index) => {
        return {
          ts: it.time,
          value: it.value,
          field: chartConfigMap.pv.name, //需要动态修改
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
        chartConfigMap={chartConfigMap}
        color={['#FFD15C']}
        height={164}
        chartData={sortedData(convertToData(chartData))}
      />
    </div>
  );
};

export default Photovoltaic;
