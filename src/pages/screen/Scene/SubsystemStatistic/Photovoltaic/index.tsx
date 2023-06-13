import type { FC } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import styles from './index.less';
import { useRequest } from 'umi';
import { getCurrentPowerGeneration, getPVChart, getStatistics } from './service';
import PhotovoltaicChart from './Chart';
import { DEFAULT_REQUEST_INTERVAL, digitalFlipperItemConfig } from './config';
import { keepTwoDecimalWithUnit } from '@/utils/math';
import TimeButtonGroup, { TimeType } from '@/pages/screen/components/TimeButtonGroup';
import { List } from 'antd';
import classnames from 'classnames';
import StatisticChart from '../Chart';
import DigitalFlipperItem, {
  DigitalFlipperItemProps,
} from '@/pages/screen/components/DigitalFlipperV2/Item';

const Photovoltaic: FC = () => {
  const { data: chartData } = useRequest(getPVChart, {
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const { data: statistics, run } = useRequest((type = TimeType.DAY) => getStatistics(type), {
    manual: true,
  });

  const config: DigitalFlipperItemProps[] = useMemo(
    () => [
      {
        ...digitalFlipperItemConfig.powerGeneration,
        ...{
          num: keepTwoDecimalWithUnit(statistics?.powerGeneration),
        },
      },
      {
        ...digitalFlipperItemConfig.profit,
        ...{
          num: keepTwoDecimalWithUnit(statistics?.profit),
        },
      },
    ],
    [statistics],
  );

  const dataSource: DigitalFlipperItemProps[] = [
    {
      title: '光伏系统收益',
      num: '200',
      unit: '元',
      floatLength: 2,
      numStyle: {
        width: 'auto',
        fontSize: 20,
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
        background: 'none',
        WebkitTextFillColor: 'inherit',
      },
      unitStyle: {
        color: '#ACCCEC',
        fontSize: 12,
      },
    },
  ];

  useEffect(() => {
    run();
  }, []);

  const { data: currentPowerData } = useRequest(getCurrentPowerGeneration);
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.powerGeneration}>
        <div className={styles.content}>
          实时发电功率：
          <div className={styles.number}>
            {keepTwoDecimalWithUnit(currentPowerData?.CurrentPowerGeneration)}
          </div>
          <span className={styles.unit}>kWh</span>
        </div>
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
      <StatisticChart title="充电桩电量" chartData={chartData} />
    </div>
  );
};

export default Photovoltaic;
