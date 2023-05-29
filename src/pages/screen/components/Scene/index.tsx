import type { FC } from 'react';
import Cell from '../LayoutCell';
import Geometry from './Geometry/index';
import StationInfo from './StationInfo';
import Title from './Title';
import DeviceList from './DeviceList';
import AlarmList from './AlarmList';
import ChargingStation from './ChargingStation';
import Photovoltaic from './Photovoltaic';
import EnergyStorage from './EnergyStorage';
import Weather from '../Weather';
import Benefit from './Benefits';
import QueueAnim from 'rc-queue-anim';
import { getSiteId } from './helper';
import FullScreen from './FullScreen';

const Scene: FC = () => {
  return (
    <>
      <FullScreen />
      <QueueAnim duration={1000} delay={30} type={['left', 'right']} ease="easeInOutQuart">
        <Cell key="animation2" cursor="default" width={400} left={24} top={20}>
          <Weather id={getSiteId()} />
        </Cell>
      </QueueAnim>
      <Title />
      <DeviceList />
      <AlarmList />
      <Benefit />
      <EnergyStorage />
      <ChargingStation />
      <Photovoltaic />
      <Geometry />
      <StationInfo />
    </>
  );
};
export default Scene;
