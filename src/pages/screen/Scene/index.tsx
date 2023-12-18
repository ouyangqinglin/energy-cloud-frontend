import Title from './Title';
import Benefit from './Benefits';
import QueueAnim from 'rc-queue-anim';
import StationOverview from './StationOverview';
import ScreenTime from './Time';
import ScreenWeather from './Weather';
import DecorationCarousel from '../components/DecorationCarousel';
import EnergyData from './EnergyData';
import { TimeType } from '../components/TimeButtonGroup';
import Cell from '../components/LayoutCell';
import RealTimePower from './RealTimePower';
import RevenueProportion from './RevenueProportion';
import FullScreen from '../components/FullScreen';
import SubsystemStatistic from './SubsystemStatistic';
import RunningLog from './RunningLog';
import AlarmInfo from './Alarm';
import Geometry from './Geometry';
import { useCallback, useMemo, useState } from 'react';
import { useWatchingAlarm } from './Alarm/useSubscribe';
import ButtonGroupCarousel, { SystemDiagramType } from '../components/ButtonGroupCarousel';
import GeometrySystem from './GeometrySystem';
import ButtonGroupCarouselInSystemData from '../components/ButtonGroupCarouselInSystemData';
import AccumulatedPowerChart from './AccumulatedPowerChart';
import { SiteInfoRes } from './StationOverview/type';
import { formatMessage } from '@/utils';

const Scene = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInfoRes>();
  const [energyTimeType, setEnergyTimeType] = useState(TimeType.DAY);
  const [revenueTimeType, setRevenueTimeType] = useState(TimeType.DAY);
  const { alarmCount, latestAlarm, alarmDeviceTree } = useWatchingAlarm();

  const EnergyDataWidget = useMemo(
    () => (
      <Cell key={'EnergyData'} cursor="default" width={400} height={589} left={24} top={468}>
        <DecorationCarousel
          panelStyle={{ padding: '17px 16px' }}
          title={formatMessage({ id: 'screen.systemRunningData', defaultMessage: '系统运行数据' })}
          valueType="timeButtonGroup"
          onTimeButtonChange={setEnergyTimeType}
        >
          <EnergyData timeType={energyTimeType} />
          <ButtonGroupCarouselInSystemData>
            <RealTimePower />
            <AccumulatedPowerChart />
          </ButtonGroupCarouselInSystemData>
          {/* <div className={styles.topBar}>
            <h3 className={styles.chartTitle}>系统实时功率</h3>
          </div> */}
        </DecorationCarousel>
      </Cell>
    ),
    [energyTimeType],
  );

  const RevenueTimeTypeWidget = useMemo(
    () => (
      <Cell
        key={'RevenueProportion'}
        cursor="default"
        width={400}
        height={317}
        left={1515}
        top={81}
      >
        <DecorationCarousel
          title={formatMessage({ id: 'screen.economicProportion', defaultMessage: '经济占比' })}
          valueType="timeButtonGroup"
          onTimeButtonChange={setRevenueTimeType}
        >
          <RevenueProportion timeType={revenueTimeType} />
        </DecorationCarousel>
      </Cell>
    ),
    [revenueTimeType],
  );

  const [geometryMode, setGeometryMode] = useState<SystemDiagramType>();
  const switchGeometry = (value: SystemDiagramType) => {
    setGeometryMode(value);
  };

  const onSiteChange = useCallback((res: SiteInfoRes) => {
    setSiteInfo(res);
  }, []);

  return (
    <>
      {[EnergyDataWidget, RevenueTimeTypeWidget]}
      <Title title={siteInfo?.name} />
      <ScreenTime />
      <ScreenWeather />
      <StationOverview onChange={onSiteChange} />
      <Benefit />
      <SubsystemStatistic />
      <RunningLog />
      <ButtonGroupCarousel onChange={switchGeometry} />
      {geometryMode === SystemDiagramType.CUSTOMER && (
        <Geometry alarmDeviceTree={alarmDeviceTree} />
      )}
      {geometryMode === SystemDiagramType.NORMAL && <GeometrySystem />}
      <AlarmInfo alarmCount={alarmCount} latestAlarm={latestAlarm} />
      <FullScreen />
    </>
  );
};
export default Scene;
