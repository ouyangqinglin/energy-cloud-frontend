export type MarketElectricityPriceList = MarketElectricityPriceListItem[];

// export type MarketElectricityPriceListItem = {
//   ruleName: string;
//   effectiveTime: string;
//   updateTime: string;
//   operator: string;
//   status: string;
// };

export interface MarketElectricityPriceListItem {
  id: number;
  name: string;
  effectiveTime?: string;
  expirationTime?: string;
  status: boolean;
  lastOperationTime: string;
  siteId: number;
  effectiveTimeList: EffectiveTimeList[];
  operator: string;
}

export interface EffectiveTimeList {
  id?: number;
  effectiveTime: string;
  expirationTime: string;
  internetId?: number;
  mainsId?: number; // 市电电价才有的字段
}
