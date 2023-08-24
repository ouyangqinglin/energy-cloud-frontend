export type PVChart = {
  pvPowerGeneration: ChartItem[];
  pvPower: ChartPowerItem;
  totalPowerGeneration: number;
};

export type ESChart = {
  discharge: ChartItem[];
  charge: ChartItem[];
  dischargePower: ChartPowerItem[];
  chargePower: ChartPowerItem[];
  totalCharge: number;
  totalDischarge: number;
};

export type EIChart = {
  esIncome: ChartItem[];
  pvIncome: ChartItem[];
  csIncome: ChartItem[];
  income: ChartItem[];
  pvTotalIcome: number;
  esTotalIcome: number;
  csTotalIcome: number;
};

export type CSChart = {
  powerConsumption: ChartItem[];
  csPower: ChartPowerItem;
  totalPowerConsumption: number;
};

export type ELECChart = {
  meConsumption: ChartItem[];
  mePower: ChartPowerItem;
  totalConsumption: number;
};

export type AllChartType = PVChart & EIChart & ESChart & CSChart & ELECChart;

export type ChartItem = {
  timeDimension: string;
  electricity: number;
  amount: number;
};

export type ChartPowerItem = {
  eventTs: string;
  doubleVal: number;
};
