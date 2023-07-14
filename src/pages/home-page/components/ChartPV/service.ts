import request, { get } from '@/utils/request';

export const getData = (params: any) => {
  return get(`/iot/collectionData/getData`, { ...params });
};
