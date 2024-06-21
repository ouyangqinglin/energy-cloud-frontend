import { MapTypeEnum } from '@/utils/dictionary';

export interface SiteInfoRes extends SiteInfoFront {
  id: number;
  sn: string;
  name: string;
  transformerCapacity: number;
  photovoltaicInstalledCapacity: number;
  energyStorageCapacity: number;
  energyStoragePower: number;
  chargingStationCapacity: number;
  address: string;
  cityCode: string;
  energyOptions?: string;
  longitude: number;
  latitude: number;
  map?: MapTypeEnum;
}

export interface SiteInfoFront {
  energyStorageCapacityFront: string;
}

export interface DeviceNumRes {
  energyStorageNumber: number;
  chargingHostNumber: number;
  overchargedPileNumber: number;
  fastFillingPileNumber: number;
  acpileNumber: number;
  pvinverterNumber: number;
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface CombineDeviceRes extends DeviceNumRes, SiteInfoRes {
  [index: string]: any;
}
