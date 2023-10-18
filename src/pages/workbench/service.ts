/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-16 15:10:09
 * @LastEditTime: 2023-10-16 15:11:27
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\workbench\service.ts
 */

import request, { ResponseCommonData } from '@/utils/request';

export type WorkbenchDataType = {
  siteId?: string;
  siteName?: string;
  deviceId?: string;
  deviceName?: string;
  productId?: string;
  collectionCode?: string;
  collectionName?: string;
  layout?: number;
};

export const getWorkbenchConfig = () => {
  return request<ResponseCommonData<WorkbenchDataType[]>>(`/oss/staging/deviceMonitoring`, {
    method: 'get',
  });
};

export const updateWorkbenchConfig = (data: any) => {
  return request(`/oss/staging/deviceMonitoring`, {
    method: 'put',
    data,
  });
};
