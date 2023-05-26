/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-10 11:19:02
 * @LastEditTime: 2023-05-26 10:43:59
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EquipForm\service.ts
 */

import request from '@/utils/request';
import { EquipFormType } from './data.d';

export const addData = (data: EquipFormType) => {
  return request(`/iot/device`, {
    method: 'POST',
    data,
  });
};

export const editData = (data: EquipFormType) => {
  return request(`/iot/device/update`, {
    method: 'POST',
    data,
  });
};

export const getData = (id: string | undefined) => {
  return request(`/oss/device/details`, {
    method: 'GET',
    params: {
      deviceId: id,
    },
  });
};

export const getGateway = () => {
  return request(`/screen/gateways`, {
    method: 'GET',
  });
};

export const getStations = () => {
  return request(`/system/site/list`, {
    method: 'GET',
  });
};

export const getProductTypes = (params: any) => {
  return request(`/iot/product/getProductType`, {
    method: 'GET',
    params,
  });
};

export const getProductModels = (params: any) => {
  return request(`/iot/product/getProductModel`, {
    method: 'GET',
    params,
  });
};
