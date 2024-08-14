import request from '@/utils/request';

//站点
export const getData = (params: any) => {
  return request(`/oss/alarmStatistics/multiSiteAlarmStatistics`, {
    method: 'GET',
    params,
  });
};
