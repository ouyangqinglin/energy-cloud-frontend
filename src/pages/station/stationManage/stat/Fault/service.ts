/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 17:11:54
 * @LastEditTime: 2023-06-19 17:11:58
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\stat\ServiceRecord\service.ts
 */
import request from '@/utils/request';
import { AgentFormType } from './data';

export const getList = (params: any) => {
  return request(`/agents`, {
    method: 'GET',
    params,
  });
};

export const addData = (data: AgentFormType) => {
  return request(`/station`, {
    method: 'POST',
    data,
  });
};

export const removeData = (id: string) => {
  return request(`/station/${id}`, {
    method: 'DELETE',
  });
};
