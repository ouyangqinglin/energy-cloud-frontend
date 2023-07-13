import type { ElectricGenerateInfo, ElectricGenerateStatistic } from './type';
import { get } from '@/utils/request';

export const getElectricGenerateUnitStatistic = (data: { orgId: number }) => {
  return get<ElectricGenerateStatistic>(`/oss/site/monitor/generateElectricity/statistics`, data);
};

export const getElectricGenerateUnitList = (params: any) => {
  return get<ElectricGenerateInfo[]>(`/oss/site/monitor/generateElectricity/page`, params);
};
