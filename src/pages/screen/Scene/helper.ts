import { getSiteIdFromStore } from '@/access';
import { history } from 'umi';

export const getSiteId = () => {
  const { query } = history.location;
  return query?.id ?? getSiteIdFromStore() ?? '1';
};
