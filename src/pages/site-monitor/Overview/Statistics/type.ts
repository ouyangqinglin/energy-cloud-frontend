import type { ReactNode } from 'react';

export interface ElectricityStatisticsRes {
  photovoltaic: Photovoltaic;
  storedEnergy: StoredEnergy;
  electricSupply: ElectricSupply;
  load: Load;
}
export interface Load {
  charge: number;
  //是否存在充电桩: 0-否 1-是
  existChargingPile: number;
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
  chargeTotal?: any;
  dischargeTotal?: any;
  charge?: any;
  discharge?: any;
  power?: any;
  dischargeableCapacity?: any;
}

export interface Photovoltaic {
  charge?: any;
  power?: any;
}
