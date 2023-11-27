/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-04 10:34:17
 * @LastEditTime: 2023-11-27 16:41:02
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

export type DeviceTimeRangeType = {
  type?: DeviceModelTypeEnum;
  specs?: {
    length: number;
  };
};

export type DeviceArrayType = {
  type?: DeviceModelTypeEnum;
  specs?: {
    size?: number;
    item?: DeviceTimeRangeType;
  };
};

export type DeviceDoubleType = {
  type?: DeviceModelTypeEnum;
  specs?: {
    unit?: string;
    unitName?: string;
  };
};

export type DeviceServiceModelType = {
  id?: string;
  name?: string;
  required?: boolean;
  dataType?:
    | DeviceArrayType
    | DeviceDoubleType
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
