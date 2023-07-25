import request from '@/utils/request';
import { ChartType } from './type';

export const getData = (params: any) => {
  return request<ChartType>(`/oss/site/monitor/overview/getOverviewData`, {
    method: 'GET',
    params,
  });
};
