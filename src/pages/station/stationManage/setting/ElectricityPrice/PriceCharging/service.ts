import { del, get, post, put } from '@/utils/request';
import type { ElectricityPriceList } from '../type';
import { ChargingElectricityPriceInfo } from './type';

export const createChargingPrice = (params) => {
  return post(`/site/charge/saveOrUpdate`, params);
};

export const updateChargingPrice = (params) => {
  return put(`/site/charge/update`, params);
};

export const getChargingPrice = (params) => {
  return get<{ data: ChargingElectricityPriceInfo }>(`/site/charge/getInfo`, params);
};

export const deleteChargingPrice = (params) => {
  return del(`/oss/site/charge/delete`, params);
};

export const getChargingElectricityPriceList = (params: {
  name?: string;
  startTime?: number;
  endTime?: number;
  status?: number;
  siteId: number;
}) => {
  return get<ElectricityPriceList>(`/site/charge/pageQuery`, params);
};
