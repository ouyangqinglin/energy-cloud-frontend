import request from '@/utils/request';

export interface ChartingStationRes {
  chargingPower: string;
  chargingCapacityToday: string;
  gunIdle: string;
  gunInUse: string;
  earningsToday: string;
}
export const getChargingStation = () => {
  return request<ChartingStationRes>(`/screen/charging/station`, {
    method: 'GET',
  });
};
