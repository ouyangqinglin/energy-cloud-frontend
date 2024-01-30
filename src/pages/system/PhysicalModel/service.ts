import request from '@/utils/request';
import type { ResponsePageData } from '@/utils/request';

import type { PhysicalModelFormType } from './data';

export const getPage = (params: any) => {
  return request<ResponsePageData<PhysicalModelFormType>>(`/iot/model/page`, {
    method: 'GET',
    params,
  });
};
export const getTypePage = (params: any) => {
  return request(`/iot/model/modelFieldList`, {
    method: 'GET',
    params,
  });
};

export const getDetail = (params: any) => {
  return request(`/iot/model`, {
    method: 'GET',
    params,
  });
};

export const addMenu = (params: any) => {
  return request(`/iot/model`, {
    method: 'POST',
    data: params,
  });
};

export const deleteMenu = (params: any) => {
  return request(`/iot/model`, {
    method: 'DELETE',
    data: params,
  });
};

export const updateMenu = (params: any) => {
  return request(`/iot/model`, {
    method: 'PUT',
    data: params,
  });
};
