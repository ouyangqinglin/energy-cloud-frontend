export interface DeviceInfo {
  deviceId: number;
  productId: number;
  sn: string;
  aliasSn?: any;
  name: string;
  parentId: number;
  siteId: number;
  connectStatus: number;
  alarmStatus: number;
  protocolCode?: any;
  thirdSn?: any;
  connectDeviceId: number;
  config?: any;
  createTime: string;
  associatedId?: any;
  configStatus: number;
  power?: any;
  mark?: any;
  sessionStartTime?: any;
  productType: number;
  productTypeName: string;
  subsystemName: string;
  model: string;
  siteName: string;
  childDeviceList: DeviceInfo[];
}

export interface ElectricGenerateStatistic {
  chargingPile: ChargingPile;
  otherLoad: OtherLoad;
}
interface OtherLoad {
  todayCharge: number;
  totalCharge: number;
  power: number;
}

interface ChargingPile {
  totalGunNum: number;
  beUsingGunNum: number;
  todayCharge: number;
  totalCharge: number;
  power: number;
}
