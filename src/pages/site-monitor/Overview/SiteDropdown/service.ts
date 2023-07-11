import { get } from '@/utils/request';

export const getStations = () => {
  return get<any>('/oss/site/monitor/overview/getSiteList');
};

export const getDefaultSite = () => {
  return get<{
    id: number;
    name: string;
  }>('uc/user/defaultSite');
};
