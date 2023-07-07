/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-29 11:37:53
 * @LastEditTime: 2023-06-29 11:37:57
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\report\service.ts
 */

import request, { ResponseCommonData } from '@/utils/request';
import type { TableDataType } from './type';

export const getList = (params: any) => {
  return request<ResponseCommonData<TableDataType[]>>(`/oss/reportForms/getReport`, {
    method: 'GET',
    params,
  });
};
