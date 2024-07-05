/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 14:26:05
 * @LastEditTime: 2023-11-30 15:43:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\equipment-list\service.ts
 */
import request from '@/utils/request';
import { downLoadXlsx } from '@/utils/downloadfile';
import { formatMessage } from '@/utils';

export const getTabs = (params: any) => {
  return request(`/iot/device/summary`, {
    method: 'GET',
    params,
  });
};

export const removeData = (params: any) => {
  return request(`/iot/device`, {
    method: 'DELETE',
    params,
  });
};

export const unbindDevice = (data: any) => {
  return request(`/iot/device/deviceUnbindSite`, {
    method: 'PUT',
    data,
  });
};

export const exportTemp = () => {
  return downLoadXlsx(
    `/iot/device/exportDeviceTemplate`,
    {},
    formatMessage({ id: 'screen.templateImport', defaultMessage: '设备导入模版' }) + '.xlsx',
    'GET',
  );
};
export const importTemp = (data: any) => {
  return request(`/iot/device/excelImportDevice`, {
    method: 'POST',
    data,
  });
};

export const modifySort = (data: any) => {
  return request(`/iot/device/modifySort`, {
    method: 'PUT',
    data,
  });
};
