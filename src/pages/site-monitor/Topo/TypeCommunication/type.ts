export const enum VirtualDeviceType {
  MQTT = 10000,
  XJ,
  HW,
  EM,
}

export const enum DeviceType {
  EMS_215 = 1,
  BATTERY_STACK_215 = 2,
  PCS_215 = 3,
  ELECTRICITY_METER_215 = 6,
  AIR_CONDITIONING_215 = 7,
  ELECTRICITY_METER_GATEWAY = 9,
  ELECTRICITY_METER = 10,
  PV_INVERTER_HW_60KWP = 11,
  // PV_INVERTER_YT = 13,
  CHARGING_STATION_DC160 = 13,
  XIAOJU_GAN = 14,
  // 永泰工商业储能
  ES_215 = 16,
  ELECTRICITY_METER_RAIG200 = 17,
  CHARGING_STACK_HW = 19,
  SUPER_CHARGING_TERMINAL_HW = 20,
  CHARGING_TERMINAL_HW = 21,
  CHARGING_TERMINAL = 22,
  CHARGING_STATION_DC120 = 24,
  CHARGING_STATION_AC = 25,
  // 华为工商业储能
  ES_HW = 26,
  PV_INVERTER_HW_50KWP = 28,
  POWER_EXCHANGE_CABINET = 32,
  CHARGING_STACK = 33,
  BATTERY_CLUSTER = 34,
  BATTERY_MODULE = 35,
  PV_INVERTER_HW_40KWP = 36,
}

export interface TypeCommunicationData {
  name: string;
  type: DeviceType & VirtualDeviceType;
  children: TypeCommunicationData[] | null;
}
