import request, { get } from '@/utils/request';
import { RequestData } from '@ant-design/pro-table';
import type { AccountListDataType } from './data';

export const getAccountList = (params: any) => {
  return get<AccountListDataType>(`/accounts/list`, params);
};

export const getProviders = () => {
  return get(`/accounts/get/provider`);
};

export const removeData = (id: string) => {
  return request(`/station/${id}`, {
    method: 'DELETE',
  });
};
