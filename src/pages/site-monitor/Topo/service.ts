import { get } from '@/utils/request';

export const getDefaultSite = () => {
  return get<{
    id: number;
    name: string;
  }>('/uc/user/defaultSite');
};

export const getTopo = (params: any) => {
  return get<string>('/oss/siteTopology', params);
};
