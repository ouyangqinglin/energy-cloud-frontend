export interface StatisticsRes {
  SSRation: number;
  // 发电
  charge: number;
  // 	馈电（上网电量）
  discharge: number;
  // 自发自用
  selfUse: number;
  // 收益
  profit?: number;
}

export type PVChartRes = {
  time: string;
  value: number;
}[];

export interface CurrentPowerRes {
  realTimePowerGeneration: number;
  totalStringCapacity: number;
}
