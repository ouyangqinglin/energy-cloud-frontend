import { del, get, post, put } from '@/utils/request';
import request from '@/utils/request';
import { UpdateTaskParam } from './type';

//升级任务列表
export const getUpgradeTaskList = (params: any) => {
  return request(`/iot/otaUpgrade/list`, {
    method: 'GET',
    params,
  });
};
//获取产品型号
export const getProductSnList = (params: any) => {
  return request(`/iot/product/getProductModel`, {
    method: 'GET',
    params,
  });
};
//获取版本号
export const getVersionList = (params: any) => {
  return request(`/iot/otaPackage/versionListByProductId`, {
    method: 'GET',
    params,
  });
};
//获取模块信息
export const getModuleList = (params: any) => {
  return request(`/iot/productModule/getProductModuleByProductId`, {
    method: 'GET',
    params,
  });
};
//删除升级任务
export const deleteTaskList = (data: { id?: string | number }) => {
  return del(`/iot/otaUpgrade/del`, data);
};

//获取升级包可支持的设备列表
export const getSelectDeviceList = (params: any) => {
  return request(`/iot/otaUpgrade/selectedDevice`, {
    method: 'GET',
    params,
  });
};
//查看详情接口
export const getTaskDetail = (params:any) => {
  return request(`/iot/otaUpgrade/execute/details`, {
    method: 'GET',
    params
  });
};
//获取升级任务详情-编辑接口
export const getEditTaskList = (params: any) => {
  return request(`/iot/otaUpgrade/details`, {
    method: 'GET',
    params,
  });
};
//添加升级任务
export const addTaskList = (data: UpdateTaskParam) => {
  return post(`/iot/otaUpgrade/add`, data);
};
//编辑升级任务
export const updateTaskList = (data: UpdateTaskParam) => {
  return put(`/iot/otaUpgrade/edit`, data);
};



//11111抄表单
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
export const updateInstallationWorkOrder = (data = {}) => {
  return put(`/oss/installationWorkOrder/edit`, data);
};
export const createInstallationWorkOrder = (data: InstallOrderUpdateParam) => {
  return post(`/oss/installationWorkOrder/create`, data);
};
export const getInstallerList = (params: any) => {
  return get<Installer, 'list'>(`/uc/customerUser/installer/page`, params);
};
export const getCustomerList = (params: any) => {
  return get<Installer, 'list'>(`/uc/customerUser/maintainer/user/page`, params);
};
