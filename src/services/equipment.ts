/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-16 11:43:44
 * @LastEditTime: 2023-07-13 17:01:52
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\services\equipment.ts
 */

import request, { ResponseCommonData, ResponsePageData } from '@/utils/request';
import { ListDataType } from '@/utils/dictionary';

export type DeviceDataType = {
  deviceId: string;
  name: string;
  sn: string;
  model: string;
  productId: number;
  productTypeName: string;
  subsystemName: string;
  childSystem: string;
  siteName: string;
  createTime: string;
  sessionStartTime: string;
  connectStatus: number;
};

export const getDevicePage = (params: any) => {
  return request<ResponsePageData<DeviceDataType>>(`/iot/device/deviceList`, {
    method: 'GET',
    params,
  });
};

export const getDeviceInfo = (deviceId: string | number) => {
  return request(`/screen/device/${deviceId}`, {
    method: 'GET',
  });
};

export const getChildEquipment = (params: any) => {
  return request(`/oss/device/subDevice`, {
    method: 'GET',
    params,
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
  return request(`/oss/deviceLog/page`, {
    method: 'GET',
    params,
  });
};

export const getRelatedDevice = (id: string) => {
  return request(`/oss/device/associatedDevice`, {
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
  return request(`/oss/device/details`, {
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
  return request(`/iot/thirdSite/getThirdSiteList`, {
    method: 'GET',
    params,
  });
};

export const getDeviceTree = (params: any) => {
  return request(`/iot/siteSystemConfiguration/condition/deviceTree`, {
    method: 'GET',
    params,
  });
};

export const getDeviceCollection = (params: any) => {
  return request('/iot/siteSystemConfiguration/dataSource/deviceParamList', {
    method: 'GET',
    params,
  });
};

export const getProductTypeList = (params: any) => {
  return request<ResponseCommonData<ListDataType[]>>('/oss/product/getProductTypeList', {
    method: 'GET',
    params,
  });
};
