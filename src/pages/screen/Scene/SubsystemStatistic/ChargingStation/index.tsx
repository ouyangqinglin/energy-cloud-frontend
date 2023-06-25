import { useCallback, useEffect } from 'react';
import type { FC } from 'react';
import styles from './index.less';
import { useRequest } from 'umi';
import { getChartStationChart, getChartStationPowerAndGunStatus, getStatistics } from './service';
import { config, DEFAULT_REQUEST_INTERVAL } from './config';
import TimeButtonGroup, { TimeType } from '@/pages/screen/components/TimeButtonGroup';
import { List } from 'antd';
import classnames from 'classnames';
import DigitalFlipperItem from '@/pages/screen/components/DigitalFlipper/Item';
import { keepTwoDecimalWithUnit } from '@/utils/math';
import StatisticChart from '../Chart';
import dayjs from 'dayjs';
import type { RangePickerSharedProps } from 'rc-picker/lib/RangePicker';
import type { ChartRes } from '../Chart/type';
import { convertToData } from '../Chart/helper';
import type { Moment } from 'moment';

const ChargingStation: FC = () => {
  const { data: powerData } = useRequest(getChartStationPowerAndGunStatus);

  const { data: rawChartData, run: runForChart } = useRequest(getChartStationChart, {
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
          ts: it.key,
          value: it.value,
          field: 'discharge',
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
          实时功率：
          <div className={styles.number}>{keepTwoDecimalWithUnit(powerData?.power)}</div>
          <span className={styles.unit}>kWh</span>
        </div>
        <div className={styles.content}>
          充电枪使用/总数：
          <div className={styles.number}>{keepTwoDecimalWithUnit(powerData?.occupyCount)}</div>
          <span className={styles.number} style={{ color: '#fff' }}>
            /{keepTwoDecimalWithUnit(powerData?.totalCount)}
          </span>
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
          dataSource={config}
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
        title="充电桩充电量"
        onDateChange={onDateChange}
        chartConfigMap={{
          discharge: {
            name: '发电量',
            unit: 'kWh',
          },
        }}
        chartData={convertToData(chartData)}
      />
    </div>
  );
};

export default ChargingStation;
