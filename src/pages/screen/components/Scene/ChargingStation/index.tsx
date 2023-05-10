import type { FC } from 'react';
import styles from './index.less';
import { useRequest } from 'umi';
import Cell from '../../LayoutCell';
import Decoration from '../../Decoration';
import type { DetailItem } from '@/components/Detail';
import Detail from '@/components/Detail';
import { getChargingStation } from './service';
import ChargingStationChart from './ChargingStationChart';

const ChargingStation: FC = () => {
  const { data = {} } = useRequest(getChargingStation);
  const gunInfoItem: DetailItem[] = [
    { label: '充电功率', field: 'chargingPower' },
    { label: '今日充电量', field: 'chargingCapacityToday' },
    { label: '充电枪空闲/使用', field: 'gunStatus' },
    { label: '今日收益', field: 'earningsToday' },
  ];

  const formatterData = () => {
    data.gunStatus = (
      <>
        <span>{data.gunIdle}</span>/<span style={{ color: '#50F0FF' }}>{data.gunInUse}</span>
      </>
    );
    return data;
  };

  return (
    <Cell width={400} height={284} left={1496} top={720}>
      <Decoration title="充电桩">
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
          <ChargingStationChart />
        </div>
      </Decoration>
    </Cell>
  );
};

export default ChargingStation;
