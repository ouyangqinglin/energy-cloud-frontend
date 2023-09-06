/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-05 09:55:20
 * @LastEditTime: 2023-09-05 09:55:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteMap\ProvinceMap\service.ts
 */

import { SiteDataType } from '@/services/station';
import request, { ResponseCommonData } from '@/utils/request';

export const getProvinceData = (params: any) => {
  return request<ResponseCommonData<SiteDataType[]>>(`/oss/sitesBigScreen/siteByCode`, {
    method: 'GET',
    params,
  });
};
