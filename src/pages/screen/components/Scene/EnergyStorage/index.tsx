import type { FC } from 'react';
import { useEffect } from 'react';
import styles from './index.module.less';
import { useRequest } from 'umi';
import Cell from '../../LayoutCell';
import Decoration from '../../Decoration';
import {
  getChargeAndDischargePower,
  getEnergyStorage,
  getEnergyStorageChart,
  getEnergyStorageStatistic,
} from './service';
import ChargingStationChart from './Chart';
import type { DigitalFlipperItemProps } from '../../DigitalFlipper/Item';
import DigitalFlipperGroup from '../../DigitalFlipper/Group';
import TimeButtonGroup, { TimeType } from '../../TimeButtonGroup';
import Detail from '@/components/Detail';
import {
  DEFAULT_REQUEST_INTERVAL,
  DEFAULT_STATISTICS,
  DEFAULT_STATISTICS_REQUEST_INTERVAL,
  digitalFlipperItemConfig,
  gunInfoItem,
  RealtimeStatusMap,
} from './config';
import { defaults, isNumber } from 'lodash';
import type { RealtimeStatusEnum, StatisticsRes } from './type';

const EnergyStorage: FC = () => {
  const { data: chartData } = useRequest(getEnergyStorageChart, {
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const { data: statisticsData = {} as StatisticsRes } = useRequest(getEnergyStorageStatistic, {
    pollingInterval: DEFAULT_STATISTICS_REQUEST_INTERVAL,
  });

  const { data: chargeData, run } = useRequest(
    (type = TimeType.DAY) => getChargeAndDischargePower(type),
    {
      manual: true,
    },
  );

  const formatterData = () => {
    const { statistics = {} } = statisticsData;
    const processedData: Record<string, any> = defaults(statistics, DEFAULT_STATISTICS);
    if (!Number.isNaN(processedData?.realTimeStatus)) {
      const realtimeConfig = RealtimeStatusMap[processedData?.realTimeStatus as RealtimeStatusEnum];
      if (realtimeConfig) {
        processedData.realtimeStatus = (
          <span style={{ color: realtimeConfig.color }}>{realtimeConfig.text}</span>
        );
      }
    }
    return processedData;
  };

  const formatChargeData = (value: number | undefined) => {
    return isNumber(value) ? value.toFixed(2) : '--';
  };
  const config: DigitalFlipperItemProps[] = [
    {
      ...digitalFlipperItemConfig.charging,
      ...{
        num: formatChargeData(chargeData?.ACC),
      },
    },
    {
      ...digitalFlipperItemConfig.discharging,
      ...{
        num: formatChargeData(chargeData?.ADC),
      },
    },
  ];
  useEffect(() => {
    run();
  }, []);

  return (
    <Cell width={400} height={324} left={1496} top={58}>
      <Decoration title="储能">
        <div className={styles.contentWrapper}>
          <Detail
            items={gunInfoItem}
            data={formatterData()}
            column={2}
            labelStyle={{
              color: '#A7B7CA',
              height: '20px',
              lineHeight: '20px',
              fontSize: '1.11vh',
            }}
            contentStyle={{
              color: 'white',
              height: '20px',
              lineHeight: '20px',
              fontSize: '1.11vh',
            }}
          />
          <div className={styles.digitalFlipperWrapper}>
            <DigitalFlipperGroup className={styles.digitalFlipperContent} config={config} />
            <TimeButtonGroup onChange={(type) => run(type)} />
          </div>
          <ChargingStationChart chartData={chartData} />
        </div>
      </Decoration>
    </Cell>
  );
};

export default EnergyStorage;
