/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 14:26:05
 * @LastEditTime: 2023-05-26 16:10:03
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\service.ts
 */
import request from '@/utils/request';
import { StationFormType } from './data.d';

export const getList = (params: any) => {
  return request(`/uc/site/page`, {
    method: 'GET',
    params,
  });
};

export const getData = (id: string) => {
  return request(`/station`, {
    method: 'GET',
    params: {
      id,
    },
  });
};

export const addData = (data: StationFormType) => {
  return request(`/uc/site/create`, {
    method: 'POST',
    data,
  });
};

export const editData = (data: StationFormType) => {
  return request(`/station`, {
    method: 'PUT',
    data,
  });
};

export const removeData = (params: any) => {
  return request(`/uc/site/delete`, {
    method: 'DELETE',
    params,
  });
};
