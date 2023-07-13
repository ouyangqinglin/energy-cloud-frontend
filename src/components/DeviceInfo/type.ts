/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-20 11:18:18
 * @LastEditTime: 2023-06-20 11:18:18
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EquipInfo\type.ts
 */

export type DeviceInfoType = {
  name?: string;
  online?: number;
  alarm?: number;
  lastOnlineTime?: string;
};

export type DeviceType = {
  siteId?: string;
  paramConfigType?: number;
};
