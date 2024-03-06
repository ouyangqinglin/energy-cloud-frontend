/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-06 11:22:32
 * @LastEditTime: 2024-03-06 11:22:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\ChargeStack\service.ts
 */

import request, { ResponseCommonData } from '@/utils/request';
import { PowerDataType } from './typing';

export const getPower = (params: any) => {
  return request<ResponseCommonData<PowerDataType[]>>('/iot/device/es/getPowerCurve', {
    method: 'GET',
    params,
  });
};
