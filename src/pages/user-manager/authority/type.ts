export type RoleParam = {
  roleName: string;
  status: string;
  remark: string;
  roleId?: number;
};

export type RoleInfo = {
  createBy?: any;
  createTime: string;
  updateBy: string;
  updateTime: string;
  remark: string;
  roleId: number;
  roleName: string;
  roleKey?: any;
  roleSort: number;
  dataScope: string;
  menuCheckStrictly: boolean;
  orgCheckStrictly: boolean;
  status: string;
  delFlag: string;
  type: number;
  orgId: number;
  orgName?: any;
  flag: boolean;
  menuIds?: any;
  orgIds?: any;
  permissions?: any;
  updateByName?: any;
  admin: boolean;
};
