import type { DetailItem } from '@/components/Detail';
import Detail from '@/components/Detail';
import type { FC } from 'react';
import { useRequest } from 'umi';
import Decoration from '../../Decoration';
import Cell from '../../LayoutCell';
import { getStationInfo } from './service';
import styles from './index.module.less';
import { stationInfoConfig } from './config';

const StationInfo: FC = () => {
  const { data } = useRequest(getStationInfo);
  const gunInfoItem: DetailItem[] = stationInfoConfig.map((item) => {
    const Icon = item.icon;
    return {
      label: (
        <div className={styles.itemLeft}>
          {/* <Icon className={styles.icon} /> */}
          <div className={styles.icon} style={{ backgroundImage: `url(${item.icon})` }}></div>
          <span>{item.label}</span>
        </div>
      ),
      field: item.field,
      span: 0,
    };
  });
  return (
    <Cell width={400} height={354} left={24} top={58}>
      <Decoration title="站点信息概览">
        <div className={styles.contentWrapper}>
          <Detail
            colon={false}
            items={gunInfoItem}
            data={data}
            column={1}
            labelStyle={{
              color: '#A7B7CA',
              height: '25px',
              lineHeight: '25px',
              fontSize: '1.11vh',
            }}
            contentStyle={{
              color: 'white',
              height: '25px',
              lineHeight: '25px',
              fontSize: '1.11vh',
            }}
          />
        </div>
      </Decoration>
    </Cell>
  );
};
export default StationInfo;
