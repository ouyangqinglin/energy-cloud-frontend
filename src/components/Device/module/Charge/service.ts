/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-05 14:56:41
 * @LastEditTime: 2024-03-05 14:56:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\Charge\service.ts
 */

import request, { ResponseCommonData } from '@/utils/request';
import { PowerDataType } from './typing';

export const getPower = (params: any) => {
  return request<ResponseCommonData<PowerDataType[]>>('/iot/device/es/getPowerCurve', {
    method: 'GET',
    params,
  });
};
