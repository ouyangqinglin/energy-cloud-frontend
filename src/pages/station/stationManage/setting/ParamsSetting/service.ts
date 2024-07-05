import request from '@/utils/request';

export const editAlarmPush = (data: any) => {
  return request(`/uc/site/alarmPush`, {
    method: 'POST',
    data,
  });
};

export const getAlarmPush = (params: any) => {
  return request(`/uc/site/alarmPush`, {
    method: 'GET',
    params,
  });
};
