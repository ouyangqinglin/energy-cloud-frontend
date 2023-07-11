import type { RoleParam, RoleInfo } from './type';
import request, { del, get, post, put } from '@/utils/request';

export const createRole = (data: RoleParam) => {
  return post(`/uc/role`, data);
};

export const getRole = (data: { roleId: number }) => {
  return get(`/uc/role`, data);
};

export const updateRole = (data: any) => {
  return put(`/uc/role`, data);
};

export const deleteRole = (data: { roleIds: number[] }) => {
  return del(`/uc/role`, data);
};

export const getRoleList = (params: any) => {
  return get<RoleInfo[]>(`/uc/role/page`, params);
};

export const getEffectMenus = () => {
  return request('/uc/role/menu/roleMenuTreeselect', {
    method: 'GET',
  });
};

export const getSelectMenu = (roleId: number) => {
  return request('/uc/role/menu/checkedKeys', {
    method: 'GET',
    params: {
      roleId,
    },
  });
};
