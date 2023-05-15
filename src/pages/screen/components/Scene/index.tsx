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

const Scene: FC = () => {
  return (
    <>
      <Title />
      <Cell cursor="default" width={400} left={24} top={20}>
        <Weather id={'1'} />
      </Cell>
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
