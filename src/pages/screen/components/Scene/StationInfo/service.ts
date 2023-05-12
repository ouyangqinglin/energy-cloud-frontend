import request from '@/utils/request';
import type { SiteInfoRes } from './type';

export const getStationInfo = () => {
  return request<{ data: SiteInfoRes }>('/site/2', {
    method: 'GET',
  });
};
