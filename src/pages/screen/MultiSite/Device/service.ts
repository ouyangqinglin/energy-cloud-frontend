/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-01 14:44:29
 * @LastEditTime: 2023-09-01 14:44:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Device\service.ts
 */

import request from '@/utils/request';

export const getData = () => {
  return request(`/oss/sitesBigScreen/allSitesDeviceNum`, {
    method: 'GET',
  });
};
