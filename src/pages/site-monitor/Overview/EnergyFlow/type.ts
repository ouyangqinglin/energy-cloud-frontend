// 1=光伏 2=储能 3=充电桩 4=负载 5=市电
export const enum SubSystemType {
  PV = '1',
  ES = '2',
  CS = '3',
  L = '4',
  E = '5',
}

export const enum FlowDirection {
  IN = -1,
  OUT = 1,
  STOP = 0,
}

export type SystemDiagramRes = Record<
  `${SubSystemType}`,
  {
    type: number;
    time: string;
    // 能流方向 =-1能流流入 =0未流动 =1 能源流出
    direction: FlowDirection;
    charge: number;
    flag: boolean; //=true站点有此项，=false站点无此项
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
