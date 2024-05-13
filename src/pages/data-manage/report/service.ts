/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-29 11:37:53
 * @LastEditTime: 2023-07-10 19:20:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\report\service.ts
 */

import request, { ResponseCommonData } from '@/utils/request';
import type { GruopDataType, TableDataType, TableSearchType } from './type';

export const getList = (params: TableSearchType) => {
  return request<ResponseCommonData<TableDataType[]>>(`/oss/reportForms/getReport`, {
    method: 'GET',
    params,
  });
};

export const exportList = (params: TableSearchType) => {
  return request('/oss/reportForms/export', {
    method: 'GET',
    params,
    responseType: 'blob',
  });
};

export const getGroupList = (params: TableSearchType) => {
  return request<ResponseCommonData<GruopDataType[]>>(`/iot/es/group_list`, {
    method: 'GET',
    params,
  });
};
