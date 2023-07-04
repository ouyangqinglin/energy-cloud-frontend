/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 14:39:31
 * @LastEditTime: 2023-06-21 14:39:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\device\DeviceList\data.d.ts
 */

export type EquipmentType = {
  deviceId: string;
  name: string;
  sn: string;
  model: string;
  productId: string;
  productTypeName: string;
  subsystemName: string;
  childSystem: string;
  siteName: string;
  createTime: string;
  sessionStartTime: string;
  connectStatus: number;
};
