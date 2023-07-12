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

export const enum OrderStatus {
  READY = 0,
  DEALING,
  CLOSE,
  REJECT,
}

export interface ObstacleReportInfo {
  title: string;
  // 报障单对应工单状态 0-待处理 1-处理中 2.关闭 3.拒绝处理
  status?: OrderStatus;
  siteId?: any;
  siteName?: any;
  userId: number;
  usetName?: any;
  completeTime?: any;
  service?: any;
  createId: number;
  createTime: string;
  createName?: any;
  updateTime: string;
  updateId: number;
  updateName?: any;
  current: number;
  pageSize: number;
  startTime?: any;
  endTime?: any;
  id: string;
}
