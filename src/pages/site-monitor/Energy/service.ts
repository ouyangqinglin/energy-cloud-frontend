/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 11:01:52
 * @LastEditTime: 2023-07-12 11:02:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\service.ts
 */

import request, { ResponseCommonData } from '@/utils/request';
import { statType, searchType } from './type';

export const getStat = (params: searchType) => {
  return request<ResponseCommonData<statType>>('/oss/site/monitor/energyStorage/statistics', {
    method: 'GET',
    params,
  });
};
//储能分组列表
export const getGroupList = (params: searchType) => {
  return request<ResponseCommonData<statType>>('/iot/es/group_list', {
    method: 'GET',
    params,
  });
};
