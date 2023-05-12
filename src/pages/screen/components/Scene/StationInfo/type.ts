export interface SiteInfoRes {
  id: number;
  sn: string;
  name: string;
  voltageclass: number;
  transformerCapacity: number;
  photovoltaicInstalledcapacity: number;
  energystorageCapacitystorage: number;
  energyStorageCapacityOutput: number;
  chargingstationCapacity: number;
  address: string;
}

export interface SiteInfo {
  siteName: string;
  transformerCapacity: string;
  photovoltaicPanel: string;
  energyStorageCapacity: string;
  energyStorageOutput?: string;
  chargingStation: string;
  location: string;
}
