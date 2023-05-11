/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-10 09:54:06
 * @LastEditTime: 2023-05-10 09:54:06
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\ElectricMeter\service.ts
 */

import request from '@/utils/request';
import { CommunityType } from './data.d';

export const editCommunity = (data: CommunityType) => {
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
