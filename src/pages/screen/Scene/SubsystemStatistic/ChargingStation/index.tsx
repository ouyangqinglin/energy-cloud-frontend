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

const ChargingStation: FC = () => {
  const { data = {} as ChargingStationRes } = useRequest(getChargingStation);

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

  return (
    // <Cell width={400} height={284} left={1496} top={728}>
    //   <Decoration title="充电桩">
    <div className={styles.contentWrapper}>
      <Detail
        items={gunInfoItem}
        data={formatterData}
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
      <ChargingStationChart chartData={data} />
    </div>
    //   </Decoration>
    // </Cell>
  );
};

export default ChargingStation;
