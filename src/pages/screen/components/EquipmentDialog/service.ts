/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-11 14:45:46
 * @LastEditTime: 2023-05-11 14:45:50
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\EquipmentDialog\service.ts
 */
/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-09 17:47:52
 * @LastEditTime: 2023-05-11 10:30:21
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\EnergyDialog\service.ts
 */

import request from '@/utils/request';
import { CommunityType } from './data.d';

export const getChildEquipment = (params: any) => {
  return request(`/oss/device/subDevice`, {
    method: 'GET',
    params,
  });
};

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
