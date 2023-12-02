/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-02 15:51:12
 * @LastEditTime: 2023-12-02 15:51:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\service.ts
 */

import request from '@/utils/request';
import SiteData from './SiteMap/site.json';
import VehicleData from './SiteMap/vehicle.json';

export const getSite = (params: any) => {
  return Promise.resolve(SiteData);
};

export const getVehicle = (params: any) => {
  return Promise.resolve(VehicleData);
};
