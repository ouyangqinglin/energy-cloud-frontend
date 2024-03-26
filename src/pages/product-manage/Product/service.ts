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

export const getData = (id: string) => {
  return request(`/iot/product`, {
    method: 'GET',
    params: {
      productId: id,
    },
  });
};
export const importPruductFile = (data: any) => {
  return request('/uc/upload', {
    method: 'POST',
    data,
  });
};
export const updateProductIntroduce = (data: any) => {
  return request('/iot/product/updateProductIntroduce', {
    method: 'POST',
    data,
  });
};
