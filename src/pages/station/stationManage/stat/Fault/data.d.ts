/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 17:22:31
 * @LastEditTime: 2023-06-19 17:22:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\stat\Fault\data.d.ts
 */
export type FaultType = {
  id: string;
  faultTitle: number;
  faultDescription: string;
  currentProgress: string;
  createTime: string;
  endTime: string;
};

export type AgentFormType = {
  name: string;
  id: string;
  status: number;
  phone: string;
  service: string;
  remark: string;
};
