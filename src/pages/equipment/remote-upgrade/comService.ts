import { del, get, post, put } from '@/utils/request';
import request from '@/utils/request';

//获取产品型号
export const getProductSnList = (params: any) => {
  return request(`/iot/product/getAllProductsByproductType`, {
    method: 'GET',
    params,
  });
};
//获取版本号
export const getVersionList = (params: any) => {
  return request(`/iot/otaPackage/versionListByProductId`, {
    method: 'GET',
    params,
  });
};
//获取模块信息
export const getModuleList = (params: any) => {
  return request(`/iot/productModule/getProductModuleByProductId`, {
    method: 'GET',
    params,
  });
};
//根据模块id获取可选择软件包
export const getSelectedVersionList = (params: any) => {
  return request(`/iot/otaPackage/selectUpgradePackage`, {
    method: 'GET',
    params,
  });
};
//获取升级包可支持的设备列表
export const getSelectDeviceList = (params: any) => {
  return request(`/iot/otaUpgrade/selectedDevice`, {
    method: 'GET',
    params,
  });
};
//根据站点id获取设备列表
export const getDeviceListBySiteId = (params: any) => {
  return request(`/iot/otaPackage/deviceListBySiteId`, {
    method: 'GET',
    params,
  });
};
