import type { ServiceParam, ServiceInfo, ServiceUpdateInfo } from './type';
import { del, get, post, put } from '@/utils/request';

export const createService = (data: ServiceParam) => {
  return post(`/uc/serviceProvider`, data);
};

export const getService = (data: { orgId: number }) => {
  return get<ServiceUpdateInfo>(`/uc/serviceProvider`, data);
};

export const updateService = (data: ServiceParam) => {
  return put(`/uc/serviceProvider`, data);
};

export const deleteService = (data: { orgId: number[] }) => {
  return del(`/uc/serviceProvider`, data);
};

export const getServiceList = (params: any) => {
  return get<ServiceInfo[]>(`/uc/serviceProvider`, params);
};

export const getServiceId = () => {
  return get<number>(`/uc/serviceProvider/orgId`);
};
