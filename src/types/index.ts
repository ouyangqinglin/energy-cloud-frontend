/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-22 14:40:55
 * @LastEditTime: 2023-11-22 14:40:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\types\index.ts
 */

export type LocationType<Params = Record<string, any>> = {
  query?: Params;
};

export type OptionType = {
  label: string;
  value: string | number;
  [key: string]: any;
};
