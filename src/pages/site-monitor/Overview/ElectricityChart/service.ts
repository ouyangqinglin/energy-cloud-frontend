import { get } from '@/utils/request';
import type { ChartType } from './type';

export const getPowerData = (params: any) => {
  return get<ChartType>(`/oss/site/monitor/overview/getOverviewSitePower`, { ...params });
};
export const getElectricityData = (params: any) => {
  return get<ChartType>(`/oss/site/monitor/overview/getOverviewData`, { ...params });
};
