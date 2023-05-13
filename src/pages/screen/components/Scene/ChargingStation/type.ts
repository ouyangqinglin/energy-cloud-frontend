export interface ChargingStationRes {
  // 充电功率
  chargingPower: string;
  // 充电量
  chargingCapacity: string;
  profit: string;
  chargingGunStatus: ChargingGunStatus;
  chargingGunCurve: ChartDataMap[];
}

export interface ChargingGunStatus {
  occupyCount: number;
  freeCount: number;
}

export interface ChartDataMap {
  value: number;
  ts: number;
}
