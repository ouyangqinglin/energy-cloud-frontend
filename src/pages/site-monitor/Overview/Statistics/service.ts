import { get } from '@/utils/request';
import { ElectricityStatisticsRes } from './type';

export const getElectricityStatistics = (siteId: number) => {
  return get<ElectricityStatisticsRes>('/oss/site/monitor/overview/todayElectricityStatistics', {
    siteId,
  });
};
