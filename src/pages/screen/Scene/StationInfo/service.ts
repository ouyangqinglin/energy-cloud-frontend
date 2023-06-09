import { get } from '@/utils/request';
import { getSiteId } from '../helper';
import type { SiteInfoRes } from './type';

export const getStationInfo = () => {
  return get<SiteInfoRes>('/oss/site/getInfo', {
    siteId: getSiteId(),
  });
};
