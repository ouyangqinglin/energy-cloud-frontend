import request from '@/utils/request';

export const insertVersion = (formData: any) => {
  return request(`/oss/version/insert`, {
    method: 'POST',
    data: formData,
  });
};

export const getVersionList = (data: any) => {
  return request(`/oss/version/page`, {
    method: 'GET',
    data,
  });
};

export const getVersionDetail = (data: any) => {
  return request(`/oss/version/details`, {
    method: 'GET',
    data,
  });
};
