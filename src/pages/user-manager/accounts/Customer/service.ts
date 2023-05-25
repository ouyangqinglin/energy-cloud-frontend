import { get } from '@/utils/request';
import type { AccountListDataType, CustomerInfo } from './data';

export const getAccountList = (params: any) => {
  return get<AccountListDataType>(`/accounts/list`, params);
};

export const getProviders = () => {
  return get(`/accounts/get/provider`);
};

export const getRoles = () => {
  return get(`/accounts/get/roles`);
};

export const saveCustomerInfo = (params) => {
  return get(`/accounts/save/customerInfo`, params);
};

export const getCustomerInfo = (params) => {
  return get<{ data: CustomerInfo }>(`/accounts/get/customerInfo`, params);
};
