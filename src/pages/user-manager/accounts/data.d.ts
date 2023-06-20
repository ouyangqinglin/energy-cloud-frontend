/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 13:54:37
 * @LastEditTime: 2023-05-04 13:54:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\data.d.ts
 */

export type AccountListDataType = {
  id: string;
  account: string;
  userName: string;
  roles: string;
  phone: string;
  serviceOrganization: string;
  status: number;
  note: string;
  updateTime: string;
  createTime: string;
  creator: string;
  operator: string;
};

export type CustomerInfo = {
  provider: string;
  account: string;
  userName: string;
  phone: string;
  roles: string;
  status: number;
  password: string;
  note: string;
};
