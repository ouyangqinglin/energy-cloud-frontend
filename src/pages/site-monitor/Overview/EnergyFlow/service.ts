import { get, post } from '@/utils/request';
import { TimeType } from '../components/TimeButtonGroup';
import { PVRevenueRes, SystemDiagramRes } from './type';

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
