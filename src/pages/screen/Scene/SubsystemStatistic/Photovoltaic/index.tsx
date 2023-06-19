import type { FC } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import styles from './index.less';
import { useRequest } from 'umi';
import { getCurrentPowerGeneration, getPVChart, getStatistics } from './service';
import PhotovoltaicChart from './Chart';
import { dataSource, DEFAULT_REQUEST_INTERVAL } from './config';
import { keepTwoDecimalWithUnit } from '@/utils/math';
import TimeButtonGroup, { TimeType } from '@/pages/screen/components/TimeButtonGroup';
import { List } from 'antd';
import classnames from 'classnames';
import StatisticChart from '../Chart';
import DigitalFlipperItem from '@/pages/screen/components/DigitalFlipper/Item';
import type { Moment } from 'moment';
import type { RangePickerSharedProps } from 'rc-picker/lib/RangePicker';
import dayjs from 'dayjs';
import type { ChartRes } from '../Chart/type';
import { convertToData } from '../Chart/helper';

const Photovoltaic: FC = () => {
  const { data: currentPowerData } = useRequest(getCurrentPowerGeneration);

  const { data: rawChartData, run: runForChart } = useRequest(getPVChart, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const { data: statistics, run } = useRequest((type = TimeType.DAY) => getStatistics(type), {
    manual: true,
  });

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
          ts: it.eventTs,
          value: it.doubleVal,
        };
      })) ??
    [];

  useEffect(() => {
    run();
  }, []);

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.realtimeStatistic}>
        <div className={styles.content}>
          实时发电功率：
          <div className={styles.number}>{keepTwoDecimalWithUnit(currentPowerData)}</div>
          <span className={styles.unit}>kWh</span>
        </div>
      </div>
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
        title="光伏系统发电量"
        onDateChange={onDateChange}
        chartData={convertToData(chartData)}
      />
    </div>
  );
};

export default Photovoltaic;
