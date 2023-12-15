import RowBox from '../components/RowBox';
import RealTimeData from './RealTimeData';
import SystemDiagram from './SystemDiagram';
import styles from './index.less';

const EnergyFlow = ({ siteId }: { siteId?: number }) => {
  return (
    <RowBox span={18} className={styles.energyFlow}>
      <RealTimeData siteId={siteId} />
      <div className={styles.content}>
        <SystemDiagram siteId={siteId} />
      </div>
    </RowBox>
  );
};

export default EnergyFlow;
