/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-08 11:05:25
 * @LastEditTime: 2024-04-25 14:38:23
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Overview\service.ts
 */

import request, { ResponseCommonData } from '@/utils/request';
import { PowerDataType } from './typing';

export const getPower = (params: any) => {
  return request<ResponseCommonData<PowerDataType>>('/oss/site/monitor/overview/getOverviewData', {
    method: 'GET',
    params,
  });
};
