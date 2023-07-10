import type { RoleInfo } from '../../authority/type';

export type PlatformSearchType = {
  orgId?: string;
  siteId?: string;
};

export type CustomerParam = {
  remark: string;
  orgId: number;
  userName: string;
  nickName: string;
  phonenumber: string;
  password: string;
  status: string;
  roleIds: number[];
  // siteIds: number[];
};

export interface TransformCustomerUpdateInfo extends CustomerInfo {
  password: string;

  // frontend
  serviceProvider: { orgId: number; orgName: string }[];
  rolesMap: { label: string; value: number }[];
}

export interface CustomerUpdateInfo {
  roleIds: number[];
  postIds: number[];
  roles: RoleInfo[];
  user: CustomerInfo;
}

export type CustomerInfo = {
  // 用户账号
  userName: string;
  // 用户名称
  nickName: string;
  // 组织
  org: Org;
  // 服务商名字
  orgName: string;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  remark?: any;
  userId: number;
  orgId: number;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  password?: any;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate?: any;
  roles: RoleInfo[];
  roleIds?: any;
  sites: SiteInfo[];
  postIds?: any;
  roleId?: any;
  orgType?: any;
  createByName: string;
  updateByName: string;
  admin: boolean;
};

export interface SiteInfo {
  id: number;
  name: string;
}

export interface Org {
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
  phone?: any;
  email?: any;
  status?: any;
  delFlag?: any;
  parentName?: any;
  type?: any;
  types?: any;
  children: any[];
  efOrgs: any[];
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

export interface SiteInfo {
  id: number;
  name: string;
}
