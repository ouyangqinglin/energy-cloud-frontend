/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-09 17:38:55
 * @LastEditTime: 2023-06-09 17:38:59
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\Scene\RealTimePower\service.ts
 */
import request from '@/utils/request';

export const getData = (params: any) => {
  return request(`/iot/collectionData/getData`, {
    method: 'GET',
    params,
  });
};
