import { get } from '@/utils/request';
import type { AccountListDataType, CustomerInfo } from './data';

export const getAccountList = (params: any) => {
  return get<AccountListDataType>(`/accounts/list`, params);
};

export const getMarketElectricityPriceList = (params) => {
  return get(`/electricityPrice/market/list`, params);
};

export const getRules = () => {
  return get(`/electricityPrice/rules`);
};

export const saveCustomerInfo = (params) => {
  return get(`/accounts/save/customerInfo`, params);
};

export const getCustomerInfo = (params) => {
  return get<{ data: CustomerInfo }>(`/accounts/get/customerInfo`, params);
};
