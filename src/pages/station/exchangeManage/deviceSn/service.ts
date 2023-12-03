import request from '@/utils/request';

export const getDeviceBySn = (params: any) => {
  return request(`/iot/device/getDeviceBySn`, {
    method: 'GET',
    params,
  });
};

export const removeData = (params: any) => {
  return request(`/iot/device`, {
    method: 'DELETE',
    params,
  });
};
