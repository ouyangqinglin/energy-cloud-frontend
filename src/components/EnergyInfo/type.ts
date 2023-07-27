/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 11:02:29
 * @LastEditTime: 2023-07-13 18:58:44
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\type.ts
 */

export type ComProps = {
  siteId?: string;
  className?: string;
};

export type searchType = {
  siteId: string;
  date?: string;
  type?: number;
};

export type energyType = {
  id?: string;
  name: string;
  productId: number;
  children?: energyType[];
};

export type PowerType = {
  eventTs: string;
  doubleVal: number;
};

export type ElectricType = {
  charge?: PowerType[];
  discharge?: PowerType[];
};
