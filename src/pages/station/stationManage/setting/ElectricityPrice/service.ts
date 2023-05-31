import { get } from '@/utils/request';
import type { MarketElectricityPriceList } from './type';

export const getMarketElectricityPriceList = (params: {
  name?: string;
  startTime?: number;
  endTime?: number;
  status?: number;
  siteId: number;
}) => {
  return get<MarketElectricityPriceList>(`/electricityPrice/market/list`, params);
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
