/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-03 10:04:20
 * @LastEditTime: 2023-08-03 10:04:25
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\System\OverviewSetting\service.ts
 */
import request, { ResponseCommonData } from '@/utils/request';
import { EnergyOptionType } from './config';
import { ConfigDataType, getSiteScreenConfig } from '@/services/station';

export const getEnergyList = () => {
  return request<ResponseCommonData<EnergyOptionType[]>>(`/oss/site/energyFlowDiagram/getList`, {
    method: 'GET',
  });
};

export const editData = (data: any) => {
  return request(`/oss/site/energyFlowDiagram/save`, {
    method: 'POST',
    data,
  });
};
