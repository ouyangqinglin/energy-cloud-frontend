/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-26 10:12:41
 * @LastEditTime: 2023-04-26 10:12:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Dialog\service.ts
 */
import request from '@/utils/request';

export const getDeviceInfo = (deviceId: string | number) => {
  return request(`/screen/device/${deviceId}`, {
    method: 'GET',
  });
};

export const getWeather = (code: string) => {
  return request(`/screen/weather/${code}`, {
    method: 'GET',
  });
};
