import CardDecoration from '../components/CardDecoration';
import RowBox from '../components/RowBox';
import RealTimeData from './RealTimeData';
import styles from './index.less';

const EnergyFlow = () => {
  return (
    <CardDecoration>
      <RowBox className={styles.energyFlow}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 578, height: 320 }}></div>
        </div>
        <RealTimeData></RealTimeData>
      </RowBox>
    </CardDecoration>
  );
};

export default EnergyFlow;
