import { getSiteId } from '@/pages/screen/components/Scene/helper';
import { TimeType } from '@/pages/screen/components/TimeButtonGroup';
import { get } from '@/utils/request';
import type { CurrentPowerGenerationRes, PVChartRes, StatisticsRes } from './type';

export const getCurrentPowerGeneration = () => {
  return get<CurrentPowerGenerationRes>(`/oss/photovoltaic/currentPowerGeneration`, {
    siteId: getSiteId(),
  });
};

export const getStatistics = (type: TimeType) => {
  return get<StatisticsRes>(`/oss/photovoltaic/statistics`, { type, siteId: getSiteId() });
};

export const getPVChart = () => {
  return get<PVChartRes>(`/oss/photovoltaic/curve`, { siteId: getSiteId() });
};
