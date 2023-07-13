import type { ElectricGenerateInfo, ElectricGenerateStatistic } from './type';
import { get } from '@/utils/request';

export const getElectricGenerateUnitStatistic = (siteId: number) => {
  return get<ElectricGenerateStatistic>(`/oss/site/monitor/electricityConsumption/statistics`, {
    siteId,
  });
};

export const getElectricGenerateUnitList = (params: any) => {
  return get<ElectricGenerateInfo[]>(`/oss/device/deviceList`, params);
};
