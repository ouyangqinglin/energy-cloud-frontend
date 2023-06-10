import { getSiteId } from '@/pages/screen/Scene/helper';
import { get } from '@/utils/request';
import { DefaultPageDate } from './type';

export const getDefaultOverviewPage = () => {
  return get<DefaultPageDate>('/oss/siteDetail/homePage', { siteId: getSiteId() });
};
