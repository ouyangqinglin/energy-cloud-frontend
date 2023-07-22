export interface StatisticsRes {
  status: number;
  power: number;
  ratedCapacity: number;
  charge: number;
  discharge: number;
  soc: number;
  soh: number;
}

export interface ChargeAndDisChargeRes {
  charge: number;
  discharge: number;
  profit: number;
}

export const enum RealtimeStatusEnum {
  DEFAULT = 0,
  DISCHARGE = -1,
  CHARGE = 1,
}

export interface Statistics {
  id: number;
  soc: number;
  soh: number;
  chargingAndDischargingPower: number;
  electricCurrent: number;
  voltage: number;
  realTimeStatus: RealtimeStatusEnum;
  createTime?: any;
}

export type EnergyStorageChartRes = {
  charge: ESChartRes;
  discharge: ESChartRes;
};

export type ESChartRes = {
  eventTs: string;
  doubleVal: number;
}[];
