/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 17:11:54
 * @LastEditTime: 2023-06-19 17:11:58
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\stat\ServiceRecord\service.ts
 */
import request, { ResponseCommonData } from '@/utils/request';
import { FaultType, AgentFormType } from './type';

export const getPage = (params: any) => {
  return request(`/oss/site/faultDeclaration/page`, {
    method: 'GET',
    params,
  });
};

export const addData = (data: AgentFormType) => {
  return request(`/oss/site/faultDeclaration`, {
    method: 'POST',
    data,
  });
};

export const getData = (params: any) => {
  return request<ResponseCommonData<FaultType>>(`/oss/site/faultDeclaration`, {
    method: 'GET',
    params,
  });
};
