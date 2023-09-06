/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-04 16:21:33
 * @LastEditTime: 2023-09-04 16:21:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteMap\service.ts
 */

import request from '@/utils/request';

export const getCountryData = () => {
  return request(`/oss/sitesBigScreen/allSitesNum`, {
    method: 'GET',
    params: {
      type: 0,
      code: 100000,
    },
  });
};
