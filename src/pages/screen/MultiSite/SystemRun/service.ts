/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-29 15:06:47
 * @LastEditTime: 2023-08-29 15:06:52
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SystemRun\service.ts
 */

import request from '@/utils/request';

export const getData = (params: any) => {
  return request(`/oss/sitesBigScreen/operatingData`, {
    method: 'GET',
    params,
  });
};
