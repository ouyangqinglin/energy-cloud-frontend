import { get } from '@/utils/request';
import { MarketElectricityPriceInfo } from './type';

export const updateMarketPrice = (params) => {
  return get(`/site/mains/saveOrUpdate`, params);
};

export const getMarketPrice = (params) => {
  return get<{ data: MarketElectricityPriceInfo }>(`/site/mains/getInfo`, params);
};
