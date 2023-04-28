import type { FC } from 'react';
import Cell from '../LayoutCell';
import Geometry from './Geometry/index';
import { ReactComponent as DemonstrationBackground } from '@/assets/image/screen/demonstration_bg.svg';
import StationInfo from './StationInfo';
import Title from './Title';
import DeviceList from './DeviceList';
import AlarmList from './AlarmList';
const Scene: FC = () => {
  return (
    <>
      <Cell cursor="default" width={1040} height={667} left={441} top={346}>
        <DemonstrationBackground width={1040} height={667} />
      </Cell>
      <Title />
      <DeviceList />
      <AlarmList />
      <Geometry />
      <StationInfo />
    </>
  );
};
export default Scene;
