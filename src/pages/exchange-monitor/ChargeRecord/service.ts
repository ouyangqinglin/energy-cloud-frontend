/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 14:26:05
 * @LastEditTime: 2023-11-30 15:43:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\equipment-list\service.ts
 */
import request from '@/utils/request';

export const getPage = (params: any) => {
  return request(`/iot/exchangeSiteMonitor/chargeRecordList`, {
    method: 'GET',
    params,
  });
};

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

export const unbindDevice = (data: any) => {
  return request(`/iot/device/deviceUnbindSite`, {
    method: 'PUT',
    data,
  });
};
