import { useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import styles from './index.less';
import { useRequest } from 'umi';
import Detail from '@/components/Detail';
import { getChargingStation } from './service';
import ChargingStationChart from './Chart';
import type { ChargingStationRes } from './type';
import { DEFAULT_CONFIG, gunInfoItem } from './config';
import { defaults } from 'lodash';
import TimeButtonGroup from '@/pages/screen/components/TimeButtonGroup';
import { List } from 'antd';
import classnames from 'classnames';
import DigitalFlipperItem from '@/pages/screen/components/DigitalFlipper/Item';
import { keepTwoDecimalWithUnit } from '@/utils/math';
import StatisticChart from '../Chart';

const ChargingStation: FC = () => {
  const { data = {} as ChargingStationRes, run } = useRequest(getChargingStation);

  const formatterData = useMemo(() => {
    const processedData: ChargingStationRes & {
      gunStatus?: ReactNode | string;
    } = defaults(data ?? {}, DEFAULT_CONFIG);

    const { chargingGunStatus: { freeCount = '--', occupyCount = '--' } = {} } = processedData;
    processedData.gunStatus = (
      <>
        <span>{freeCount}</span>/<span style={{ color: '#50F0FF' }}>{occupyCount}</span>
      </>
    );

    return processedData;
  }, [data]);

  const dataSource: DigitalFlipperItemProps[] = [
    {
      title: '光伏系统收益',
      num: '200',
      unit: '元',
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
      title: '发电量',
      num: '400',
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
      title: '自发自用电量',
      num: '500',
      floatLength: 2,
      unit: 'kWh',
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
      title: '上网电量',
      num: '300',
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
  ];

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.realtimeStatistic}>
        <div className={styles.content}>
          实时发电功率：
          <div className={styles.number}>{keepTwoDecimalWithUnit(123)}</div>
          <span className={styles.unit}>kWh</span>
        </div>
        <div className={styles.content}>
          实时发电功率：
          <div className={styles.number}>{keepTwoDecimalWithUnit(123)}</div>
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
                <DigitalFlipperItem {...item} />
                <div className={classnames([styles.rect, styles['top-left']])} />
                <div className={classnames([styles.rect, styles['top-right']])} />
                <div className={classnames([styles.rect, styles['bottom-right']])} />
                <div className={classnames([styles.rect, styles['bottom-left']])} />
              </div>
            </List.Item>
          )}
        />
      </div>
      <StatisticChart title="充电桩电量" chartData={[]} />
    </div>
  );
};

export default ChargingStation;
