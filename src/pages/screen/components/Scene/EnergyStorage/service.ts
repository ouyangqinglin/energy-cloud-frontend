import { get } from '@/utils/request';

export interface EnergyStorageRes {
  realtimeStatus: number;
  chargingAndDischargingPower: string;
  soc: string;
  soh: string;
}
export const getEnergyStorage = () => {
  return get<{ data: EnergyStorageRes }>(`/oss/es/statistic`);
};
