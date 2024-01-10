/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 13:54:37
 * @LastEditTime: 2023-12-19 10:50:39
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\remote-upgrade\package\config.ts
 */
import type { FileType } from '@/utils/dictionary';
import { formatMessage } from '@/utils';

export type StationType = {
  name: string;
  id: string;
  createTime: string;
  uploadTime: string;
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
  installers: {
    orgName: string;
  }[];
};

export const packageStatus = {
  0: {
    text: formatMessage({ id: 'common.disable', defaultMessage: '禁用' }),
    status: 'error',
    icon: 'red',
  },
  1: {
    text: formatMessage({ id: 'common.enable', defaultMessage: '启用' }),
    status: 'Success',
    icon: 'green',
  },
};
export type TreeDataType = {
  deviceName: string;
  deviceSN: string;
  id: string;
  parentId: string;
  children: TreeDataType[];
  selectFlag: boolean;
  productId: number;
};
export type StationFormType = {
  siteId?: string;
  orgs?: {
    orgId: string;
    orgName: string;
  }[];
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
