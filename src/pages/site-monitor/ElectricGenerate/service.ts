import type { ElectricGenerateInfo, ElectricGenerateStatistic } from './type';
import { get } from '@/utils/request';

export const getElectricGenerateUnitStatistic = (siteId: number) => {
  return get<ElectricGenerateStatistic>(`/oss/site/monitor/generateElectricity/statistics`, {
    siteId,
  });
};

export const getElectricGenerateUnitList = (params: any) => {
  return get<ElectricGenerateInfo[]>(`/oss/site/monitor/generateElectricity/page`, params);
};
