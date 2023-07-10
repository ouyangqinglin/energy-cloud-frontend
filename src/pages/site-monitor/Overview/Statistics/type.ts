export interface ElectricityStatisticsRes {
  photovoltaic: Photovoltaic;
  storedEnergy: StoredEnergy;
  electricSupply: ElectricSupply;
  load: Load;
}
export interface Load {
  charge: number;
  chargingPileCharge: number;
  otherLoadCharge: number;
  power: number;
  chargingPilePower: number;
  otherLoadPower: number;
}

export interface ElectricSupply {
  charge: number;
  discharge?: any;
  power: number;
}

export interface StoredEnergy {
  charge?: any;
  discharge?: any;
  power?: any;
  dischargeableCapacity?: any;
}

export interface Photovoltaic {
  charge?: any;
  power?: any;
}
