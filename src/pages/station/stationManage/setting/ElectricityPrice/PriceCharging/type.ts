import type { EffectiveTimeList, HoursPriceList } from '../type';

export interface ChargingElectricityPriceParams {
  id: number;
  name: string;
  status: number;
  siteId: number;
  effectiveTimeList: EffectiveTimeList[];
  hoursPriceList: HoursPriceList[];
}

export interface ChargingElectricityPriceInfo {
  id: number;
  name: string;
  status: number;
  lastOperationTime: string;
  siteId: number;
  effectiveTimeList: EffectiveTimeList[];
  hoursPriceList: HoursPriceList[];
  operator: string;
}
