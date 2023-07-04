/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 17:11:54
 * @LastEditTime: 2023-06-30 17:04:02
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\stat\ServiceRecord\service.ts
 */
import request from '@/utils/request';
import { ServiceRecordType } from './data';

export const getPage = (params: ServiceRecordType) => {
  return request(`/oss/site/serviceRecord/page`, {
    method: 'GET',
    params,
  });
};

export const getData = (id: string) => {
  return request(`/oss/site/serviceRecord`, {
    method: 'GET',
    params: {
      taskId: id,
    },
  });
};
