import type { TimeType } from '@/pages/screen/components/TimeButtonGroup';
import { get } from '@/utils/request';
import { getSiteId } from '../../helper';
import type { CurrentPowerRes, PVChartRes, StatisticsRes } from './type';

export const getCurrentPowerGeneration = () => {
  return get<CurrentPowerRes>(`/iot/dieselGenerator/powerGeneration`, {
    siteId: getSiteId(),
  });
};

export const getStatistics = (type: TimeType) => {
  return get<StatisticsRes>(`/oss/photovoltaic/statistics`, { type, siteId: getSiteId() });
};

export const getPVChart = (startTime: string, endTime: string) => {
  return get<PVChartRes>(`/oss/site/pvHistogram`, {
    siteId: getSiteId(),
    startTime,
    endTime,
  });
};
