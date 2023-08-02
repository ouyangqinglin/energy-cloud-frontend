/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-29 09:13:22
 * @LastEditTime: 2023-08-02 15:09:04
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\service.ts
 */
import request, { ResponsePageData } from '@/utils/request';
import { TableDataType } from './type';

export const getList = (data: any) => {
  return request<ResponsePageData<TableDataType>>(`/iot/deviceData/queryHistorical`, {
    method: 'POST',
    data,
  });
};

export const exportList = (data: any) => {
  return request('/iot/deviceData/exportDeviceHistory', {
    method: 'POST',
    data,
    responseType: 'blob',
  });
};
