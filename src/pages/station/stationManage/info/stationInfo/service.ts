import request from '@/utils/request';

export const setComplete = (id: string) => {
  return request(`/station`, {
    method: 'GET',
    params: {
      id,
    },
  });
};
