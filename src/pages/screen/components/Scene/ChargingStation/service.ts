import { get } from '@/utils/request';
import { getSiteId } from '../helper';
import type { ChargingStationRes } from './type';

export const getChargingStation = () => {
  return get<ChargingStationRes>(`/oss/chargingPlie/statistic`, {
    siteId: getSiteId(),
  });
};
