/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-02 11:09:29
 * @LastEditTime: 2023-06-06 19:00:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\System\Monitor\service.ts
 */
import request from '@/utils/request';

export const getConfig = (params: any) => {
  return request(`/iot/siteSystemConfiguration/dataSource/selectAllDeviceListBySiteId`, {
    method: 'GET',
    params,
  });
};

export const editConfig = (data: any) => {
  return request(`/iot/siteSystemConfiguration/dataSource/update`, {
    method: 'PUT',
    data,
  });
};

export const editStatus = (params: any) => {
  return request(`/iot/siteSystemConfiguration/dataSource/updateFlag`, {
    method: 'PUT',
    params,
  });
};
