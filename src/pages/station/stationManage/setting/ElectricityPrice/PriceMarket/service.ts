import { del, get, post, put } from '@/utils/request';
import type { ElectricityPriceList } from '../type';
import type { MarketElectricityPriceInfo } from './type';

export const createMarketPrice = (data: any) => {
  return post(`/oss/site/mains/save`, data);
};

export const updateMarketPrice = (data: any) => {
  return put(`/oss/site/mains/update`, data);
};

export const deleteMarketPrice = (data: any) => {
  return del(`/oss/site/mains/delete`, data);
};

export const getMarketPrice = (params: any) => {
  return get<{ data: MarketElectricityPriceInfo }>(`/oss/site/mains/getInfo`, params);
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
