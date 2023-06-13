export interface ChartRes {
  irradiance: ChartDataMap[];
  activePower: ChartDataMap[];
}

export interface ChartDataMap {
  value: number;
  ts: number;
}
