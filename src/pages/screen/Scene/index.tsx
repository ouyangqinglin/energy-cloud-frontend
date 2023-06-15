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
import { getSiteId } from './helper';
import StationOverview from './StationOverview';
import ScreenTime from './Time';
import ScreenWeather from './Weather';
import DecorationCarousel from '../components/DecorationCarousel';
import EnergyData from './EnergyData';
import { TimeType } from '../components/TimeButtonGroup';
import Cell from '../components/LayoutCell';
import RealTimePower from './RealTimePower';
import RevenueProportion from './RevenueProportion';
import FullScreen, { useWatchFullScreen } from './FullScreen';
import SubsystemStatistic from './SubsystemStatistic';
import RunningLog from './RunningLog';
import Alarm from './Alarm';
import Geometry from './Geometry';

const Scene = () => {
  useWatchFullScreen();

  return (
    <>
      {/* {/* <QueueAnim duration={1000} delay={30} type={['left', 'right']} ease="easeInOutQuart">
        <Cell key="animation2" cursor="default" width={400} left={24} top={20}>
          <Weather id={getSiteId()} />
        </Cell>
      </QueueAnim> */}
      <Cell cursor="default" width={400} height={258} left={24} top={468}>
        <DecorationCarousel title="能耗数据" valueType="timeButtonGroup">
          <EnergyData timeType={TimeType.DAY} />
        </DecorationCarousel>
      </Cell>
      <Cell cursor="default" width={400} height={307} left={24} top={750}>
        <DecorationCarousel title="站点实时功率" valueType="datePicker">
          <RealTimePower />
        </DecorationCarousel>
      </Cell>
      <Cell cursor="default" width={400} height={317} left={1515} top={81}>
        <DecorationCarousel title="经济占比" valueType="timeButtonGroup">
          <RevenueProportion timeType={TimeType.DAY} />
        </DecorationCarousel>
      </Cell>
      <Title />
      <ScreenTime />
      <ScreenWeather />
      <StationOverview />
      <Benefit />
      <FullScreen />
      <SubsystemStatistic />
      <RunningLog />
      <Alarm />
      <Geometry />
    </>
  );
};
export default Scene;
