/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-30 13:43:29
 * @LastEditTime: 2023-06-30 13:43:29
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\type.ts
 */

import { DeviceModelType } from '@/types/device';

export type CollectionValueType = {
  id: string;
  name: string;
  selectName: string;
  paramName: string;
  node?: {
    deviceId?: string;
    paramCode?: string;
    deviceName?: string;
    deviceSN?: string;
    dataType?: DeviceModelType;
  };
};

export type TableSearchType = {
  siteId?: string;
  collection?: CollectionValueType[];
  deviceCollection?: {}[];
  time?: string[];
  startTime?: string;
  endTime?: string;
  keyValue?: {
    key?: string;
    name?: string;
    deviceId?: string;
    deviceName?: string;
    sn?: string;
    type?: string;
  }[];
};

export type TableDataType = Omit<TableSearchType, 'time'> &
  Record<string, any> & {
    time?: string;
    devices?: {
      deviceId?: string;
      key?: string;
      value?: number;
    }[];
  };
