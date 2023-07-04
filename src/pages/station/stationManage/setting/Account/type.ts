/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 17:22:31
 * @LastEditTime: 2023-07-03 14:54:57
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\Account\type.ts
 */

export type AccountType = {
  siteId?: string;
  userId: string;
  userName: string;
  nickName: string;
  phonenumber: string;
  password: string;
  confirmPassword: string;
  roles: RoleType[];
  roleIds: string[];
  roleId: string;
  status: number;
  remark: string;
  createTime: string;
  createByName: string;
  updateTime: string;
  updateByName: string;
  user: AccountType;
};

export type AgentFormType = {
  name: string;
  id: string;
  status: number;
  phone: string;
  service: string;
  remark: string;
};

export type RoleType = {
  roleId: string;
  roleName: string;
};
