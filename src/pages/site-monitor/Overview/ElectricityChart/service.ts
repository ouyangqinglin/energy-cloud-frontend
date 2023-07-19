import request from '@/utils/request';
import { ChartType } from './type';

export const getData = (params: any) => {
  return request<ChartType>(`/iot/collectionData/getData`, {
    method: 'GET',
    params,
  });
};
