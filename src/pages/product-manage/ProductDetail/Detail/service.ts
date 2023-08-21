/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-21 09:40:34
 * @LastEditTime: 2023-08-21 09:40:38
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\product-manage\ProductDetail\Detail\service.ts
 */

import request, { ResponseCommonData } from '@/utils/request';
import { CollectionDataType } from './config';

export const getCollection = (id: string) => {
  return request<ResponseCommonData<CollectionDataType>>(`/iot/model/getThingsModeByProductId`, {
    method: 'GET',
    params: {
      productId: id,
    },
  });
};
