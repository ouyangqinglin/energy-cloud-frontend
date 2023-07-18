/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 11:01:52
 * @LastEditTime: 2023-07-12 11:02:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\service.ts
 */

import request, { ResponseCommonData } from '@/utils/request';
import { statType, searchType, energyType, PowerType, ElectricType } from './type';

export const getStat = (params: searchType) => {
  return request<ResponseCommonData<statType>>('/oss/site/monitor/energyStorage/statistics', {
    method: 'GET',
    params,
  });
};

export const getEnergy = (params: searchType) => {
  return request<ResponseCommonData<energyType>>('/iot/es/deviceTree', {
    method: 'GET',
    params,
  });
};

export const getPower = (params: searchType) => {
  return request<ResponseCommonData<PowerType[]>>('/oss/site/monitor/energyStorage/realTimePower', {
    method: 'GET',
    params,
  });
};

export const getElectic = (params: searchType) => {
  return request<ResponseCommonData<ElectricType>>(
    '/oss/site/monitor/energyStorage/chargingDischargingTrends',
    {
      method: 'GET',
      params,
    },
  );
};
