import { PositionSelectType } from '@/components/PositionSelect';

export interface ServiceUpdateInfo {
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  remark: string;
  orgId: number;
  parentId: number;
  ancestors: string;
  orgName: string;
  orderNum: number;
  leader?: any;
  email?: any;
  status: string;
  delFlag: string;
  linkman: string;
  phone: string;
  landlineNumber: string;
  address: string;
  longitude: number;
  latitude: number;
  parentName?: any;
  type: number;
  orgEfs: OrgEf[];
  orgIcon: any;
  // font end
  addressInfo: PositionSelectType;
}

interface OrgEf {
  orgId: number;
  orgName: string;
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
  orgId: number;
  orgName: string;
  status: string;
  linkman: string;
  phone: string;
  landlineNumber: string;
  address: string;
  longitude: number;
  latitude: number;
  remark: string;
  orgIcon: any;
  // font end
  addressInfo: PositionSelectType;
}

export interface ServiceProviderInfo {
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
