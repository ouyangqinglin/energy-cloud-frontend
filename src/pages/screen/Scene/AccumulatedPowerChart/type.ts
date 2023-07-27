export interface AccumulatedPowerChartRes {
  [index: string]: EnergyChartRes[];
  me: EnergyChartRes[];
  pv: EnergyChartRes[];
  esCharge: EnergyChartRes[];
  esDischarge: EnergyChartRes[];
  cs: EnergyChartRes[];
  load: EnergyChartRes[];
}

export interface EnergyChartRes {
  timeDimension: string;
  electricity: number;
}
