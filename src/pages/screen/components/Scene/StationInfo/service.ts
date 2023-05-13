import { get } from '@/utils/request';
import type { SiteInfoRes } from './type';

export const getStationInfo = () => {
  return get<SiteInfoRes>('/oss/site/getInfo', {
    siteId: 1,
  });
};
