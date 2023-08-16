/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-16 11:43:44
 * @LastEditTime: 2023-08-10 16:24:40
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\services\equipment.ts
 */

import request, { ResponseCommonData, ResponsePageData } from '@/utils/request';
import { ListDataType } from '@/utils/dictionary';
import { DeviceModelDataType } from '@/types/device';

export type DeviceDataType = {
  deviceId?: string;
  deviceName?: string;
  siteId?: string;
  productImg?: string;
  name?: string;
  sn?: string;
  model?: string;
  productId?: string;
  productTypeId?: string;
  productTypeName?: string;
  subsystemName?: string;
  childSystem?: string;
  siteName?: string;
  createTime?: string;
  sessionStartTime?: string;
  connectStatus?: number;
  status?: number;
  alarmStatus?: number;
  alarmCount?: number;
  lastOnlineTime?: string;
  key?: string;
  aliasSn?: string;
  paramConfigType?: number;
  productConfigType?: number;
};

export type ClusterType = {
  key: string;
  deviceId: string;
  deviceName: string;
  connectStatus: number;
  alarmStatus: number;
  ratedCapacity: number;
  runState: number;
  soc: number;
};

export const getDevicePage = (params: any) => {
  return request<ResponsePageData<DeviceDataType>>(`/iot/device/deviceList`, {
    method: 'GET',
    params,
  });
};

export const getDeviceInfo = (params: any) => {
  return request<ResponseCommonData<DeviceDataType>>(`/oss/site/monitor/device/getBasicInfo`, {
    method: 'GET',
    params,
  });
};

export const getChildEquipment = (params: any) => {
  return request<ResponseCommonData<DeviceDataType[]>>(`/oss/device/subDevice`, {
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

export const getClusterByStack = (params: any) => {
  return request<ResponseCommonData<ClusterType[]>>('/oss/site/monitor/device/getBatteryDevices', {
    method: 'GET',
    params,
  });
};

export const getEmsAssociationDevice = (params: any) => {
  return request<ResponseCommonData<DeviceDataType[]>>('/oss/site/monitor/device/getDescendants', {
    method: 'GET',
    params,
  });
};

export const getEnergeListBySite = (params: any) => {
  return request<ResponseCommonData<DeviceDataType[]>>('/oss/site/monitor/energyStorage/esList', {
    method: 'GET',
    params,
  });
};

export const getDeviceGroupModel = (params: any) => {
  return request<ResponseCommonData<DeviceModelDataType>>('/oss/product/getThingsModeByProductId', {
    method: 'GET',
    params,
  });
};

export const getDeviceModel = (params: any) => {
  return request<ResponseCommonData<DeviceModelDataType>>('/iot/model/getThingsModeByProductId', {
    method: 'GET',
    params,
  });
};

export const getChargeHost = (params: any) => {
  return request<ResponseCommonData<DeviceDataType[]>>('/iot/device/getChargingPileHost', {
    method: 'GET',
    params,
  });
};
export const editSetting = (data: any) => {
  return request(`/oss/device/remote_setting`, {
    method: 'POST',
    data,
  });
};
