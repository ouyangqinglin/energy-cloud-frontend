/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-06-28 15:29:22
 * @LastEditTime: 2024-06-28 15:40:58
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\refresh\service.ts
 */
import request from '@/utils/request';

export const exportDataType = () => {
  return request(`/iot/model/exportDomainDataType`, {
    method: 'get',
    params: {
      convertType: 1,
    },
    responseType: 'blob',
  });
};
