// 1=光伏 2=储能 3=充电桩 4=负载 5=市电
export const enum SubSystemType {
  PV = '1',
  ES = '2',
  CS = '3',
  L = '4',
  E = '5',
}
export type SystemDiagramRes = Record<
  `${SubSystemType}`,
  {
    type: number;
    time: string;
    direction: number;
    charge: number;
    p: number;
    soc: number;
  }
>;

export interface PVRevenueRes {
  siteId: number;
  chargingPileGains: string;
  photovoltaicGains: string;
  essGains: string;
  totalGains: string;
  chargingPileProportion: string;
  photovoltaicProportion: string;
  essProportion: string;
}
