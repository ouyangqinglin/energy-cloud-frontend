import request from '@/utils/request';

//获取储能历史数据--暂时不传siteId
export const getStorageData = () => {
  return request(`/oss/statistics/custom/jieCheng/getStorageData`, {
    method: 'GET',
  });
};
//获取能耗历史数据--暂时不传siteId
export const getEnergyConsumptionData = () => {
  return request(`/oss/statistics/custom/jieCheng/getEnergyConsumptionData`, {
    method: 'GET',
  });
};
//获取光伏历史数据
export const getPvData = () => {
  return request(`/oss/statistics/custom/jieCheng/getPvData`, {
    method: 'GET',
  });
};
//获取充电桩历史数据
export const getChargePileData = () => {
  return request(`/oss/statistics/custom/jieCheng/getChargePileData`, {
    method: 'GET',
  });
};
//获取所有汇总数据
export const getTotalData = () => {
  return request(`/oss/statistics/custom/jieCheng/getTotalData`, {
    method: 'GET',
  });
};
//获取站点收益数据
export const getSiteIncomeData = () => {
  return request(`/oss/statistics/custom/jieCheng/getSiteIncomeData`, {
    method: 'GET',
  });
};

