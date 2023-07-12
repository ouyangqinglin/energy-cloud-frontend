import { get } from '@/utils/request';

export const getDefaultSite = () => {
  return get<{
    id: number;
    name: string;
  }>('/uc/user/defaultSite');
};
