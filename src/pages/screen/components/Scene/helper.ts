import { history } from 'umi';

export const getSiteId = () => {
  const { query } = history.location;
  return (query?.siteId as string) ?? '1';
};
