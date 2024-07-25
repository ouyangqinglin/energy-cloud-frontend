import { CustomerParam } from '@/pages/user-manager/accounts/Customer/type';
import request, { post } from '@/utils/request';

//站点
export const getData = (params: any) => {
  return request(`/oss/site/statisticsSiteRank`, {
    method: 'GET',
    params,
  });
};

export const exportList = (params: any) => {
  return request('/oss/site/statisticsSiteRank/export', {
    method: 'GET',
    params,
    responseType: 'blob',
  });
};

export const createTask = (data: CustomerParam) => {
  return post(`/uc/customerUser`, data);
};
