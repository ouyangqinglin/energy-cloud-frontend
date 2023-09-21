import { del, get, post, put } from '@/utils/request';
import request from '@/utils/request';


//获取产品型号
export const getProductSnList = (params: any) => {
  return request(`/iot/product/getProductModel`, {
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
//根据模块id获取可选择版本
export const getSelectedVersionList = (params: any) => {
  return request(`/iot/otaPackage/selectUpgradePackage`, {
    method: 'GET',
    params,
  });
};
