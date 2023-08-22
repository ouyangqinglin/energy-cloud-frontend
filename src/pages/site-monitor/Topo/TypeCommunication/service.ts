import { get } from '@/utils/request';
import type { TypeCommunicationData } from './type';

export const getTopo = (params: any) => {
  return get<TypeCommunicationData>('/oss/siteTopology/correspondenceTopology', params);
};
