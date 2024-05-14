import VideoMonitor from '@/components/VideoMonitor';
import RowBox from '../components/RowBox';
import RealTimeData from './RealTimeData';
import SystemDiagram from './SystemDiagram';
import styles from './index.less';

const EnergyFlow = ({ siteId, siteType }: { siteId?: number; siteType: string }) => {
  return (
    <RowBox span={18} className={styles.energyFlow}>
      <RealTimeData siteId={siteId} siteType={siteType} />
      <div className={styles.content}>
        <SystemDiagram siteId={siteId} siteType={siteType} />
        <VideoMonitor className={styles.videoMonitor} siteId={siteId} />
      </div>
    </RowBox>
  );
};

export default EnergyFlow;
