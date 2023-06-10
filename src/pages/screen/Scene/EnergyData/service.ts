/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-09 15:32:26
 * @LastEditTime: 2023-06-09 15:32:30
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\Scene\EnergyData\service.ts
 */

import request from '@/utils/request';

export const getData = (params: any) => {
  return request(`/oss/site/energyConsumption`, {
    method: 'GET',
    params,
  });
};
