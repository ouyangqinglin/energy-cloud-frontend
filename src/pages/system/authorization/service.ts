import request, { ResponsePageData } from '@/utils/request';
import { AuthDataType } from './type';

export const getPage = (params: any) => {
  return request<ResponsePageData<AuthDataType>>(`/uc/openApp/page`, {
    method: 'get',
    params,
  });
};

export const addData = (data: any) => {
  return request<ResponsePageData<AuthDataType>>(`/uc/openApp`, {
    method: 'post',
    data,
  });
};

export const editData = (data: any) => {
  return request<ResponsePageData<AuthDataType>>(`/uc/openApp`, {
    method: 'put',
    data,
  });
};

export const getData = (params: any) => {
  return request<ResponsePageData<AuthDataType>>(`/uc/openApp`, {
    method: 'get',
    params,
  });
};

export const deleteData = (data: any) => {
  return request<ResponsePageData<AuthDataType>>(`/uc/openApp`, {
    method: 'delete',
    data,
  });
};

export const updateStatus = (data: any) => {
  return request<ResponsePageData<AuthDataType>>(`/uc/openApp/changeStatus`, {
    method: 'put',
    data,
  });
};
