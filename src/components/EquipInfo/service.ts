/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-11 10:37:29
 * @LastEditTime: 2023-05-26 17:11:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EquipInfo\service.ts
 */

import request from '@/utils/request';

export const getEquipInfo = (params: any) => {
  return request(`/iot/device/details`, {
    method: 'GET',
    params,
  });
};
