import { get } from '@/utils/request';
import type { TimeType } from '../../TimeButtonGroup';
import type { CurrentPowerGenerationRes, PVChartRes, StatisticsRes } from './type';

export const getCurrentPowerGeneration = () => {
  return get<CurrentPowerGenerationRes>(`/oss/photovoltaic/currentPowerGeneration`, {
    siteId: 1,
  });
};

export const getStatistics = (type: TimeType) => {
  return get<StatisticsRes>(`/oss/photovoltaic/statistics`, { type, siteId: 1 });
};

export const getPVChart = () => {
  return get<PVChartRes>(`/oss/photovoltaic/curve`, { siteId: 1 });
};
