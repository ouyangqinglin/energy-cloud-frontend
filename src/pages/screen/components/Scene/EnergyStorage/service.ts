import request from '@/utils/request';

export interface EnergyStorageRes {
  realtimeStatus: number;
  chargingAndDischargingPower: string;
  soc: string;
  soh: string;
}
export const getEnergyStorage = () => {
  return request<EnergyStorageRes>(`/screen/energy/storage`, {
    method: 'GET',
  });
};
