/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-22 15:43:33
 * @LastEditTime: 2023-07-13 20:36:39
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\services\station.ts
 */

import request from '@/utils/request';

export const getStations = (params?: any) => {
  return request(`/oss/site/getList`, {
    method: 'GET',
    params,
  });
};

export const getStation = (id: string) => {
  return request(`/oss/site/details`, {
    method: 'GET',
    params: {
      siteId: id,
    },
  });
};

export const getDefaultPage = (id: string) => {
  return request(`/oss/siteHomeConfig`, {
    method: 'GET',
    params: {
      siteId: id,
    },
  });
};

export const getSiteUnitConfig = (params: any) => {
  return request(`/oss/site/index/isGetUnitPermission`, {
    method: 'GET',
    params,
  });
};
