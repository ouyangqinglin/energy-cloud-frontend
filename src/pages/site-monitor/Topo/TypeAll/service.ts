import { get } from '@/utils/request';
import type { AllTypeData } from './type';

export const getTypeAllTopo = (params: any) => {
  return get<AllTypeData>('/oss/siteTopology/overview', params);
};
