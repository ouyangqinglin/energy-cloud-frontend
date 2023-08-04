/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-04 10:34:17
 * @LastEditTime: 2023-08-04 10:34:17
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\types\device.ts
 */
import { DeviceModelTypeEnum } from '@/utils/dictionary';

export type DeviceModelType = {
  type?: DeviceModelTypeEnum;
  specs?: any;
};

export type DevicePropsType = {
  id?: string;
  name?: string;
  groupName?: string;
  dataType?: DeviceModelType;
  properties?: DevicePropsType;
};

export type DeviceServiceType = {};

export type DeviceModelDataType = {
  properties?: DevicePropsType[];
  services?: DeviceServiceType[];
};
