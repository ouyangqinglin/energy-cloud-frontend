/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-29 09:13:22
 * @LastEditTime: 2023-07-10 19:28:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\service.ts
 */
import request from '@/utils/request';
import { requestEmpty } from '@/services';

export const getList = (params: any) => {
  return requestEmpty();
  return request(`/iot/collectionData/realTimePower`, {
    method: 'GET',
    params,
  });
};

export const getData = (params: any) => {
  return request(`/iot/collectionData/realTimePower`, {
    method: 'GET',
    params,
  });
};
