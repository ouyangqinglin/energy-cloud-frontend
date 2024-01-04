import request from '@/utils/request';

export const insertVersion = (formData: any) => {
  return request(`/oss/version/insert`, {
    method: 'POST',
    data: formData,
  });
};

export const getVersionList = (data: any) => {
  return request(`/oss/version/page?${new URLSearchParams(data).toString()}`, {
    method: 'GET',
  });
};

export const getVersionDetail = (data: any) => {
  return request(`/oss/version/details`, {
    method: 'GET',
    data,
  });
};

export const getFileUrl = (data: any) => {
  return request(`/uc/fileUrl?${new URLSearchParams(data).toString()}`, {
    method: 'GET',
  });
};
