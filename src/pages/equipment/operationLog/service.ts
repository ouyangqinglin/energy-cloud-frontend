import request from '@/utils/request';

export const getList = (params: any) => {
  return request(`/operation-logs/page`, {
    method: 'GET',
    params,
  });
};

export const getDetail = (id: string) => {
  return request(`/operation-logs`, {
    method: 'GET',
    params: {
      id,
    },
  });
};
