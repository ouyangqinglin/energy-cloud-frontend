import { del, get, post, put } from '@/utils/request';
import type { ElectricityPriceList } from '../type';
import type { MarketElectricityPriceInfo } from './type';

export const createMarketPrice = (params) => {
  return post(`/oss/site/mains/save`, params);
};

export const updateMarketPrice = (params) => {
  return put(`/site/mains/update`, params);
};

export const deleteMarketPrice = (params) => {
  return del(`/oss/site/mains/delete`, params);
};

export const getMarketPrice = (params) => {
  return get<{ data: MarketElectricityPriceInfo }>(`/site/mains/getInfo`, params);
};

export const getMarketElectricityPriceList = (params: {
  name?: string;
  startTime?: number;
  endTime?: number;
  status?: number;
  siteId: number;
}) => {
  return get<ElectricityPriceList>(`/oss/site/mains/pageQuery`, params);
};
