/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-16 11:43:44
 * @LastEditTime: 2023-10-19 14:31:07
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\services\equipment.ts
 */

import request, { ResponseCommonData, ResponsePageData } from '@/utils/request';
import {
  DeviceMasterMode,
  DeviceProductTypeEnum,
  DeviceTypeEnum,
  ListDataType,
} from '@/utils/dictionary';
import { DeviceModelDataType } from '@/types/device';

export type DeviceDataType = {
  id?: string;
  deviceId?: string;
  deviceName?: string;
  siteId?: string;
  productImg?: string;
  name?: string;
  sn?: string;
  model?: string;
  productId?: DeviceTypeEnum;
  productType?: DeviceProductTypeEnum;
  productTypeId?: DeviceProductTypeEnum;
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
  config?: string;
  photos?: string;
  masterSlaveMode?: DeviceMasterMode;
  masterSlaveSystemName?: string;
  networkStatus?: number;
  canBeDeleted?: number;
  canUnbind?: number;
  children?: DeviceDataType[];
};
export type EmsDevicesType = {
  deviceId: any;
  productId: any;
  deviceName: string;
  masterSlaveMode: any;
  groupId: any;
  groupName: any;
  networkStatus?: any;
  alarmStatus?: number;
  alarmCount?: number;
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

export type ProductModelType = {
  id?: string;
  model?: string;
  name?: string;
};

export type FactoryDataType = {
  id?: string;
  name?: string;
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

export const editDeviceInfo = (data: DeviceDataType) => {
  return request(`/iot/device/update`, {
    method: 'POST',
    data,
  });
};

export const getChildEquipment = (params: any) => {
  return request<ResponseCommonData<DeviceDataType[]>>(`/oss/device/subDevice`, {
    method: 'GET',
    params,
  });
};

export const getWholeDeviceTree = (params: any) => {
  return request<ResponseCommonData<DeviceDataType>>(`/iot/es/deviceTree`, {
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
  return request(`/iot/device/updateDeviceCommunicationConfig`, {
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

export const getMultipleDeviceTree = () => {
  return request(`/iot/siteSystemConfiguration/allSites/deviceTree`, {
    method: 'GET',
  });
};

export const getSiteDeviceTree = (params: any) => {
  return request(`/iot/siteSystemConfiguration/siteDeviceTree`, {
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

export const getProductTypeTree = () => {
  return request<ResponseCommonData<ListDataType[]>>('/iot/product/getProductTypeTree', {
    method: 'GET',
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

export const getProductModelByType = (params: any) => {
  return request<ResponseCommonData<ProductModelType[]>>(
    `/iot/product/getAllProductsByproductType`,
    {
      method: 'GET',
      params,
    },
  );
};

export const getFactoryList = () => {
  return request<ResponseCommonData<FactoryDataType[]>>(`/iot/product/getFactoryList`, {
    method: 'GET',
  });
};

export const getAssociateDevice = (params: any) => {
  return request<ResponseCommonData<DeviceDataType[]>>(
    `/iot/device/getAssociateDevicesByDeviceIdAndType`,
    {
      method: 'GET',
      params,
    },
  );
};

export const updateAssociateDevice = (data: any) => {
  return request(`/iot/device/updateDeviceProductConfig`, {
    method: 'PUT',
    data,
  });
};

export const getChargeStack = (params: any) => {
  return request<ResponseCommonData<DeviceDataType[]>>(`/iot/device/getChargingPileHost`, {
    method: 'GET',
    params,
  });
};

export const getUpgradeVersion = (params: any) => {
  return request(`/iot/otaPackage/getVersionByDeviceId`, {
    method: 'GET',
    params,
  });
};

export const upgradeDevice = (data: any) => {
  return request(`/iot/otaUpgrade/sendUpgrade`, {
    method: 'POST',
    data,
  });
};

export const getUpgradeRecord = (params: any) => {
  return request(`/iot/otaRecord/page`, {
    method: 'GET',
    params,
  });
};

export const getParallelDevice = (params: any) => {
  return request<ResponseCommonData<DeviceDataType[]>>(`/iot/device/getEsGroup`, {
    method: 'GET',
    params,
  });
};

export const editGroupName = (data: any) => {
  return request(`/iot/es/group_name`, {
    method: 'PUT',
    data,
  });
};
