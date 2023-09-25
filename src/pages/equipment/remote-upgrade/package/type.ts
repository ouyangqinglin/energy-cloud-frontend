import type { FormOperations } from '@/components/YTModalForm/typing'

export interface UpdatePackageParam {
  id:number,
  taskName: string;
  packageId: number;
  productType:number;//产品类型id
  productId:number;
  upgradeTime: any;
  upgradeDevice: any;
  type:number;
}
export type FormUpdateBaseProps = {
  visible: boolean;
  onVisibleChange: (state: boolean) => void;
  operations: FormOperations;
  initialValues?: any;
  id?: number;
  onSuccess?: () => void;
};
export interface RemoteUpgradeDataRes {
  id: number;
  version: string;
  deviceType: string;
  softwarePackage: string;
  description: string;
  uploadTime: string;
  uploader: string;
}
export type PackageListType = {
  id: number;
  packageName:string;
  productTypeName:string;
  productModel:string;
  productId:number;
  moduleId:number;
  moduleName:string;
  version:string;
  softwarePackageUrl:string;
  description:string;
  uploadTime:string;
  uploader:string;
  uploaderName:string;
  status:number;
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
  startTime?: any;
  endTime?: any;
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
}

