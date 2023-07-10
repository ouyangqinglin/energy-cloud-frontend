/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-24 15:30:37
 * @LastEditTime: 2023-07-10 19:33:32
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\work-order\components\workOrder\service.ts
 */
import request from '@/utils/request';
import { AgentFormType } from './data.d';
import { requestEmpty } from '@/services';

export const getPage = (params: any) => {
  return requestEmpty();
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
