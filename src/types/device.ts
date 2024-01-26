/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-04 10:34:17
 * @LastEditTime: 2024-01-11 15:43:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\types\device.ts
 */
import { DeviceModelDescribeTypeEnum, DeviceModelShowTypeEnum, DeviceModelTypeEnum } from '@/utils';

export type DeviceModelAuthorityType = {
  detail?: string;
  edit?: string;
};

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
  component?: string;
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
  deviceId?: string;
  parentId?: string;
  serviceId?: string;
  name?: string;
  required?: boolean;
  span?: number;
  showType?: DeviceModelShowTypeEnum;
  disabled?: string;
  tip?: string;
  authority?: DeviceModelAuthorityType[];
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
  deviceId?: string;
  disabled?: string;
  name?: string;
  groupName?: string;
  showType?: DeviceModelShowTypeEnum;
  type?: DeviceModelDescribeTypeEnum;
  tip?: string;
  outputData?: DeviceServiceModelType[];
  children?: DeviceServiceModelType[];
  authority?: DeviceModelAuthorityType[];
};

export type DeviceLocationType = {
  id?: string;
  name?: string;
};

export type DeviceServiceGroupType = {
  groupName?: string;
  location?: DeviceLocationType;
  services?: DeviceServiceType[];
  component?: string;
};

export type DevicePageModels = {
  location?: DeviceLocationType;
  serviceGroups?: DeviceServiceGroupType[];
};

export type DeviceModelDescribeType = {
  id?: string;
  name?: string;
  type?: DeviceModelDescribeTypeEnum;
  showType?: DeviceModelShowTypeEnum;
  icon?: string;
  columns?: number;
  tip?: string;
  authority?: DeviceModelAuthorityType[];
  children?: DeviceModelDescribeType[] | DeviceServiceType[];
};

export type DeviceModelDataType = {
  properties?: DevicePropsType[];
  services?: DeviceServiceGroupType[];
  data?: DeviceModelDescribeType[];
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
