/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-22 15:43:33
 * @LastEditTime: 2023-06-16 16:51:57
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\services\station.ts
 */

import request from '@/utils/request';

export const getStations = (params?: any) => {
  return request(`/system/site/list`, {
    method: 'GET',
    params,
  });
};

export const getStation = (id: string) => {
  return request(`/uc/site/details`, {
    method: 'GET',
    params: {
      siteId: id,
    },
  });
};
