import type { FC } from 'react';
import Cell from '../LayoutCell';
import Geometry from './Geometry/index';
import { ReactComponent as DemonstrationBackground } from '@/assets/image/screen/demonstration_bg.svg';
import StationInfo from './StationInfo';
import Title from './Title';
import DeviceList from './DeviceList';
import AlarmList from './AlarmList';
import ChargingStation from './ChargingStation';
import Photovoltaic from './Photovoltaic';
import EnergyStorage from './EnergyStorage';
import Weather from '../Weather';
import BenefitsEconomic from './Benefits/Economic';
import BenefitSocial from './Benefits/Social';

const Scene: FC = () => {
  return (
    <>
      <Cell cursor="default" width={1040} height={667} left={441} top={280}>
        <DemonstrationBackground width={1040} height={667} />
      </Cell>
      <Title />
      <Cell cursor="default" width={400} left={24} top={20}>
        <Weather code={'1'} />
      </Cell>
      <DeviceList />
      <AlarmList />
      <BenefitsEconomic />
      <EnergyStorage />
      <BenefitSocial />
      <ChargingStation />
      <Photovoltaic />
      <Geometry />
      <StationInfo />
    </>
  );
};
export default Scene;
