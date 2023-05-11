/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-10 11:19:02
 * @LastEditTime: 2023-05-10 11:19:06
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EquipForm\service.ts
 */

import request from '@/utils/request';
import { EquipFormType } from './data.d';

export const editCommunity = (data: EquipFormType) => {
  return request(`/screen/energy/community`, {
    method: 'POST',
    data,
  });
};

export const getCommunity = (id: string) => {
  return request(`/screen/energy/community`, {
    method: 'GET',
  });
};

export const getGateway = () => {
  return request(`/screen/gateways`, {
    method: 'GET',
  });
};

export const getStations = () => {
  return request(`/station/all`, {
    method: 'GET',
  });
};

export const getProductTypes = () => {
  return request(`/product/types`, {
    method: 'GET',
  });
};

export const getProductModels = () => {
  return request(`/product/models`, {
    method: 'GET',
  });
};
