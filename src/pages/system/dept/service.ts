import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
import type { DeptType, DeptListParams } from './data.d';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

// 查询部门列表
export async function getDeptList(params?: DeptListParams) {
  return request(`/uc/org/list`, {
    method: 'GET',
    params,
  });
}

// 查询部门列表（排除节点）
export function getDeptListExcludeChild(orgId: number) {
  return request(`/uc/org`, {
    method: 'get',
    params: {
      orgId,
    },
  });
}

// 查询部门详细
export function getDept(orgId: number) {
  return request(`/uc/org`, {
    method: 'GET',
    params: {
      orgId,
    },
  });
}

// 新增部门
export async function addDept(params: DeptType) {
  return request('/uc/org', {
    method: 'POST',
    data: params,
  });
}

// 修改部门
export async function updateDept(params: DeptType) {
  return request('/uc/org', {
    method: 'PUT',
    data: params,
  });
}

// 删除部门
export async function removeDept(id: string) {
  return request(`/uc/org`, {
    method: 'DELETE',
    data: {
      orgId: id,
    },
  });
}

// 导出部门
export function exportDept(params?: DeptListParams) {
  return downLoadXlsx(`/system/dept/export`, { params }, `dept_${new Date().getTime()}.xlsx`);
}
