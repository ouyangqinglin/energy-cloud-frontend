/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-30 13:43:29
 * @LastEditTime: 2023-06-30 13:43:29
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\type.ts
 */

export type CollectionValueType = {
  selectName: string;
  paramName: string;
  node?: {
    deviceId?: string;
    paramCode?: string;
    deviceName?: string;
  };
};

export type TableSearchType = {
  siteId?: string;
  collection?: CollectionValueType[];
  date?: string[];
  startTime?: string;
  endTime?: string;
  keyValue?: {
    key?: string;
    name?: string;
    deviceId?: string;
    deviceName?: string;
  }[];
};

export type TableDataType = TableSearchType & {
  time?: string;
  devices?: {
    deviceId?: string;
    key?: string;
    value?: number;
  }[];
};
