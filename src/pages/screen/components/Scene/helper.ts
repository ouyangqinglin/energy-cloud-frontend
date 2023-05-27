import { getSiteIdFromStore } from '@/access';
import { history } from 'umi';

export const getSiteId = () => {
  const { query } = history.location;
  return query?.siteId ?? getSiteIdFromStore() ?? '1';
};
