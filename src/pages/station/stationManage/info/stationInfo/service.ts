import request from '@/utils/request';

export const setComplete = (id: string) => {
  return request(`/uc/site/constructionStatus`, {
    method: 'PUT',
    data: {
      id,
    },
  });
};
