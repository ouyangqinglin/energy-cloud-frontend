/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 13:54:37
 * @LastEditTime: 2023-05-25 17:15:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\data.d.ts
 */
import { FileType } from '@/utils/dictionary';

export type StationType = {
  name: string;
  id: string;
  createTime: string;
  deliveryTime: string;
  countryCode: string;
  provinceCode: string;
  cityCode: string;
  agent: string;
  constructionStatus: number;
  operator: string;
  lastOperationTime: string;
};

export type StationFormType = {
  id?: string;
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
  };
  address: string;
  longitude: number;
  latitude: number;
  countryCode: string;
  provinceCode: string;
  cityCode: string;
  logo: string;
  logoList: FileType[];
  photos: string;
  photosList: FileType[];
  remark: string;
};
