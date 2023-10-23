/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 14:26:05
 * @LastEditTime: 2023-06-16 10:44:44
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\service.ts
 */
import request from '@/utils/request';
import type { StationFormType } from './data.d';

export const getList = (params: any) => {
  return request(`/uc/site/page`, {
    method: 'GET',
    params,
  });
};

export const getData = (id: string) => {
  return request(`/oss/site/details`, {
    method: 'GET',
    params: {
      siteId: id,
    },
  });
};

export const addData = (data: StationFormType) => {
  return request(`/uc/site/create`, {
    method: 'POST',
    data,
  });
};

export const addDataByWorkOrder = (data: StationFormType) => {
  return request(`/oss/installationWorkOrder/createSite`, {
    method: 'POST',
    data,
  });
};

export const editData = (data: StationFormType) => {
  return request(`/oss/site`, {
    method: 'PUT',
    data,
  });
};

export const removeData = (params: any) => {
  return request(`/oss/site/delete`, {
    method: 'DELETE',
    params,
  });
};
