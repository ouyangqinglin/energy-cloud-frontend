/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-18 15:07:09
 * @LastEditTime: 2023-08-22 13:38:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\product-manage\ProductDetail\Module\service.ts
 */

import request, { ResponsePageData } from '@/utils/request';
import { ModuleDataType } from './config';

export const getPage = (params: any) => {
  return request<ResponsePageData<ModuleDataType>>(`/iot/productModule/page`, {
    method: 'GET',
    params,
  });
};

export const addData = (data: ModuleDataType) => {
  return request(`/iot/productModule`, {
    method: 'POST',
    data,
  });
};

export const editData = (data: ModuleDataType) => {
  return request(`/iot/productModule`, {
    method: 'PUT',
    data,
  });
};

export const deleteData = (params: any) => {
  return request(`/iot/productModule`, {
    method: 'DELETE',
    params,
  });
};
