export enum deviceType {
  DistributionCabinet = 0,
  LoadCS = 1,
  LoadOther,
  ChargingStackHW = 19,
  ChargingStack = 33,
  SuperChargingTerminalHW = 20,
  ChargingTerminalHW = 21,
  ChargingTerminal = 22,
  ChargingStationDC160 = 13,
  ChargingStationDC120 = 24,
  ChargingStationAC = 25,
  AirConditioning,
  Illumination,
  OtherDevice,
}

export interface TypePowerConsumptionData {
  elecToday: number;
  power: number;
  type: number;
  name?: string;
  children?: TypePowerConsumptionData[];
}
