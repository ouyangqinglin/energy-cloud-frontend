/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-03 14:01:24
 * @LastEditTime: 2023-07-05 11:08:32
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\Account\service.ts
 */
import request, { ResponseCommonData } from '@/utils/request';
import { AccountType } from './type';

export const getPage = (params: any) => {
  return request(`/uc/site/detail/customerUser/page`, {
    method: 'GET',
    params,
  });
};

export const addData = (data: any) => {
  return request(`/uc/site/detail/customerUser`, {
    method: 'POST',
    data,
  });
};

export const editData = (data: any) => {
  return request(`/uc/site/detail/customerUser`, {
    method: 'PUT',
    data,
  });
};

export const getData = (params: any) => {
  return request(`/uc/site/detail/customerUser`, {
    method: 'GET',
    params,
  });
};

export const deleteData = (data: any) => {
  return request(`/uc/site/detail/customerUser`, {
    method: 'DELETE',
    data,
  });
};
