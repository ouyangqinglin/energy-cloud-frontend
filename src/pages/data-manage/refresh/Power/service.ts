import request from '@/utils/request';
import type { ResponseCommonData } from '@/utils/request';
import type { SiteDataType } from './type';

export const editData = (data: any) => {
  return request(`/iot/collectionData/recoverDataPower`, {
    method: 'POST',
    data,
  });
};

export const getList = () => {
  return request<ResponseCommonData<SiteDataType[]>>(`/oss/site/getList`, {
    method: 'GET',
  });
};
