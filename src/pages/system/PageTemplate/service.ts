import request from '@/utils/request';
import type { ResponsePageData } from '@/utils/request';

import type { PhysicalModelType } from './config';

export const getPage = (params: any) => {
  return request<ResponsePageData<PhysicalModelType>>(`/iot/model/page`, {
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
  return request(`/iot/productConfig/save`, {
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

export const getPageTemplate = (params: any) => {
  return request<ResponsePageData<PhysicalModelType>>(`/iot/productConfig/page`, {
    method: 'GET',
    params,
  });
};
export const getproduct = (params: any) => {
  return request<ResponsePageData<PhysicalModelType>>(`/iot/product/getListByModel`, {
    method: 'GET',
    params,
  });
};
export const getproductDetail = (params: any) => {
  return request<ResponsePageData<PhysicalModelType>>(`/iot/productConfig/detail`, {
    method: 'GET',
    params,
  });
};
