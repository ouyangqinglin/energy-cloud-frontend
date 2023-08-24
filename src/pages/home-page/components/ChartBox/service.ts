import { get } from '@/utils/request';

export const getPVChartData = (params: any) => {
  return get(`/oss/site/index/pv`, { ...params });
};

export const getESChartData = (params: any) => {
  return get(`/oss/site/index/es`, { ...params });
};

export const getEIChartData = (params: any) => {
  return get(`/oss/site/index/income`, { ...params });
};

export const getCSChartData = (params: any) => {
  return get(`/oss/site/index/cs`, { ...params });
};

export const getELECChartData = (params: any) => {
  return get(`/oss/site/index/me`, { ...params });
};
