/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 13:54:37
 * @LastEditTime: 2023-06-27 19:36:28
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\equipment-list\data.d.ts
 */

export type EquipmentType = {
  deviceId: string;
  name: string;
  sn: string;
  model: string;
  productId: number;
  productTypeName: string;
  subsystemName: string;
  childSystem: string;
  siteName: string;
  createTime: string;
  sessionStartTime: string;
  connectStatus: number;
};
