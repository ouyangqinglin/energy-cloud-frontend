/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-10 11:19:02
 * @LastEditTime: 2023-05-17 09:40:56
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EquipForm\service.ts
 */

import request from '@/utils/request';
import { EquipFormType } from './data.d';

export const editData = (data: EquipFormType) => {
  return request(`/oss/device/update`, {
    method: 'POST',
    data,
  });
};

export const getData = (id: string) => {
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

export const getProductTypes = () => {
  return request(`/oss/product/getProductType`, {
    method: 'GET',
  });
};

export const getProductModels = (params: any) => {
  return request(`/oss/product/getProductModel`, {
    method: 'GET',
    params,
  });
};
