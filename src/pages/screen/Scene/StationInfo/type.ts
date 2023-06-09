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
  longitude: number;
  latitude: number;
}

export interface SiteInfoFront {
  energyStorageCapacityFront: string;
}
