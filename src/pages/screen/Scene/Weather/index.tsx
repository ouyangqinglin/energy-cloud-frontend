import Cell from '../../components/LayoutCell';
import Weather from '../../components/Weather';

const ScreenWeather = () => {
  return (
    <Cell cursor="default" width={178} height={36} left={1590} top={12}>
      <Weather />
    </Cell>
  );
};
export default ScreenWeather;
