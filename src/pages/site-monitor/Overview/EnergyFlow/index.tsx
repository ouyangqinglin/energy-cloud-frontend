import RowBox from '../components/RowBox';
import RealTimeData from './RealTimeData';
import SystemDiagram from './SystemDiagram';
import styles from './index.less';
import { useRequest } from 'umi';
import { getSystemDiagram } from './service';
import { isNil } from 'lodash';
import { useEffect } from 'react';

const EnergyFlow = ({ siteId }: { siteId?: number }) => {
  return (
    <RowBox span={18} className={styles.energyFlow}>
      <div style={{ position: 'relative' }}>
        <SystemDiagram siteId={siteId} />
      </div>
      <RealTimeData siteId={siteId} />
    </RowBox>
  );
};

export default EnergyFlow;
