/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-04 10:34:17
 * @LastEditTime: 2023-11-29 15:29:32
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\types\device.ts
 */
import { DeviceModelTypeEnum } from '@/utils';

export type DeviceModelType = {
  type?: DeviceModelTypeEnum;
  specs?: any;
};

export type DevicePropsType = {
  id?: string;
  name?: string;
  groupName?: string;
  dataType?: DeviceModelType;
  properties?: DevicePropsType[];
};

export type DeviceArrayType = {
  type?: DeviceModelTypeEnum;
  specs?: {
    size?: number;
    item?: DeviceTimeRangeType | DeviceStructType;
    originalItem?: DeviceTimeRangeType | DeviceStructType;
  };
};

export type DeviceTimeRangeType = {
  type?: DeviceModelTypeEnum;
  specs?: {
    length: number;
  };
};

export type DeviceEnumType = {
  type?: DeviceModelTypeEnum;
  specs?: Record<string, any>;
};

export type DeviceDoubleType = {
  type?: DeviceModelTypeEnum;
  specs?: {
    unit?: string;
    unitName?: string;
  };
};

export type DeviceStructType = {
  type?: DeviceModelTypeEnum;
  specs?: DeviceServiceModelType[];
};

export type DeviceServiceModelType = {
  id?: string;
  name?: string;
  required?: boolean;
  span?: number;
  dataType?:
    | DeviceArrayType
    | DeviceDoubleType
    | DeviceStructType
    | DeviceTimeRangeType
    | DeviceEnumType
    | {
        type?: DeviceModelTypeEnum;
        specs?: DeviceServiceModelType[];
      };
};

export type DeviceServiceType = {
  id?: string;
  name?: string;
  groupName?: string;
  outputData?: DeviceServiceModelType[];
  authority?: {
    detail?: string;
    edit?: string;
  }[];
};

export type DeviceServiceGroupType = {
  groupName?: string;
  location?: {
    id?: string;
    name?: string;
  };
  services?: DeviceServiceType[];
};

export type DeviceModelDataType = {
  properties?: DevicePropsType[];
  services?: DeviceServiceGroupType[];
};

export type DeviceTreeDataType = {
  id?: string;
  deviceName?: string;
  deviceSN?: string;
  parentId?: string;
  productId?: string;
  siteId?: string;
  siteName?: string;
  children?: DeviceTreeDataType[];
};
