/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 11:02:29
 * @LastEditTime: 2023-07-13 18:58:44
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\type.ts
 */

import { DeviceDataType } from '@/services/equipment';

export type ComProps = {
  siteId?: string;
  className?: string;
};

export type searchType = {
  siteId: string;
  date?: string;
  type?: number;
};

export type statType = {
  name?: string;
};

export type GroupDeviceType = DeviceDataType & {
  index?: number;
  groupId?: number;
  groupName?: string;
};

export type GroupType = {
  groupId?: number;
  groupName?: string;
  devices?: GroupDeviceType[];
};
