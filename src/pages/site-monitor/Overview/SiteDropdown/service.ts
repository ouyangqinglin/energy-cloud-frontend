import { get } from '@/utils/request';

export const getStations = (params: any) => {
  return get<any>('/oss/site/monitor/overview/getSiteList', { ...params });
};

export const getDefaultSite = () => {
  return get<{
    id: number;
    name: string;
  }>('uc/user/defaultSite');
};
