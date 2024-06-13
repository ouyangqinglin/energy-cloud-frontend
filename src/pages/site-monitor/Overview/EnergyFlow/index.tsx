import VideoMonitor from '@/components/VideoMonitor';
import RowBox from '../components/RowBox';
import RealTimeData from './RealTimeData';
import SystemDiagram from './SystemDiagram';
import styles from './index.less';
import React from 'react';
import { PowerFlowDataType } from '../typing';
import { SiteTypeStrEnum } from '@/utils/enum';

type EnergyFlowType = {
  siteId?: number;
  siteType: SiteTypeStrEnum;
  data?: PowerFlowDataType;
};

const EnergyFlow: React.FC<EnergyFlowType> = (props) => {
  const { siteId, siteType, data } = props;

  return (
    <RowBox span={18} className={styles.energyFlow}>
      <RealTimeData siteId={siteId} siteType={siteType} />
      <div className={styles.content}>
        <SystemDiagram siteId={siteId} siteType={siteType} data={data} />
        <VideoMonitor className={styles.videoMonitor} siteId={siteId} />
      </div>
    </RowBox>
  );
};

export default EnergyFlow;
