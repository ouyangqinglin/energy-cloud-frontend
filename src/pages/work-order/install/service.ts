import type { InstallListType, InstallOrderUpdateParam, ObstacleReportInfo } from './type';
import { del, get, post, put } from '@/utils/request';

export const createInstallationWorkOrder = (data: InstallOrderUpdateParam) => {
  return post(`/oss/installationWorkOrder/create`, data);
};

export const getInstallationWorkOrder = (data: { id: number }) => {
  return get<ObstacleReportInfo>(`/oss/installationWorkOrder/details`, data);
};

export const updateInstallationWorkOrder = (data = {}) => {
  return put(`/oss/installationWorkOrder/edit`, data);
};

export const deleteInstallationWorkOrder = (data: { id: string }) => {
  return del(`/oss/installationWorkOrder`, data);
};

export const getObstacleReportList = (params: any) => {
  return get<InstallListType[]>(`/oss/installationWorkOrder/list`, params);
};

// export const getServiceId = () => {
//   return get<number>(`/uc/obstacleReport/orgId`);
// };
