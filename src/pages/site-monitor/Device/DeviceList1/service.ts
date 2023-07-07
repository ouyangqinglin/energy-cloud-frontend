/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 14:39:49
 * @LastEditTime: 2023-06-21 14:39:53
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\device\DeviceList\service.ts
 */
import request from '@/utils/request';

export const getTabs = (params: any) => {
  return request(`/iot/device/summary`, {
    method: 'GET',
    params,
  });
};

export const removeData = (params: any) => {
  return request(`/iot/device`, {
    method: 'DELETE',
    params,
  });
};
