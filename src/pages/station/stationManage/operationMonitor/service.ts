import { getSiteId } from '@/pages/screen/Scene/helper';
import { get } from '@/utils/request';
import { DefaultPageResult } from './type';

export const getDefaultOverviewPage = (siteId: string) => {
  return get('/oss/siteDetail/homePage', { siteId });
};
