export interface PowerAndGunStatusRes {
  occupyCount: number;
  power: number;
  totalCount: number;
}

export interface StatisticsRes {
  totalIncome: number;
  totalApf: number;
  useRatio: number;
  totalCount: number;
}

export type ChartStationChartRes = {
  key: string;
  value: number;
}[];
