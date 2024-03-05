import type { MaintenanceOrderUpdateInfo, MaintenanceOrderUpdateParam } from '../maintenance/type';
import type { ObstacleReportInfo } from './type';
import { get, post, put } from '@/utils/request';

// export const createObstacleReport = (data: ServiceParam) => {
//   return post(`/oss/obstacleReport`, data);
// };

export const getObstacleReport = (data: { faultId: number }) => {
  return get<ObstacleReportInfo>(`/oss/obstacleReport/detail`, data);
};

export const updateObstacleReportStatus = (data = {}) => {
  return post(`/oss/obstacleReport`, data);
};

// export const deleteObstacleReport = (data: { orgId: number[] }) => {
//   return del(`/oss/obstacleReport`, data);
// };

export const getObstacleReportList = (params: any) => {
  return get<ObstacleReportInfo[]>(`/oss/obstacleReport/list`, params);
};

export const handleOrderComplete = (params: any = {}) => {
  return put(`/oss/obstacleReport/complete`, params);
};

export const getMaintenanceWorkOrder = (data: { id?: number }) => {
  return get<MaintenanceOrderUpdateInfo>(`/oss/maintenanceWorkOrder/details`, data);
};
export const updateMaintenanceWorkOrder = (data: MaintenanceOrderUpdateParam) => {
  return put(`/oss/maintenanceWorkOrder/edit`, data);
};
export const createMaintenance = (data: MaintenanceOrderUpdateParam) => {
  return post(`/oss/obstacleReport/createMaintenance`, data);
};
