import type { ServiceParam, ServiceInfo, ServiceUpdateInfo } from './type';
import { del, get, post, put } from '@/utils/request';

export const createService = (data: ServiceParam) => {
  return post(`/uc/ownerOrg`, data);
};

export const getService = (data: { orgId: number }) => {
  return get<ServiceUpdateInfo>(`/uc/ownerOrg`, data);
};

export const updateService = (data: ServiceParam) => {
  return put(`/uc/ownerOrg`, data);
};

export const deleteService = (data: { orgId: number[] }) => {
  return del(`/uc/ownerOrg`, data);
};

export const getServiceList = (params: any) => {
  return get<ServiceInfo[]>(`/uc/ownerOrg/page`, params);
};

export const getServiceId = () => {
  return get<number>(`/uc/ownerOrg/orgId`);
};
