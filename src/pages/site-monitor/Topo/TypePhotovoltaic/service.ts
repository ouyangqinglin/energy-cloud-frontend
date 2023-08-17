import { get } from '@/utils/request';
import type { TypePhotovoltaicData } from './type';

export const getTopo = (params: any) => {
  return get<TypePhotovoltaicData>('/oss/siteTopology/pvTopology', params);
};
