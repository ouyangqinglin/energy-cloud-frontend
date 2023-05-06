/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 13:54:37
 * @LastEditTime: 2023-05-04 13:54:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\data.d.ts
 */

export type EquipmentType = {
  id: string;
  name: string;
  sn: string;
  model: string;
  type: string;
  childSystem: string;
  station: string;
  createTime: string;
  onlineTime: string;
  status: number;
};

export type StationFormType = {
  id?: number;
  name: string;
  addr: string;
  icon: string;
  img: string;
  remark: string;
};
