import type { ServiceParam, ServiceInfo, ServiceUpdateInfo } from './type';
import { del, get, post, put } from '@/utils/request';

export const createService = (data: ServiceParam) => {
  return post(`/uc/org`, data);
};

export const getService = (data: { orgId: number }) => {
  return get<ServiceUpdateInfo>(`/uc/org`, data);
};

export const updateService = (data: ServiceParam) => {
  return put(`/uc/org`, data);
};

export const deleteService = (data: { orgId: number }) => {
  return del(`/uc/org`, data);
};

export const getServiceList = (params?: any) => {
  return get<ServiceInfo[]>(`/uc/org/list`, params);
};

export const getServiceId = () => {
  return get<number>(`/uc/org/orgId`);
};
