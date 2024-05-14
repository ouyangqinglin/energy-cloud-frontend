/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-14 11:05:14
 * @LastEditTime: 2024-05-14 15:01:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\System\VideoMonitor\service.ts
 */

import request, { ResponseCommonData } from '@/utils/request';
import { AppDataType, FactoryDataType } from './type';

export const editData = (data: any) => {
  return request(`/uc/site/videoMonitor`, {
    method: 'put',
    data,
  });
};

export const getFactoryList = () => {
  return request<ResponseCommonData<FactoryDataType[]>>(`/uc/site/videoMonitor/factoryList`, {
    method: 'GET',
  });
};

export const getAppList = () => {
  return request<ResponseCommonData<AppDataType[]>>(`/uc/site/videoMonitor/appList`, {
    method: 'GET',
  });
};
