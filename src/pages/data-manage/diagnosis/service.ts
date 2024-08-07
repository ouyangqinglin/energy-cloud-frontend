import request, { get, post } from '@/utils/request';
import { AddTaskParams } from './type';

export const getData = (params: any) => {
  return request(`/iot/deviceDataTask/page`, {
    method: 'GET',
    params,
  });
};

// export const getFileUrl = (params: any) => {
//   return request('/uc/fileUrl', {
//     method: 'GET',
//     params,
//     responseType: 'blob',
//   });
// };

export const getFileUrl = (params: any) => {
  return get('/uc/fileUrl', { ...params });
};

export const reExecuteExport = (data: any) => {
  return request('/iot/deviceDataTask/reExecute', {
    method: 'POST',
    data,
    responseType: 'blob',
  });
};

export const createTask = (data: AddTaskParams) => {
  return post(`/iot/deviceDataTask/save`, data);
};
