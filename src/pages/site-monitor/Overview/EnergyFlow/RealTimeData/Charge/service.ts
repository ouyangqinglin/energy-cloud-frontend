/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-04-24 15:55:32
 * @LastEditTime: 2024-04-24 15:55:32
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Overview\EnergyFlow\RealTimeData\Charge\service.ts
 */
import request from '@/utils/request';

export const getChargeStat = (params: any) => {
  return request('/oss/site/monitor/overview/getChargeRealTimeStatus', {
    method: 'GET',
    params,
  });
};
