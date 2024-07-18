import request from '@/utils/request';
import type { ResponseCommonData } from '@/utils/request';
import type { SiteDataType } from './type';

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

export const getList = () => {
  return request<ResponseCommonData<SiteDataType[]>>(`/oss/site/getList`, {
    method: 'GET',
  });
};
