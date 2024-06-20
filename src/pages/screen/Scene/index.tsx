import Title from './Title';
import Benefit from './Benefits';
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
import type { SiteInfoRes } from './StationOverview/type';
import { formatMessage } from '@/utils';
import { getUnitBySiteType } from '@/models/siteType';
import type { UnitType } from '@/models/siteType';
import '@/assets/styles/font.less';
import { ErrorBoundary } from 'react-error-boundary';
import FallBackRender from '@/components/FallBackRender';

const Scene = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInfoRes>();
  const [siteTypeConfig, setSiteTypeConfig] = useState<UnitType>({});
  const [energyTimeType, setEnergyTimeType] = useState(TimeType.DAY);
  const [revenueTimeType, setRevenueTimeType] = useState(TimeType.DAY);
  const [alarmShow, setAlarmShow] = useState<boolean>(false);
  const { alarmCount, latestAlarm, alarmDeviceTree } = useWatchingAlarm();

  const onSiteChange = useCallback((res: SiteInfoRes) => {
    res.energyOptions = '67';
    setSiteTypeConfig(getUnitBySiteType(res?.energyOptions || ''));
    setSiteInfo(res);
  }, []);

  const EnergyDataWidget = useMemo(
    () => (
      <Cell key={'EnergyData'} cursor="default" width={400} height={562} left={24} top={500}>
        <DecorationCarousel
          panelStyle={{ padding: '17px 16px' }}
          title={formatMessage({ id: 'screen.systemRunningData', defaultMessage: '系统运行数据' })}
          valueType="timeButtonGroup"
          onTimeButtonChange={setEnergyTimeType}
        >
          <EnergyData timeType={energyTimeType} siteTypeConfig={siteTypeConfig} />
          <ButtonGroupCarouselInSystemData>
            <RealTimePower siteTypeConfig={siteTypeConfig} />
            <AccumulatedPowerChart siteTypeConfig={siteTypeConfig} />
          </ButtonGroupCarouselInSystemData>
        </DecorationCarousel>
      </Cell>
    ),
    [energyTimeType, siteTypeConfig],
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
          <RevenueProportion timeType={revenueTimeType} siteTypeConfig={siteTypeConfig} />
        </DecorationCarousel>
      </Cell>
    ),
    [revenueTimeType, siteTypeConfig],
  );

  const [geometryMode, setGeometryMode] = useState<SystemDiagramType>();
  const switchGeometry = (value: SystemDiagramType) => {
    setGeometryMode(value);
  };

  return (
    <>
      <ErrorBoundary fallbackRender={FallBackRender}>
        {[EnergyDataWidget, RevenueTimeTypeWidget]}
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={FallBackRender}>
        <Title title={siteInfo?.name} />
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={FallBackRender}>
        <ScreenTime />
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={FallBackRender}>
        <ScreenWeather />
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={FallBackRender}>
        <StationOverview onChange={onSiteChange} siteTypeConfig={siteTypeConfig} />
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={FallBackRender}>
        <Benefit />
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={FallBackRender}>
        <SubsystemStatistic siteTypeConfig={siteTypeConfig} />
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={FallBackRender}>
        <RunningLog />
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={FallBackRender}>
        <ButtonGroupCarousel onChange={switchGeometry} setAlarmShow={setAlarmShow} />
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={FallBackRender}>
        {geometryMode === SystemDiagramType.CUSTOMER && (
          <Geometry alarmDeviceTree={alarmDeviceTree} alarmShow={alarmShow} />
        )}
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={FallBackRender}>
        {geometryMode === SystemDiagramType.NORMAL && (
          <GeometrySystem siteTypeConfig={siteTypeConfig} />
        )}
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={FallBackRender}>
        <AlarmInfo alarmCount={alarmCount} latestAlarm={latestAlarm} alarmShow={alarmShow} />
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={FallBackRender}>
        <FullScreen />
      </ErrorBoundary>
    </>
  );
};
export default Scene;
