import request, { get } from '@/utils/request';

//站点
export const getData = (params?: any) => {
  return get(`/oss/alarmStatistics/singleSiteAlarmStatistics`, { ...params });
};

//
export const exportList = (params: any) => {
  return request('/iot/alarm/exportAlarmFrequency', {
    params,
    responseType: 'blob',
    method: 'GET',
  });
};
