/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-26 10:12:41
 * @LastEditTime: 2023-05-13 16:01:49
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\service.ts
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

export const getAlarms = (params: any) => {
  return request(`/screen/alarms`, {
    method: 'GET',
    params,
  });
};

export const getLogs = (params: any) => {
  return request(`/oss/device_log/page`, {
    method: 'GET',
    params,
  });
};
