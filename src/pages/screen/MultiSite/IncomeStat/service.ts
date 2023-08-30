/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-29 13:49:34
 * @LastEditTime: 2023-08-29 13:49:38
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\IncomeStat\service.ts
 */

import request from '@/utils/request';

export const getData = () => {
  return request(`/oss/sitesBigScreen/economicAndSocialBenefits`, {
    method: 'GET',
    params: {
      type: 0,
      code: 100000,
    },
  });
};
