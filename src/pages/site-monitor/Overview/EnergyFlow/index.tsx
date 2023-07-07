import RowBox from '../components/RowBox';
import RealTimeData from './RealTimeData';
import SystemDiagram from './SystemDiagram';
import styles from './index.less';

const EnergyFlow = () => {
  return (
    <RowBox span={18} className={styles.energyFlow}>
      <div style={{ position: 'relative' }}>
        {/* <div style={{ width: 578, height: 320 }}></div> */}
        <SystemDiagram />
      </div>
      <RealTimeData />
    </RowBox>
  );
};

export default EnergyFlow;
