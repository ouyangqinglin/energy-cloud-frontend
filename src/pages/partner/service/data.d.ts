/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-24 15:30:42
 * @LastEditTime: 2023-05-24 15:30:46
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\partner\agent\data.d.ts
 */
export type ServiceType = {
  orgId: string;
  orgName: string;
  status: number;
  remark: string;
  createTime: string;
  createByName: string;
  updateTime: string;
  updateBy: string;
};

export type AgentFormType = {
  name: string;
  id: string;
  status: number;
  phone: string;
  service: string;
  remark: string;
};
