export interface ChartItemType {
  eventTs: string;
  doubleVal?: any;
}

export type DataType = {
  time: string;
  value: number | undefined;
  field: string;
};

export type ChartConfigType = {
  name: string;
  field: string;
  flag: FlagType;
  show: boolean;
  color: string;
};

export type TotalConfigType = {
  name: string;
  field: string;
  value: string;
};

export const enum FlagType {
  PHOTOVOLTAIC_TYPE = 1,
  ES_TYPE,
  CHARGING_TYPE,
  LOAD_TYPE,
  ELECTRIC_SUPPLY_TYPE,
  GAIN,
}

export interface Flag {
  // PHOTOVOLTAIC_TYPE(1,"光伏监测点"),
  // ES_TYPE(2,"储能监测点"),
  // CHARGING_TYPE(3,"充电桩监测点"),
  // LOAD_TYPE(4,"负载监测点"),
  // ELECTRIC_SUPPLY_TYPE(5,"市电监测点")
  code: FlagType;
  flag: boolean;
}
export interface ChartType extends ChartTypeFlag {
  // 折线图
  me?: ChartItemType[];
  cs?: ChartItemType[];
  es?: ChartItemType[];
  pv?: ChartItemType[];
  load?: ChartItemType[];

  // 柱状图
  //市电用电
  mainsUse?: ChartItemType[];
  //负载用电
  loadUse?: ChartItemType[];
  //储能充电
  essCharge?: ChartItemType[];
  //储能放电
  essDisCharge?: ChartItemType[];
  //充电桩充电
  cpCharge?: ChartItemType[];
  //光伏自用
  pvSelfUse?: ChartItemType[];
  //光伏发电
  pvPowerGeneration?: ChartItemType[];
}

export interface ChartTypeFlag {
  flag: Flag[];
}

export type ChartTypeWithoutFlag = Record<string, ChartItemType[]>;
