/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-25 10:23:36
 * @LastEditTime: 2023-05-25 10:23:40
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\alarm\service.ts
 */
import request from '@/utils/request';
import { StationFormType } from './data.d';

export const getList = (params: any) => {
  return request(`/alarms`, {
    method: 'GET',
    params,
  });
};
