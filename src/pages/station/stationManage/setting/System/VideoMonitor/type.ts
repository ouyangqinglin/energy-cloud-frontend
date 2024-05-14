/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-14 11:06:57
 * @LastEditTime: 2024-05-14 14:49:43
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\System\VideoMonitor\type.ts
 */

export type FactoryDataType = {
  id?: number;
  name?: string;
  code?: string;
};

export enum System {
  Android,
  Ios,
}

export type AppDataType = {
  id?: number;
  name?: string;
  sysFlag?: System;
  app?: string;
};
