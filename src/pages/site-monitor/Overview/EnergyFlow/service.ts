import { get } from '@/utils/request';
import type { chartTypeEnum } from '@/components/Chart/config';
import type { PVRevenueRes, SystemDiagramRes, PowerFlowDataType } from './type';

export const getSystemDiagram = (siteId: number | string) => {
  return get<SystemDiagramRes>('/oss/topologicalGraph/logicalView', {
    siteId,
  });
};

export const getSystemPowerDiagram = (siteId: number | string) => {
  return get<PowerFlowDataType>('/oss/topologicalGraph/logicalViewPower', {
    siteId,
  });
};
export const getPVRevenue = (siteId: number, timeType: chartTypeEnum) => {
  return get<PVRevenueRes>('/oss/site/monitor/overview/siteOverviewGainsStatistics', {
    siteId,
    type: timeType,
  });
};
