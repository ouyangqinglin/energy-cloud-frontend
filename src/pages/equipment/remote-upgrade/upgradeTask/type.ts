export interface UpdateTaskParam {
  upgradeDeviceDetailList: any;
  signature: any;
  id: number;
  version: string;
  taskName: string;
  packageId: number;
  productType: number; //产品类型id
  productTypeName: string; //产品类型名称
  productId: number;
  productModel: any;
  moduleId: number;
  moduleName: string;
  upgradeTime: any;
  upgradeDevice: any;
  type: any;
  status: any;
  description: string;
  upgradeDeviceVersionDetailList: any;
  softwarePackageUrl: string;
  platform: any;
  selectDevice: boolean;
  selectVersion: boolean;
  upgradableVersion: any;
  productTypeId: any;
  softwareList: any;
}
export interface UpgradeListType {
  id: number;
  productModel: string;
  version: string;
  packageName: string;
  moduleName: string;
  productTypeName: string;
  taskName: string;
  createTime: string;
  upgradeTime: string;
  updater: string;
  updateBy: string;
  status: number;
  type: number;
}
export interface SelectedDeviceType {
  deviceId: number;
  siteId: number;
  deviceName: string;
  siteName: string;
  deviceSn: string;
  version: string;
}

//抄11111
import type { FormOperations } from '@/components/YTModalForm/typing';

export type FormUpdateBaseProps = {
  visible: boolean;
  onVisibleChange: (state: boolean) => void;
  operations: FormOperations;
  initialValues?: any;
  id?: number;
  onSuccess?: () => void;
};
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
  status?: any;
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
