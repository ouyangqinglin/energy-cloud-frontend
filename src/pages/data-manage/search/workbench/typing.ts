/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-10 16:31:19
 * @LastEditTime: 2023-10-10 16:31:19
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\workbench\typing.ts
 */

export type SearchType = {
  date: string[];
};

export type CollectionDataType = {
  id?: string;
  name?: string;
  paramCode?: string;
  paramName?: string;
  tree?: {
    id?: string;
    siteId?: string;
    siteName?: string;
    deviceName?: string;
    productId?: string;
  };
};

export type CollectionSearchType = {
  collection?: CollectionDataType[];
};
