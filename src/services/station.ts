/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-22 15:43:33
 * @LastEditTime: 2023-05-22 15:43:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\services\station.ts
 */

import request from '@/utils/request';

export const getStations = () => {
  return request(`/system/site/list`, {
    method: 'GET',
  });
};

export const getStation = (id: string) => {
  return request(`/station/${id}`, {
    method: 'GET',
  });
};
