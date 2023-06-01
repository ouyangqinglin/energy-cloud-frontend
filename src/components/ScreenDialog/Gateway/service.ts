/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-09 17:47:52
 * @LastEditTime: 2023-05-09 17:47:56
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\EnergyDialog\server.ts
 */

import request from '@/utils/request';
import { CommunityType } from './data';

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
