import DecorationCarousel from '../../components/DecorationCarousel';
import Cell from '../../components/LayoutCell';
import StationDevices from '../StationDevices';
import StationInfo from '../StationInfo';

const StationOverview = () => {
  return (
    <Cell cursor="default" width={400} height={363} left={24} top={81}>
      <DecorationCarousel title="站点信息概览">
        {[<StationInfo key="1" />, <StationDevices key="2" />]}
      </DecorationCarousel>
    </Cell>
  );
};
export default StationOverview;
