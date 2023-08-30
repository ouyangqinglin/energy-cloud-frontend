/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-30 17:51:56
 * @LastEditTime: 2023-08-30 17:52:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteRange\service.ts
 */

import request, { ResponseCommonData } from '@/utils/request';

export type PowerSiteDataType = {
  id?: string;
  name?: string;
  sort?: number;
  mainsElec?: string;
};

export type PowerDataType = {
  name?: string;
  sites?: PowerSiteDataType[];
};

export const getPowerData = () => {
  return request<ResponseCommonData<PowerDataType[]>>(
    `/oss/sitesBigScreen/getIndexSiteRankingMains`,
    {
      method: 'GET',
      params: {
        type: 0,
        code: 100000,
      },
    },
  );
};
