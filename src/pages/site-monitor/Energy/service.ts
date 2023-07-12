/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 11:01:52
 * @LastEditTime: 2023-07-12 11:02:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\service.ts
 */

import request, { ResponseCommonData } from '@/utils/request';
import { statType, searchType, energyType } from './type';
import { requestEmpty } from '@/services';

export const getStat = (params: searchType) => {
  return requestEmpty<statType>();
};

export const getEnergy = (params: searchType) => {
  return requestEmpty<energyType>();
};

export const getPower = (params: searchType) => {
  return requestEmpty<energyType>();
};

export const getElectic = (params: searchType) => {
  return requestEmpty<energyType>();
};
