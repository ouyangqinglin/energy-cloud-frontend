import { get } from '@/utils/request';
import type {
  AlarmCardRes,
  EBCardRes,
  EICardRes,
  ESCardRes,
  OverViewCardRes,
  PVCardRes,
} from './type';

export const getPowerStationOverview = () => {
  return get<OverViewCardRes>(`/oss/site/index/powerStationOverview`, {});
};

export const getPhotovoltaicIndex = () => {
  return get<PVCardRes>(`/oss/site/index/getPhotovoltaicIndex`, {});
};

export const getEssIndex = () => {
  return get<ESCardRes>(`/oss/site/index/getEssIndex`, {});
};

export const getAlarmMonitoring = () => {
  return get<AlarmCardRes>(`/oss/site/index/getAlarmMonitoring`, {});
};

export const getEconomicBenefit = () => {
  return get<EICardRes>(`/oss/site/index/getEconomicBenefit`, {});
};

export const getEnvironmentalRevenueIndex = () => {
  return get<EBCardRes>(`/oss/site/index/environmentalRevenueIndex`, {});
};
