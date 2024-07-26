import request from '@/utils/request';

export const exportDataType = (params: any) => {
  return request(`/iot/model/exportDomainDataType`, {
    method: 'get',
    params: {
      ...params,
      convertType: 1,
    },
    responseType: 'blob',
  });
};
