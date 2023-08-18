import { get } from '@/utils/request';
import type { AllTypeData } from './type';

export const getTopo = (params: any) => {
  return get<AllTypeData[]>('/oss/siteTopology/essTopology', params);
};
