/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 16:42:10
 * @LastEditTime: 2023-06-19 16:42:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\work-order\components\workOrder\data.d copy.ts
 */
export type FaultType = {
  id: string;
  title: string;
  status: number;
  siteName: string;
  userName: string;
  completeTime: string;
  serviceName: string;
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
