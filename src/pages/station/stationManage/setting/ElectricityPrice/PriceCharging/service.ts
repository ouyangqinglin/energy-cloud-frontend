import { del, get, post, put } from '@/utils/request';
import type { ElectricityPriceList } from '../type';
import type { ChargingElectricityPriceInfo } from './type';

export const createChargingPrice = (data: any) => {
  return post(`/oss/site/charge/save`, data);
};

export const updateChargingPrice = (data: any) => {
  return put(`/oss/site/charge/update`, data);
};

export const getChargingPrice = (params: any) => {
  return get<{ data: ChargingElectricityPriceInfo }>(`/oss/site/charge/getInfo`, params);
};

export const deleteChargingPrice = (data: any) => {
  return del(`/oss/site/charge/delete`, data);
};

export const getChargingElectricityPriceList = (params: {
  name?: string;
  startTime?: number;
  endTime?: number;
  status?: number;
  siteId: number;
}) => {
  return get<ElectricityPriceList>(`/oss/site/charge/pageQuery`, params);
};

export const updateStatus = (data: any) => {
  return put(`/oss/site/energyFlowDiagram/updateElectrovalenceStatus`, data);
};

export const getMarketDefaultPrice = (params: any) => {
  return get('/oss/site/charge/getDefaultPrice', params);
};
