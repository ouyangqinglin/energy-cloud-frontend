/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-13 10:29:28
 * @LastEditTime: 2023-05-13 10:37:28
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Weather\service.ts
 */

import request from '@/utils/request';

export const getWeather = (id: string) => {
  return request(`/system/site/weather`, {
    method: 'GET',
    params: {
      siteId: id,
    },
  });
};
