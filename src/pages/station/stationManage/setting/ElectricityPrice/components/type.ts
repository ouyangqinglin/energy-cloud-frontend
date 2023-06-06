import type { EffectiveTimeList } from '../type';

export interface MarketElectricityPriceParams {
  id: number;
  name: string;
  status: boolean;
  siteId: number;
  powerFactor: string;
  electricityType: string;
  maxDemand: string;
  demandElectrovalency: string;
  sharpPrice: string;
  peakPrice: string;
  flatPrice: string;
  valleyPrice: string;
  effectiveTimeList: EffectiveTimeList[];
  hoursPriceList: HoursPriceList[];
}

export interface MarketElectricityPriceInfo {
  id: number;
  effectiveTimeList: EffectiveTimeList[];
  name: string;
  powerFactor: string;
  electricityType?: any;
  maxDemand?: any;
  demandElectrovalency?: any;
  // 生效状态
  status: boolean;
  sharpPrice: string;
  peakPrice: string;
  flatPrice: string;
  lastOperationTime: string;
  siteId: number;
  hoursPriceList: HoursPriceList[];
  valleyPrice: string;
  operator: string;
}

export interface HoursPriceList {
  intervalStartTime: string;
  intervalEndTime: string;
  id?: number;
  type?: number;
  mainsId?: number;
}
