import type { ObstacleReportInfo } from './type';
import { del, get, post, put } from '@/utils/request';

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

// export const getServiceId = () => {
//   return get<number>(`/uc/obstacleReport/orgId`);
// };
