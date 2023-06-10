// import Geometry from './Geometry/index';
import StationInfo from './StationInfo';
import Title from './Title';
// import DeviceList from './DeviceList';
// import AlarmList from './AlarmList';
// import ChargingStation from './ChargingStation';
// import Photovoltaic from './Photovoltaic';
// import EnergyStorage from './EnergyStorage';
// import Weather from '../Weather';
// import Benefit from './Benefits';
import QueueAnim from 'rc-queue-anim';
import { getSiteId } from './helper';
import { useWatchFullScreen } from '@/components/header/FullScreen';
import StationOverview from './StationOverview';
import ScreenTime from './Time';
import ScreenWeather from './Weather';
import DecorationCarousel from '../components/DecorationCarousel';
import EnergyData from './EnergyData';
import { TimeType } from '../components/TimeButtonGroup';
import Cell from '../components/LayoutCell';
import RealTimePower from './RealTimePower';

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
      <Title />
      <ScreenTime />
      <ScreenWeather />
      <StationOverview />
      {/* <DeviceList />
      <AlarmList />
      <Benefit />
      <EnergyStorage />
      <ChargingStation />
      <Photovoltaic />
      <Geometry />
      <StationInfo /> */}
    </>
  );
};
export default Scene;
