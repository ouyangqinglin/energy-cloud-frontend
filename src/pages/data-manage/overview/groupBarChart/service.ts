import { get } from '@/utils/request';

//站点
export const getData = (params: any) => {
  return get(`/oss/site/statisticsData`, { ...params });
};

//设备
export const getDeviceData = (params: any) => {
  return get(`/oss/device/getStatisticsDeviceData`, { ...params });
};

//告警
export const getAlarmData = (params: any) => {
  return get(`/oss/alarm/getStatisticsAlarmData`, { ...params });
};
