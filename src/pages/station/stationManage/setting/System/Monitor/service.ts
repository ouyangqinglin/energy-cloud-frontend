/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-02 11:09:29
 * @LastEditTime: 2023-06-02 11:09:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\System\Monitor\service.ts
 */
import request from '@/utils/request';

export const getConfig = (params: any) => {
  return request(`/iot/site/page`, {
    method: 'GET',
    params,
  });
};

export const editStatus = (params: any) => {
  return request(`/iot/siteSystemConfiguration/dataSource/updateFlag`, {
    method: 'PUT',
    params,
  });
};
