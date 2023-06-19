import type { TimeType } from '@/pages/screen/components/TimeButtonGroup';
import { get } from '@/utils/request';
import { getSiteId } from '../../helper';
import type { ChartStationChartRes, PowerAndGunStatusRes, StatisticsRes } from './type';

export const getChartStationPowerAndGunStatus = () => {
  return get<PowerAndGunStatusRes>(`/oss/chargingPlie/powerAndGunStatus`, {
    siteId: getSiteId(),
  });
};

export const getStatistics = (type: TimeType) => {
  return get<StatisticsRes>(`/oss/chargingPlie/statisticByDateType`, { type, siteId: getSiteId() });
};

export const getChartStationChart = (startTime: string, endTime: string) => {
  return get<ChartStationChartRes>(`/oss/chargingPlie/statisticCharge`, {
    siteId: getSiteId(),
    startTime,
    endTime,
  });
};
