/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-14 11:05:14
 * @LastEditTime: 2024-05-14 15:01:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\System\VideoMonitor\service.ts
 */

import request from '@/utils/request';
import type { ResponseCommonData } from '@/utils/request';
import type { DataType } from './helper';
export const editData = (data: any) => {
  return request<ResponseCommonData<DataType>>(`/iot/labelChart/save`, {
    method: 'POST',
    data,
  });
};

export const getData = (params: any) => {
  return request<ResponseCommonData<DataType>>(`/iot/labelChart/getLabelChartConfig`, {
    method: 'GET',
    params,
  });
};
