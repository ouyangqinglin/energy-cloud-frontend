import request, { get } from '@/utils/request';

//站点
export const getData = (params: any) => {
  return get(`/oss/site/statisticsSiteRank`, { ...params });
};

export const exportList = (params: any) => {
  return request('/oss/site/statisticsSiteRank/export', {
    method: 'GET',
    params,
    responseType: 'blob',
  });
};
