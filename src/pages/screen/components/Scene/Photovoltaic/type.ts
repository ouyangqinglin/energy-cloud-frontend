export interface StatisticsRes {
  // 当前发电量
  powerGeneration: number;
  // 收益
  profit: number;
}

export interface CurrentPowerGenerationRes {
  CurrentPowerGeneration: number;
}

export interface PVChartRes {
  irradiance: ChartDataMap[];
  activePower: ChartDataMap[];
}

export interface ChartDataMap {
  value: number;
  ts: number;
}
