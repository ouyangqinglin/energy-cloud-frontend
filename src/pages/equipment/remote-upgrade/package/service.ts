// import { del, get, post, put } from '@/utils/request';
// import { RemoteUpgradeDataRes } from './type';
import { requestEmptyPage } from '@/services';
import request from '@/utils/request';
import type { StationFormType } from './config';

export const getPackageList = (params: any) => {
  return request(`/iot/otaPackage/page`, {
    method: 'GET',
    params,
  });
};
//点击编辑--获取升级包详情
export const getDetailData = (id: string) => {
  return request(`/iot/otaPackage`, {
    method: 'GET',
    params: {
      id: id,
    },
  });
};
export const removeData = (params: any) => {
  return request(`/oss/site/delete`, {
    method: 'DELETE',
    params,
  });
};


export const addData = (data: StationFormType) => {
  return request(`/uc/site/create`, {
    method: 'POST',
    data,
  });
};

export const editData = (data: StationFormType) => {
  return request(`/oss/site`, {
    method: 'PUT',
    data,
  });
};

