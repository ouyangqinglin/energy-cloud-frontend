/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 13:54:37
 * @LastEditTime: 2023-05-04 13:54:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\data.d.ts
 */

export type StationType = {
  name: string;
  id: string;
  createTime: string;
  deliveryTime: string;
  country: string;
  province: string;
  city: string;
  serviceCompany: string;
  status: number;
  operator: string;
  updateTime: string;
};

export type StationFormType = {
  id?: number;
  name: string;
  addr: string;
  icon: string;
  img: string;
  remark: string;
};
