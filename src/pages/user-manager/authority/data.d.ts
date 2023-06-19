/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 14:03:51
 * @LastEditTime: 2023-06-19 14:03:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\user-manager\authority\data.d.ts
 */
export type AuthorityType = {
  roleId: string;
  roleName: string;
  type: number;
  status: number;
  remark: string;
  updateTime: string;
  updateByName: string;
};

export type AgentFormType = {
  name: string;
  id: string;
  status: number;
  phone: string;
  service: string;
  remark: string;
};
