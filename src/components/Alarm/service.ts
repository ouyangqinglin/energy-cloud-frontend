/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-25 10:23:36
 * @LastEditTime: 2023-06-13 09:48:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\alarm\service.ts
 */
import request, { ResponseCommonData } from '@/utils/request';
import { AlarmNumType } from './data.d';

export const getList = (params: any) => {
  return request(`/oss/alarm/getAlarm`, {
    method: 'GET',
    params,
  });
};

export const getDetail = (id: string) => {
  return request(`/oss/alarm/deviceAlarm`, {
    method: 'GET',
    params: {
      id,
    },
  });
};

export const getAlarmNum = (params: any) => {
  return request<ResponseCommonData<AlarmNumType>>(`/oss/alarm/getAlarmNum`, {
    method: 'GET',
    params,
  });
};

export const cleanUpAlarm = (data: any) => {
  return request('/oss/alarm/clearAlarm', {
    method: 'PUT',
    data,
  });
};

export const exportList = (data: any) => {
  return request('/iot/alarm/export', {
    method: 'POST',
    data,
    responseType: 'blob',
  });
};
