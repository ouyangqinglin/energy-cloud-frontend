import type { ObstacleReportInfo } from './type';
import { del, get, post, put } from '@/utils/request';

// export const createObstacleReport = (data: ServiceParam) => {
//   return post(`/oss/obstacleReport`, data);
// };

export const getObstacleReport = (data: { orgId: number }) => {
  return get<ObstacleReportInfo>(`/oss/obstacleReport/detail`, data);
};

// export const updateObstacleReport = (data: ServiceParam) => {
//   return put(`/oss/obstacleReport`, data);
// };

// export const deleteObstacleReport = (data: { orgId: number[] }) => {
//   return del(`/oss/obstacleReport`, data);
// };

export const getObstacleReportList = (params: any) => {
  return get<ObstacleReportInfo[]>(`/oss/obstacleReport/list`, params);
};

// export const getServiceId = () => {
//   return get<number>(`/uc/obstacleReport/orgId`);
// };
