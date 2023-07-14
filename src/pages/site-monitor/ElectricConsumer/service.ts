import type { DeviceInfo, ElectricGenerateStatistic } from './type';
import { get } from '@/utils/request';

export const getElectricGenerateUnitStatistic = (siteId: number) => {
  return get<ElectricGenerateStatistic>(`/oss/site/monitor/electricityConsumption/statistics`, {
    siteId,
  });
};

export const getOtherDeviceList = (params: any) => {
  return get<DeviceInfo[]>(`/iot/device/getOtherList`, params);
};

export const getChargeStackList = (params: any) =>
  get<DeviceInfo[]>(`/iot/device/getCSList`, params);
