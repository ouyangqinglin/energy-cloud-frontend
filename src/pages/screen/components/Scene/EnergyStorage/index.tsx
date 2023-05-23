import { FC, useMemo } from 'react';
import { useEffect } from 'react';
import styles from './index.module.less';
import { useRequest } from 'umi';
import Cell from '../../LayoutCell';
import Decoration from '../../Decoration';
import {
  getChargeAndDischargePower,
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
  DEFAULT_STATISTICS_REQUEST_INTERVAL,
  digitalFlipperItemConfig,
  gunInfoItem,
  RealtimeStatusMap,
} from './config';
import { isNaN } from 'lodash';
import type { RealtimeStatusEnum, StatisticsRes } from './type';
import { keepTwoDecimalWithUnit } from '@/utils/math';

const EnergyStorage: FC = () => {
  const { data: chartData } = useRequest(getEnergyStorageChart, {
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const { data: statisticsData } = useRequest(getEnergyStorageStatistic, {
    pollingInterval: DEFAULT_STATISTICS_REQUEST_INTERVAL,
  });

  const { data: chargeData, run } = useRequest(
    (type = TimeType.DAY) => getChargeAndDischargePower(type),
    {
      manual: true,
    },
  );

  const processedData = useMemo(() => {
    const { statistics = {} } = statisticsData ?? ({} as StatisticsRes);
    const rawData: Record<string, any> = statistics;
    if (!isNaN(rawData?.realTimeStatus)) {
      const realtimeConfig = RealtimeStatusMap[rawData?.realTimeStatus as RealtimeStatusEnum];
      if (realtimeConfig) {
        rawData.realtimeStatus = (
          <span style={{ color: realtimeConfig.color }}>{realtimeConfig.text}</span>
        );
      }
    }
    return rawData;
  }, [statisticsData]);

  const config: DigitalFlipperItemProps[] = useMemo(() => {
    return [
      {
        ...digitalFlipperItemConfig.charging,
        ...{
          num: keepTwoDecimalWithUnit(chargeData?.ACC),
        },
      },
      {
        ...digitalFlipperItemConfig.discharging,
        ...{
          num: keepTwoDecimalWithUnit(chargeData?.ADC),
        },
      },
    ];
  }, [chargeData]);
  // console.log(config);

  useEffect(() => {
    run();
  }, []);

  return (
    <Cell width={400} height={324} left={1496} top={58}>
      <Decoration title="储能">
        <div className={styles.contentWrapper}>
          <Detail
            items={gunInfoItem}
            data={processedData}
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
