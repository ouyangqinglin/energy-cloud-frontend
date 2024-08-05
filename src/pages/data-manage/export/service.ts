import { CustomerParam } from '@/pages/user-manager/accounts/Customer/type';
import request, { post } from '@/utils/request';
import { AddTaskParams } from './type';

//站点
export const getData = (params: any) => {

  return request(`/iot/deviceDataTask/page`, {
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

export const createTask = (data: AddTaskParams) => {
  return post(`/iot/deviceDataTask/save`, data);
};
