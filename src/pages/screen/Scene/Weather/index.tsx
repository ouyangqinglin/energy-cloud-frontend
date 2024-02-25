import Cell from '../../components/LayoutCell';
import Weather from '../../components/Weather';

const ScreenWeather = () => {
  return (
    <Cell cursor="default" width={'auto'} height={36} right={175} top={7}>
      <Weather />
    </Cell>
  );
};
export default ScreenWeather;
