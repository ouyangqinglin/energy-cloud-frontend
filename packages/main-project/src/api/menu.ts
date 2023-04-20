import type { RequestCommonRes } from './types'
import type { RouteRecordRaw } from 'vue-router'
import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request<RequestCommonRes<RouteRecordRaw>>({
    url: '/system/menu/getRouters',
    method: 'get'
  })
}
