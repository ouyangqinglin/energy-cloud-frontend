/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 13:54:37
 * @LastEditTime: 2023-05-04 13:54:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\data.d.ts
 */

export type EquipmentType = {
  deviceId: string;
  name: string;
  sn: string;
  model: string;
  productTypeName: string;
  subsystemName: string;
  childSystem: string;
  siteName: string;
  createTime: string;
  sessionStartTime: string;
  connectStatus: number;
};
