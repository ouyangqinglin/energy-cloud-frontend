/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 14:26:05
 * @LastEditTime: 2023-05-04 14:26:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\service.ts
 */
import request from '@/utils/request';
import { StationForm } from './data.d';

export const getList = (params: any) => {
  return request(`/stations`, {
    method: 'GET',
    params,
  });
};

export const addData = (data: StationForm) => {
  return request(`/station`, {
    method: 'POST',
    data,
  });
};

export const removeData = (id: string) => {
  return request(`/station/${id}`, {
    method: 'DELETE',
  });
};
