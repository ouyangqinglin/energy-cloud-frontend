import Cell from '../../components/LayoutCell';
import Weather from '../../components/Weather';

const ScreenWeather = () => {
  return (
    <Cell cursor="default" width={210} height={36} left={1570} top={12}>
      <Weather />
    </Cell>
  );
};
export default ScreenWeather;
