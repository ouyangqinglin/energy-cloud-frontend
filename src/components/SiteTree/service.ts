/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 11:00:33
 * @LastEditTime: 2023-06-21 11:01:04
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\StationTree\service.ts
 */
import request from '@/utils/request';
import type { ResponseCommonData } from '@/utils/request';
import { TreeData } from './type';

export const getSiteTree = (params: any) => {
  return request<ResponseCommonData<TreeData>>(`/iot/siteSystemConfiguration/condition/tree`, {
    method: 'GET',
    params,
  });
};
