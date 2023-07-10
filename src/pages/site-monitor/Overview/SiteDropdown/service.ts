import { get } from '@/utils/request';

export const getStations = () => {
  return get<any>('/oss/site/monitor/overview/getSiteList');
};
