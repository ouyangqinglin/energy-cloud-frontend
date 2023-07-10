import { get } from '@/utils/request';
import { SiteInfoRes } from './type';

export const getStationInfo = (siteId: number) => {
  return get<SiteInfoRes>('/oss/site/getInfo', {
    siteId,
  });
};
