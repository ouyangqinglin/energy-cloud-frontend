import type {
  CustomerParam,
  CustomerInfo,
  CustomerUpdateInfo,
  ServiceProviderInfo,
  SiteInfo,
} from './type';
import { del, get, post, put } from '@/utils/request';
import type { RoleInfo } from '../../authority/type';

export const createCustomer = (data: CustomerParam) => {
  return post(`/uc/platformUser`, data);
};

export const getCustomer = (data: { userId?: number } = {}) => {
  return get<CustomerUpdateInfo>(`/uc/platformUser`, data);
};

export const updateCustomer = (data: CustomerParam) => {
  return put(`/uc/platformUser`, data);
};

export const deleteCustomer = (data: { userId: number[] }) => {
  return del(`/uc/platformUser`, data);
};

export const getList = (params: any) => {
  return get<CustomerInfo[]>(`/uc/platformUser/page`, params);
};

export const getRoleListForCurrentUser = () => {
  return get<RoleInfo[]>('/uc/customerUser/role/list');
};

export const getServiceProviderList = (params: any) => {
  return get<ServiceProviderInfo[], 'list'>('/uc/customerUser/serviceProvider/page', params);
};

export const getSiteList = (params: { orgId: number; siteName: string }) => {
  return get<SiteInfo[], 'list'>('/uc/customerUser/site/page', params);
};
