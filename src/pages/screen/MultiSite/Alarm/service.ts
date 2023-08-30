/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-29 10:30:18
 * @LastEditTime: 2023-08-29 10:30:22
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Alarm\service.ts
 */

import request from '@/utils/request';

export const getData = () => {
  return request(`/iot/alarm/getAlarmInfo`, {
    method: 'GET',
  });
};
