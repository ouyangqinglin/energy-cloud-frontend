/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-09 17:47:52
 * @LastEditTime: 2023-05-11 10:30:21
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\EnergyDialog\service.ts
 */

import request from '@/utils/request';

export const editSetting = (data: any) => {
  return request(`/oss/device/remote_setting`, {
    method: 'POST',
    data,
  });
};
