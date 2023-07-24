export interface ServiceUpdateInfo {
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime?: any;
  remark: string;
  orgId: number;
  parentId: number;
  ancestors: string;
  orgName: string;
  orderNum: number;
  leader: string;
  phone: string;
  email: string;
  status: string;
  delFlag: string;
  parentName?: any;
  children: any[];
}

export interface ServiceInfo {
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime?: any;
  remark: string;
  orgId: number;
  parentId: number;
  ancestors: string;
  orgName: string;
  orderNum: number;
  leader?: any;
  phone: string;
  email: string;
  status: string;
  delFlag: string;
  parentName?: any;
  type: number;
  types?: any;
  createByName: string;
  children: any[];
}

export interface ServiceParam {
  orgId: string;
  orgName: string;
  phone: string;
  email: string;
  status: string;
  remark: string;
}
