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

export const monetaryUnit = () => {
  return request(`/uc/site/monetaryUnit`, {
    method: 'GET',
  });
};

export const getParameterSetting = (params: any) => {
  return request(`/uc/site/parameterSetting`, {
    method: 'GET',
    params,
  });
};

export const setParameterSetting = (data: any) => {
  return request(`/uc/site/parameterSetting`, {
    method: 'PUT',
    data,
  });
};
