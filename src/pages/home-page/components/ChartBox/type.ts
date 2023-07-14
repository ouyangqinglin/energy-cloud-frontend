export type PVChart = {
  pvPowerGeneration: ChartItem[];
};

export type ESChart = {
  discharge: ChartItem[];
  charge: ChartItem[];
  pvPowerGeneration: ChartItem[];
};

export type EIChart = {
  esIncome: ChartItem[];
  pvIncome: ChartItem[];
  income: ChartItem[];
};

export type AllChartType = PVChart & EIChart & ESChart;

export type ChartItem = {
  timeDimension: string;
  electricity: number;
  amount: number;
};
