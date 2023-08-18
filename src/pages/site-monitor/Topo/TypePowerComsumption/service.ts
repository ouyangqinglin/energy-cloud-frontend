import { get } from '@/utils/request';
import type { TypePowerConsumptionData } from './type';

export const getTopo = (params: any) => {
  return get<TypePowerConsumptionData>('/oss/siteTopology/electricityTopology', params);
};
