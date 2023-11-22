/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-04 10:34:17
 * @LastEditTime: 2023-08-04 10:34:17
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

export type DeviceServiceModelType = {
  id?: string;
  name?: string;
  dataType?: {
    type?: DeviceModelTypeEnum;
    specs?: DeviceServiceModelType[];
  };
};

export type DeviceServiceType = {
  groupName?: string;
  services?: {
    id?: string;
    name?: string;
    groupName?: string;
    outputData?: DeviceServiceModelType[];
  }[];
};

export type DeviceModelDataType = {
  properties?: DevicePropsType[];
  services?: DeviceServiceType[];
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
