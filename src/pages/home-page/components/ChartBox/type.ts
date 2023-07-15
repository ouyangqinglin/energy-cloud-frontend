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
  income: ChartItem[];
  pvTotalIcome: number;
  esTotalIcome: number;
};

export type AllChartType = PVChart & EIChart & ESChart;

export type ChartItem = {
  timeDimension: string;
  electricity: number;
  amount: number;
};

export type ChartPowerItem = {
  eventTs: string;
  doubleVal: number;
};
