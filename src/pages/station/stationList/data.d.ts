/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 13:54:37
 * @LastEditTime: 2023-05-25 17:15:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\data.d.ts
 */
import type { FileType } from '@/utils/dictionary';

export type StationType = {
  name: string;
  id: string;
  createTime: string;
  deliveryTime: string;
  area: string[];
  countryCode: string;
  provinceCode: string;
  cityCode: string;
  country: string;
  province: string;
  city: string;
  agent: string;
  constructionStatus: number;
  operator: string;
  lastOperationTime: string;
};

export type StationFormType = {
  siteId?: string;
  name: string;
  voltageClass: number;
  transformerCapacity: number;
  energyStorageCapacityStorage: number;
  photovoltaicInstalledCapacity: number;
  chargingStationCapacity: number;
  energyStoragePower: number;
  addressInfo: {
    address: string;
    point: {
      lat: number;
      lng: number;
    };
    countryCode: string;
    provinceCode: string;
    cityCode: string;
    adcode: string;
  };
  address: string;
  longitude: number;
  latitude: number;
  adcode: string;
  countryCode: string;
  provinceCode: string;
  cityCode: string;
  logo: string;
  logoList: FileType[];
  photos: string;
  photosList: FileType[];
  remarks: string;
};
