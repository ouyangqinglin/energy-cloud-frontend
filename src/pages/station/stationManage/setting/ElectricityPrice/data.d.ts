export type MarketElectricityPriceList = MarketElectricityPriceListItem[];

export type MarketElectricityPriceListItem = {
  ruleName: string;
  effectiveTime: string;
  updateTime: string;
  operator: string;
  status: string;
};
