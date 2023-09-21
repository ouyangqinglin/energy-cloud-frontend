export interface RemoteUpgradeDataRes {
  id: number;
  version: string;
  deviceType: string;
  softwarePackage: string;
  description: string;
  uploadTime: string;
  uploader: string;
}
export type InstallListType = {
  id: number;
  // 时间维度  0日 1月 2年 3总
  type: number;
  name: string;
  // 服务商名字
  service?: string;
  // 组织id
  orgId?: any;
  // 用户id
  userId: number;
  userName?: any;
  // 电话
  userPhone: string;
  // 预约时间
  timeOfAppointment: string;
  // 处理时间
  processTime?: string;
  // 处理人id
  handlerBy: number;
  // 处理人名
  handlerName: string;
  email?: any;
  remark?: any;
  address?: any;
  siteId?: any;
  status: OrderStatus;
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
  parentId: number;
  ancestors: string;
  orgName: string;
  orderNum: number;
  leader?: any;
  phone: string;
  delFlag: string;
  parentName?: any;
  types?: any;
  createByName: string;
  children: any[];
};
export const enum OrderStatus {
  READY = 0,
  DEALING,
  COMPLETE,
  REJECT,
}
