import type { TimeType } from '@/pages/screen/components/TimeButtonGroup';
import { get } from '@/utils/request';
import { getSiteId } from '../../helper';
import type { PVChartRes, StatisticsRes } from './type';

export const getCurrentPowerGeneration = () => {
  return get<number>(`/iot/photovoltaic/currentPowerGeneration`, {
    siteId: getSiteId(),
  });
};

export const getStatistics = (type: TimeType) => {
  return get<StatisticsRes>(`/oss/photovoltaic/statistics`, { type, siteId: getSiteId() });
};

export const getPVChart = (startTime: string, endTime: string) => {
  return get<PVChartRes>(`/iot/photovoltaic/histogram`, {
    siteId: getSiteId(),
    startTime,
    endTime,
  });
};
