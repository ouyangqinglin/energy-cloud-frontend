import request from '@/utils/request';

export const getData = (params: any) => {
  return request(`/iot/collectionData/getData`, {
    method: 'GET',
    params,
  });
};
