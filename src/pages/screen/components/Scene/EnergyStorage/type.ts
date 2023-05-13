export interface EnergyStorageRes {
  TotalBatteryCurrent: any[];
  ADC: any[];
  ACC: any[];
  TotalBatteryVoltage: any[];
  soc: any[];
  statistics: Statistics;
}

export interface Statistics {
  id: number;
  soc: number;
  soh: number;
  chargingAndDischargingPower: number;
  electricCurrent: number;
  voltage: number;
  realTimeStatus: number;
  createTime?: any;
}
