export interface StatisticsRes {
  statistics: Statistics;
}

export interface ChargeAndDisChargeRes {
  //放电量
  ADC: number;
  //充电量
  ACC: number;
}

export const enum RealtimeStatusEnum {
  DEFAULT,
  DISCHARGE,
  CHARGE,
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

export interface EnergyStorageChartRes {
  TotalBatteryCurrent: ChartDataMap[];
  TotalBatteryVoltage: ChartDataMap[];
  SOC: ChartDataMap[];
  PDC: ChartDataMap[];
}

export interface ChartDataMap {
  value: number;
  ts: number;
}
