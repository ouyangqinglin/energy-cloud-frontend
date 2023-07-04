import request from '@/utils/request';

export const getList = (params: any) => {
  return request(`/oss/deviceLog/page`, {
    method: 'GET',
    params,
  });
};

export const getDetail = (id: string) => {
  return request(`/oss/deviceLog`, {
    method: 'GET',
    params: {
      logId: id,
    },
  });
};
