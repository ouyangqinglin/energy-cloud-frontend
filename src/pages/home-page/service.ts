import { string } from '@/components/stringSwitch';
import { get } from '@/utils/request';
import type {
  AlarmCardRes,
  EBCardRes,
  EICardRes,
  ESCardRes,
  OverViewCardRes,
  PVCardRes,
} from './type';

export const getPowerStationOverview = (params: { energyOptions?: string }) => {
  return get<OverViewCardRes>(`/oss/site/index/powerStationOverview`, params);
};

export const getPhotovoltaicIndex = (params: { energyOptions?: string }) => {
  return get<PVCardRes>(`/oss/site/index/getPhotovoltaicIndex`, params);
};

export const getEssIndex = (params: { energyOptions?: string }) => {
  return get<ESCardRes>(`/oss/site/index/getEssIndex`, params);
};

export const getAlarmMonitoring = (params: { energyOptions?: string }) => {
  return get<AlarmCardRes>(`/oss/site/index/getAlarmMonitoring`, params);
};

export const getEconomicBenefit = (params: { energyOptions?: string }) => {
  return get<EICardRes>(`/oss/site/index/getEconomicBenefit`, params);
};

export const getEnvironmentalRevenueIndex = (params: { energyOptions?: string }) => {
  return get<EBCardRes>(`/oss/site/index/environmentalRevenueIndex`, params);
};

export const getElectricStack = (params: { energyOptions?: string }) => {
  return get<any>('/oss/site/index/getChargingPileIndex', params);
};
