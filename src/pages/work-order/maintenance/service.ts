import type {
  Maintainer,
  MaintenanceListType,
  MaintenanceOrderUpdateParam,
  MaintenanceOrderUpdateInfo,
  SiteInfo,
} from './type';
import { del, get, post, put } from '@/utils/request';

export const createMaintenanceWorkOrder = (data: MaintenanceOrderUpdateParam) => {
  return post(`/oss/maintenanceWorkOrder/create`, data);
};

export const getMaintenanceWorkOrder = (data: { id?: number }) => {
  return get<MaintenanceOrderUpdateInfo>(`/oss/maintenanceWorkOrder/details`, data);
};

export const updateMaintenanceWorkOrder = (data: MaintenanceOrderUpdateParam) => {
  return put(`/oss/maintenanceWorkOrder/edit`, data);
};

export const deleteMaintenanceWorkOrder = (data: { id: number }) => {
  return del(`/oss/maintenanceWorkOrder`, data);
};

export const getMaintenanceWorkOrderList = (params: any) => {
  return get<MaintenanceListType, 'list'>(`/oss/maintenanceWorkOrder/list`, params);
};

export const getInstallerList = (params: any) => {
  return get<Maintainer, 'list'>(`/uc/customerUser/installer/page`, params);
};

export const getCustomerList = (params: any) => {
  return get<Maintainer, 'list'>(`/uc/customerUser/maintainer/user/page`, params);
};

export const getSiteList = (params: any) => {
  return get<SiteInfo[]>(`/uc/site/siteList`, params);
};

export const handleOrderAccept = (params: any = {}) => {
  return put(`/oss/maintenanceWorkOrder/accept`, params);
};

export const handleOrderComplete = (params: any = {}) => {
  return put(`/oss/maintenanceWorkOrder/complete`, params);
};

// export const getServiceId = () => {
//   return get<number>(`/uc/obstacleReport/orgId`);
// };
