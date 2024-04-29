/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-08 11:05:59
 * @LastEditTime: 2024-04-19 16:20:28
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\components\Power\typing.ts
 */

type ChartDataType = {
  color?: string;
  data?: {
    eventTs: string;
    doubleVal?: number;
  }[];
  total?: number;
};

export type PowerDataType = {
  me?: ChartDataType;
  cs?: ChartDataType;
  load?: ChartDataType;
  mainsUse?: ChartDataType;
  cpCharge?: ChartDataType;
  loadUse?: ChartDataType;
};
