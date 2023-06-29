import type { CustomerParam, CustomerInfo, CustomerUpdateInfo, ServiceProviderInfo } from './type';
import { del, get, post, put } from '@/utils/request';
import { RoleInfo } from '../../authority/type';

export const createCustomer = (data: CustomerParam) => {
  return post(`/uc/customerUser`, data);
};

export const getCustomer = (data: { userId: number }) => {
  return get<CustomerUpdateInfo>(`/uc/customerUser`, data);
};

export const updateCustomer = (data: CustomerParam) => {
  return put(`/uc/customerUser`, data);
};

export const deleteCustomer = (data: { userId: number[] }) => {
  return del(`/uc/customerUser`, data);
};

export const getCustomerList = (params: any) => {
  return get<CustomerInfo[]>(`/uc/customerUser/page`, params);
};

export const getRoleListForCurrentUser = () => {
  return get<RoleInfo[]>('/uc/customerUser/role/list');
};

export const getServiceProviderList = (params: any) => {
  return get<ServiceProviderInfo[], 'list'>('/uc/customerUser/serviceProvider/page', params);
};
