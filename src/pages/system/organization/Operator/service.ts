import type { ServiceParam, ServiceInfo, ServiceUpdateInfo, ServiceProviderInfo } from './type';
import { del, get, post, put } from '@/utils/request';

export const createService = (data: ServiceParam) => {
  return post(`/uc/operatorOrg`, data);
};

export const getService = (data: { orgId: number }) => {
  return get<ServiceUpdateInfo>(`/uc/operatorOrg`, data);
};

export const updateService = (data: ServiceParam) => {
  return put(`/uc/operatorOrg`, data);
};

export const deleteService = (data: { orgId: number[] }) => {
  return del(`/uc/operatorOrg`, data);
};

export const getServiceList = (params: any) => {
  return get<ServiceInfo[]>(`/uc/operatorOrg/page`, params);
};

export const getServiceId = () => {
  return get<number>(`/uc/operatorOrg/orgId`);
};

export const getServiceProviderList = (params: any) => {
  return get<ServiceProviderInfo[], 'list'>('/uc/operatorOrg/installer/page', params);
};
