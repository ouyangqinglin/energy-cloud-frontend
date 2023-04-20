export interface UserInfo {
  msg: string
  code: number
  permissions: string[]
  roles: string[]
  user: User
}

interface User {
  createBy: string
  createTime: string
  updateBy?: any
  updateTime?: any
  remark: string
  userId: number
  deptId: number
  userName: string
  nickName: string
  email: string
  phonenumber: string
  sex: string
  avatar: string
  password: string
  status: string
  delFlag: string
  loginIp: string
  loginDate: string
  dept: Dept
  roles: Role[]
  roleIds?: any
  postIds?: any
  roleId?: any
  admin: boolean
}

interface Role {
  createBy?: any
  createTime?: any
  updateBy?: any
  updateTime?: any
  remark?: any
  roleId: number
  roleName: string
  roleKey: string
  roleSort: number
  dataScope: string
  menuCheckStrictly: boolean
  deptCheckStrictly: boolean
  status: string
  delFlag?: any
  flag: boolean
  menuIds?: any
  deptIds?: any
  permissions?: any
  admin: boolean
}

interface Dept {
  createBy?: any
  createTime?: any
  updateBy?: any
  updateTime?: any
  remark?: any
  deptId: number
  parentId: number
  ancestors: string
  deptName: string
  orderNum: number
  leader: string
  phone?: any
  email?: any
  status: string
  delFlag?: any
  parentName?: any
  children: any[]
}
