/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-17 17:00:18
 * @LastEditTime: 2023-08-17 17:00:18
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\product-manage\Product\service.ts
 */

import request, { ResponsePageData } from '@/utils/request';
import { ProductDataType } from './config';

export const getPage = (params: any) => {
  return request<ResponsePageData<ProductDataType>>(`/iot/product/page`, {
    method: 'GET',
    params,
  });
};
