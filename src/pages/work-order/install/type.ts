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
  COMPLETE,
  REJECT,
}

export const enum OrderType {
  INSTALL = 0,
  MAINTENANCE,
  REPAIR,
}

export const enum UserType {
  SYSTEM = 0,
  INSTALL,
  YUNYING,
  OWNER,
}

export interface InstallOrderUpdateParam {
  type: number;
  orgId: number;
  userId: number;
  phone: string;
  processTime: number;
  handlerBy: number;
  email: string;
  remark: string;
  address: string;
  timeOfAppointment: string;
}

export interface InstallOrderUpdateInfo {
  id: number;
  type: number;
  name: string;
  service?: any;
  orgId: number;
  orgName: string;
  userId: number;
  userName?: any;
  phone: string;
  timeOfAppointment: string;
  processTime?: any;
  handlerBy: number;
  handlerName?: string;
  email?: any;
  content?: any;
  remark?: any;
  address?: any;
  siteId?: any;
  siteName?: string;
  status: OrderStatus;
  startTime?: any;
  endTime?: any;
  tails: Tail[];
  taskTailId?: any;
  objId?: any;
  createBy: number;
  createTime: string;
  creatName?: any;
  closeTime: string;
  updateBy?: any;
  updateTime: string;
  updateName?: any;
  sourceId?: any;
  site?: any;
  current: number;
  pageSize: number;

  // front end
  serviceProvider: {
    orgId: number;
    orgName: string;
  }[];
  handler: {
    handlerBy: number;
    handlerName: string;
  }[];
  customer: {
    userId: number;
    userName?: string;
  }[];
}

export interface Tail {
  id: number;
  parentId?: any;
  taskId: number;
  name: string;
  description?: any;
  processedBy: number;
  processorName?: any;
  eventId: number;
  picture?: any;
  createTime: string;
}

export interface Installer {
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime?: string;
  remark?: string;
  userId: number;
  orgId: number;
  userName: string;
  nickName: string;
  email: string;
  phone: string;
  sex: string;
  avatar: string;
  password?: any;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate?: any;
  defaultSiteId?: any;
  org: Org;
  roles: Role[];
  roleIds?: any;
  postIds?: any;
  roleId?: any;
  orgType: number;
  sideType?: any;
  createByName?: string;
  updateByName?: string;
  orgName: string;
  siteId?: any;
  admin: boolean;
}

interface Role {
  createBy?: any;
  createTime: string;
  updateBy: string;
  updateTime: string;
  remark: string;
  roleId: number;
  roleName: string;
  roleKey: string;
  roleSort: number;
  dataScope: string;
  menuCheckStrictly: boolean;
  orgCheckStrictly: boolean;
  status: string;
  delFlag: string;
  type: number;
  orgId: number;
  homeMenuId: number;
  orgName?: any;
  flag: boolean;
  menuIds?: any;
  orgIds?: any;
  permissions?: any;
  updateByName?: any;
  admin: boolean;
}

interface Org {
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  remark?: any;
  orgId: number;
  parentId?: any;
  ancestors?: any;
  orgName: string;
  orderNum?: any;
  leader?: any;
  email?: any;
  status?: any;
  delFlag?: any;
  linkman?: any;
  phone?: any;
  landlineNumber?: any;
  address?: any;
  longitude?: any;
  latitude?: any;
  parentName?: any;
  type: number;
}
