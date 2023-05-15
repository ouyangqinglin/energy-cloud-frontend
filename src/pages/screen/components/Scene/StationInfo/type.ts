export interface SiteInfoRes extends SiteInfoFront {
  id: number;
  sn: string;
  name: string;
  transformerCapacity: number;
  photovoltaicInstalledCapacity: number;
  energyStorageCapacityStorage: number;
  energyStorageCapacityOutput: number;
  chargingStationCapacity: number;
  address: string;
  cityCode: string;
  longitude: number;
  latitude: number;
}

export interface SiteInfoFront {
  energyStorageCapacity: string;
}
