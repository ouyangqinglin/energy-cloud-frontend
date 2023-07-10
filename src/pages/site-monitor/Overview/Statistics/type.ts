export interface ElectricityStatisticsRes {
  photovoltaic: Photovoltaic;
  storedEnergy: StoredEnergy;
  electricSupply: ElectricSupply;
  load: Load;
}
interface Load {
  charge: number;
  chargingPileCharge: number;
  power: number;
  chargingPilePower: number;
}

interface ElectricSupply {
  charge: number;
  discharge?: any;
  power: number;
}

interface StoredEnergy {
  charge?: any;
  discharge?: any;
  power?: any;
  dischargeableCapacity?: any;
}

interface Photovoltaic {
  charge?: any;
  power?: any;
}
