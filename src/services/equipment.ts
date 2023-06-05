/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-16 11:43:44
 * @LastEditTime: 2023-05-22 15:43:37
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\services\equipment.ts
 */

import request from '@/utils/request';

export const getDeviceInfo = (deviceId: string | number) => {
  return request(`/screen/device/${deviceId}`, {
    method: 'GET',
  });
};

export const getWeather = (code: string) => {
  return request(`/screen/weather/${code}`, {
    method: 'GET',
  });
};

export const getAlarms = (params: any) => {
  return request(`/oss/alarm/getAlarm`, {
    method: 'GET',
    params,
  });
};

export const getLogs = (params: any) => {
  return request(`/oss/device_log/page`, {
    method: 'GET',
    params,
  });
};

export const getRelatedDevice = (id: string) => {
  return request(`/oss/device/associated_device`, {
    method: 'GET',
    params: {
      deviceId: id,
    },
  });
};

export const getGuns = (id: string) => {
  return request(`/oss/device/getABGunDeviceEncode`, {
    method: 'GET',
    params: {
      deviceId: id,
    },
  });
};

export const getEquipInfo = (params: any) => {
  return request(`/iot/device/details`, {
    method: 'GET',
    params,
  });
};

export const editEquipConfig = (data: any) => {
  return request(`/iot/device/updateDeviceConfig`, {
    method: 'put',
    data,
  });
};

export const getThirdStation = (params: any) => {
  return request(`/iot/third_site/getThirdSiteList`, {
    method: 'GET',
    params,
  });
};

export const getDeviceTree = (params: any) => {
  return request(`/iot/siteSystemConfiguration/condition/tree`, {
    method: 'GET',
    params,
  });
};
