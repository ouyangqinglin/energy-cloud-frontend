import { get } from '@/utils/request';
import type { TimeType } from '../components/TimeButtonGroup';
import type { PVRevenueRes, SystemDiagramRes } from './type';

export const getSystemDiagram = (siteId: number | string) => {
  return get<SystemDiagramRes>('/oss/topologicalGraph/logicalView', {
    siteId,
  });
};
export const getPVRevenue = (siteId: number, timeType: TimeType) => {
  return get<PVRevenueRes>('/oss/site/monitor/overview/siteOverviewGainsStatistics', {
    siteId,
    type: timeType,
  });
};
