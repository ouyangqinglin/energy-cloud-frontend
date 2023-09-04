/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-01 15:27:03
 * @LastEditTime: 2023-09-01 15:27:07
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteMap\SiteStatus\service.ts
 */

import request from '@/utils/request';

export const getData = (params: any) => {
  return request(`/oss/sitesBigScreen/sitesStatus`, {
    method: 'GET',
    params,
  });
};
