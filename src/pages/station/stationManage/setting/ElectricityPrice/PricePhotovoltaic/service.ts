import { del, get, post, put } from '@/utils/request';
import type { ElectricityPriceList } from '../type';
import { PhotovoltaicElectricityPriceInfo } from './type';

export const createPhotovoltaicPrice = (data: any) => {
  return post(`/oss/site/internet/save`, data);
};

export const updatePhotovoltaicPrice = (data: any) => {
  return put(`/oss/site/internet/update`, data);
};

export const getPhotovoltaicPrice = (params: any) => {
  return get<{ data: PhotovoltaicElectricityPriceInfo }>(`/oss/site/internet/getInfo`, params);
};

export const deletePhotovoltaicPrice = (data: any) => {
  return del(`/oss/site/internet/delete`, data);
};

export const getPhotovoltaicElectricityPriceList = (params: {
  name?: string;
  startTime?: number;
  endTime?: number;
  status?: number;
  siteId: number;
}) => {
  return get<ElectricityPriceList>(`/oss/site/internet/pageQuery`, params);
};
