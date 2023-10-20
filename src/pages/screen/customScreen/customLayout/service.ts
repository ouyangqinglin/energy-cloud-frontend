import request from '@/utils/request';

//获取储能历史数据
export const getStorageData = (params: any) => {
  return request(`/statistics/custom/jieCheng/getStorageData`, {
    method: 'GET',
    params,
  });
};

//删除升级包
export const removePackageData = (params: any) => {
  return request(`/iot/otaPackage`, {
    method: 'DELETE',
    params,
  });
};
//新增升级包
export const addPackageData = (params: any) => {
  return request(`/iot/otaPackage`, {
    method: 'post',
    data: params,
  });
};
//编辑升级包
export const editPackageData = (params: any) => {
  return request(`/iot/otaPackage`, {
    method: 'put',
    data: params,
  });
};
//获取升级包可支持的设备列表
export const getSelectDeviceList = (params: any) => {
  return request(`/iot/otaUpgrade/selectedDevice`, {
    method: 'GET',
    params,
  });
};
//获取树形结构数据--站点
export const getStations = (params?: any) => {
  return request(`/oss/site/getList`, {
    method: 'GET',
    params,
  });
};
//上传文件
export const uploadPackageFile = (formData: any) => {
  return request(`/prodApi/uc/upload`, {
    method: 'POST',
    data: formData,
  });
};


