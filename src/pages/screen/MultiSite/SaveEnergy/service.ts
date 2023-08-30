/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-29 13:39:29
 * @LastEditTime: 2023-08-29 13:48:43
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SaveEnergy\service.ts
 */

import request from '@/utils/request';

export const getData = () => {
  return request(`/oss/sitesBigScreen/emissionReduction`, {
    method: 'GET',
    params: {
      type: 0,
      code: 100000,
    },
  });
};
