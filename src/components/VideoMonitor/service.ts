/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-14 16:50:15
 * @LastEditTime: 2024-05-14 16:50:15
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\VideoMonitor\service.ts
 */

import request from '@/utils/request';
import { AccessTokenDataType } from './type';

export const getAccessToken = (data: any) => {
  return request<AccessTokenDataType>(`https://ghdopen.hikyun.com/artemis/oauth/token`, {
    method: 'post',
    data,
    showMessage: false,
  });
};
