export interface Charge {
  eventTs: string;
  doubleVal?: any;
}

export interface Discharge {
  eventTs: string;
  doubleVal?: any;
}

export interface SelfUse {
  eventTs: string;
  doubleVal?: any;
}

export interface PvPowerGeneration {
  eventTs: string;
  doubleVal?: any;
}

export const enum FlagType {
  PHOTOVOTAIC_TYPE = 1,
  ES_TYPE,
  CHARGING_TYPE,
  LOAD_TYPE,
  ELECTRIC_SUPPLY_TYPE,
}

export interface Flag {
  // PHOTOVOTAIC_TYPE(1,"光伏监测点"),
  // ES_TYPE(2,"储能监测点"),
  // CHARGING_TYPE(3,"充电桩监测点"),
  // LOAD_TYPE(4,"负载监测点"),
  // ELECTRIC_SUPPLY_TYPE(5,"市电监测点")
  code: FlagType;
  flag: boolean;
}

export interface ChartType {
  charge: Charge[];
  discharge: Discharge[];
  selfUse: SelfUse[];
  pvPowerGeneration: PvPowerGeneration[];
  flag: Flag[];
}
