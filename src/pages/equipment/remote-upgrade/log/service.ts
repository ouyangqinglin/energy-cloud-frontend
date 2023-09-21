import { del, get, post, put } from '@/utils/request';
import request from '@/utils/request';
import { RemoteUpgradeDataRes } from './type';
import { requestEmptyPage } from '@/services';

export const getRemoteUpgradeList = (params: any) => {
  return requestEmptyPage();
  return get<RemoteUpgradeDataRes>(`/oss/remote-upgrade/list`, params);
};
export const getLogList = (params: any) => {
  return request(`/iot/otaRecord/page`, {
    method: 'GET',
    params,
  });
};
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