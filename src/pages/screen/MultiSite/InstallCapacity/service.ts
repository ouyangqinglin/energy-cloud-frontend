/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-29 17:14:39
 * @LastEditTime: 2023-08-29 17:14:43
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\InstallCapacity\service.ts
 */

import request from '@/utils/request';

export const getData = () => {
  return request(`/oss/sitesBigScreen/allSites`, {
    method: 'GET',
    params: {
      type: 0,
      code: 100000,
    },
  });
};
