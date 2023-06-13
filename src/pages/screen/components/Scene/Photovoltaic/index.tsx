import { FC, useMemo } from 'react';
import { useEffect } from 'react';
import styles from './index.less';
import { useRequest } from 'umi';
import Cell from '../../LayoutCell';
import Decoration from '../../Decoration';
import { getCurrentPowerGeneration, getPVChart, getStatistics } from './service';
import PhotovoltaicChart from './Chart';
import type { DigitalFlipperItemProps } from '../../DigitalFlipper/Item';
import DigitalFlipperGroup from '../../DigitalFlipper/Group';
import TimeButtonGroup, { TimeType } from '../../TimeButtonGroup';
import { DEFAULT_REQUEST_INTERVAL, digitalFlipperItemConfig } from './config';
import { keepTwoDecimalWithUnit } from '@/utils/math';

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

  useEffect(() => {
    run();
  }, []);

  const { data: currentPowerData } = useRequest(getCurrentPowerGeneration);
  return (
    <Cell width={400} height={314} left={1496} top={398}>
      <Decoration title="光伏">
        <div className={styles.contentWrapper}>
          <div className={styles.powerGeneration}>
            当前发电功率：{keepTwoDecimalWithUnit(currentPowerData?.CurrentPowerGeneration)}kWh
          </div>
          <div className={styles.digitalFlipperWrapper}>
            <DigitalFlipperGroup className={styles.digitalFlipperContent} config={config} />
            <TimeButtonGroup onChange={(type) => run(type)} />
          </div>
          <PhotovoltaicChart chartData={chartData} />
        </div>
      </Decoration>
    </Cell>
  );
};

export default Photovoltaic;
