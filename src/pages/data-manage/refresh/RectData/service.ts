import request from '@/utils/request';
import type { ResponseCommonData } from '@/utils/request';
import type { SiteDataType, SiteParams } from './type';

export const editSiteData = (data: any) => {
  return request(`/iot/jx/syncSiteData`, {
    method: 'POST',
    data,
  });
};

export const getList = (params: SiteParams) => {
  return request<ResponseCommonData<SiteDataType[]>>(`/oss/site/getList`, {
    method: 'GET',
    params,
  });
};
