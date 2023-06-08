import { del, get, post, put } from '@/utils/request';
import type { ElectricityPriceList } from '../type';
import { PhotovoltaicElectricityPriceInfo } from './type';

export const createPhotovoltaicPrice = (params) => {
  return post(`/site/internet/saveOrUpdate`, params);
};

export const updatePhotovoltaicPrice = (params) => {
  return put(`/site/internet/update`, params);
};

export const getPhotovoltaicPrice = (params) => {
  return get<{ data: PhotovoltaicElectricityPriceInfo }>(`/site/internet/getInfo`, params);
};

export const deletePhotovoltaicPrice = (params) => {
  return del(`/oss/site/internet/delete`, params);
};

export const getPhotovoltaicElectricityPriceList = (params: {
  name?: string;
  startTime?: number;
  endTime?: number;
  status?: number;
  siteId: number;
}) => {
  return get<ElectricityPriceList>(`/site/internet/pageQuery`, params);
};
