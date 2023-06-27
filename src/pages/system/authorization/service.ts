import { del, get, post, put } from '@/utils/request';
import { ListDataType } from './type';
// import type { ElectricityPriceList } from '../type';
// import type { MarketElectricityPriceInfo } from './type';

// export const createMarketPrice = (data: any) => {
//   return post(`/oss/remote-upgrade/create`, data);
// };

// export const updateMarketPrice = (data: any) => {
//   return put(`/oss/site/mains/update`, data);
// };

// export const deleteMarketPrice = (data: any) => {
//   return del(`/oss/site/mains/delete`, data);
// };

// export const getMarketPrice = (params: any) => {
//   return get<{ data: MarketElectricityPriceInfo }>(`/oss/site/mains/getInfo`, params);
// };

export const getApplicationAuthorizationList = (params: any) => {
  return get<ListDataType>(`/oss/authorization/list`, params);
};
