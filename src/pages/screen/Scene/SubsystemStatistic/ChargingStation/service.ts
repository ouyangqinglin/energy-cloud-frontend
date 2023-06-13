import { getSiteId } from '@/pages/screen/components/Scene/helper';
import { get } from '@/utils/request';
import type { ChargingStationRes } from './type';

export const getChargingStation = () => {
  return get<ChargingStationRes>(`/oss/chargingPlie/statistic`, {
    siteId: getSiteId(),
  });
};
