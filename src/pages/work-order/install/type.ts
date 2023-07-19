export type InstallListType = {
  id: number;
  type: number;
  name: string;
  service?: any;
  orgId?: any;
  userId: number;
  userName?: any;
  userPhone: string;
  timeOfAppointment: string;
  processTime?: any;
  handlerBy: number;
  handlerName: string;
  email?: any;
  remark?: any;
  address?: any;
  siteId?: any;
  status: number;
  startTime?: any;
  endTime?: any;
  tails?: any;
  taskTailId?: any;
  objId: number;
  createBy: number;
  createTime: string;
  creatName: string;
  closeTime: string;
  updateBy: number;
  updateTime: string;
  updateName: string;
  sourceId?: any;
  site?: any;
  current: number;
  pageSize: number;
};

export interface InstallOrderUpdateParam {
  type: number;
  orgId: number;
  userId: number;
  phone: number;
  processTime: number;
  handlerBy: number;
  email: string;
  remark: string;
  address: string;
  timeOfAppointment: string;
}

export interface InstallOrderUpdateInfo {
  taskId?: any;
  id: number;
  type: number;
  name: string;
  agent?: any;
  customer?: any;
  telephone?: any;
  timeOfAppointment?: any;
  processTime?: any;
  handlerBy: number;
  email?: any;
  remark?: any;
  address?: any;
  siteId?: any;
  status: number;
  startTime?: any;
  endTime?: any;
  tails: any[];
  taskTailId?: any;
  objId?: any;
  createBy: number;
  createTime: string;
  creatName: string;
  closeTime?: any;
  updateBy?: any;
  updateTime: string;
  updateName: string;
  sourceId?: any;
  current: number;
  pageSize: number;
}

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

export const enum OrderType {
  INSTALL = 0,
  MAINTENANCE,
  REPAIR,
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
