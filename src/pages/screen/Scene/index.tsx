// import Geometry from './Geometry/index';
import StationInfo from './StationInfo';
import Title from './Title';
// import DeviceList from './DeviceList';
// import AlarmList from './AlarmList';
// import ChargingStation from './ChargingStation';
// import Photovoltaic from './Photovoltaic';
// import EnergyStorage from './EnergyStorage';
// import Weather from '../Weather';
import Benefit from './Benefits';
import QueueAnim from 'rc-queue-anim';
import StationOverview from './StationOverview';
import ScreenTime from './Time';
import ScreenWeather from './Weather';
import DecorationCarousel from '../components/DecorationCarousel';
import EnergyData from './EnergyData';
import { TimeType } from '../components/TimeButtonGroup';
import Cell from '../components/LayoutCell';
import RealTimePower from './RealTimePower';
import RevenueProportion from './RevenueProportion';
import FullScreen from './FullScreen';
import SubsystemStatistic from './SubsystemStatistic';
import RunningLog from './RunningLog';
import AlarmInfo from './Alarm';
import Geometry from './Geometry';
import styles from './index.less';
import { useMemo, useState } from 'react';

const Scene = () => {
  const [energyTimeType, setEnergyTimeType] = useState(TimeType.DAY);
  const [revenueTimeType, setRevenueTimeType] = useState(TimeType.DAY);

  const EnergyDataWidget = useMemo(
    () => (
      <Cell key={'EnergyData'} cursor="default" width={400} height={589} left={24} top={468}>
        <DecorationCarousel
          panelStyle={{ padding: '17px 16px' }}
          title="系统运行数据"
          valueType="timeButtonGroup"
          onTimeButtonChange={setEnergyTimeType}
        >
          <EnergyData timeType={energyTimeType} />
          <div className={styles.topBar}>
            <h3 className={styles.chartTitle}>系统实时功率</h3>
          </div>
          <RealTimePower />
        </DecorationCarousel>
      </Cell>
    ),
    [energyTimeType],
  );

  const RevenueTimeTypeWidget = useMemo(
    () => (
      <Cell
        key={'RevenueProportion'}
        cursor="default"
        width={400}
        height={317}
        left={1515}
        top={81}
      >
        <DecorationCarousel
          title="经济占比"
          valueType="timeButtonGroup"
          onTimeButtonChange={setRevenueTimeType}
        >
          <RevenueProportion timeType={revenueTimeType} />
        </DecorationCarousel>
      </Cell>
    ),
    [revenueTimeType],
  );

  return (
    <>
      {[EnergyDataWidget, RevenueTimeTypeWidget]}
      <Title />
      <ScreenTime />
      <ScreenWeather />
      <StationOverview />
      <Benefit />
      <SubsystemStatistic />
      <RunningLog />
      <Geometry />
      <AlarmInfo />
      <FullScreen />
    </>
  );
};
export default Scene;
