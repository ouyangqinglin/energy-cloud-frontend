/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-10 14:57:24
 * @LastEditTime: 2023-06-10 14:57:28
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\Scene\RevenueProportion\service.ts
 */
import request from '@/utils/request';

export const getData = (params: any) => {
  return request(`/oss/site/pieChartRevenue`, {
    method: 'GET',
    params,
  });
};
