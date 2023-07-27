/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-22 15:43:33
 * @LastEditTime: 2023-07-25 16:33:57
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\services\station.ts
 */

import type { SiteType } from '@/components/SiteTypeSwitch';
import type { ResponseCommonData } from '@/utils/request';
import request from '@/utils/request';

export type SiteDataType = {
  id?: string;
  name?: string;
  siteType?: SiteType;
  energyOptions?: string;
  label?: string;
  value?: string;
  isLoad?: boolean;
};

export type SiteTypeOptionType = {
  name?: string;
  value?: string;
};

export const getStations = (params?: any) => {
  return request(`/oss/site/getList`, {
    method: 'GET',
    params,
  });
};

export const getSiteType = () => {
  return request<ResponseCommonData<SiteTypeOptionType[]>>(`/oss/site/index/siteType`, {
    method: 'GET',
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

export const getSiteList = (params?: any) => {
  return request<ResponseCommonData<SiteDataType[]>>(`/oss/site/monitor/overview/getSiteList`, {
    method: 'GET',
    params,
  });
};
