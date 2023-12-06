/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-25 10:23:41
 * @LastEditTime: 2023-06-16 16:18:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\alarm\data.d.ts
 */

export type AlarmType = {
  id: string;
  content: string;
  device: string;
  siteId: string;
  siteName: string;
  status: number;
  source: string;
  alarmTime: string;
  recoveryTime: string;
};

export type StationFormType = {
  id?: number;
  name: string;
  addr: string;
  icon: string;
  img: string;
  remark: string;
};

export type AlarmNumType = {
  errorNum: number;
  alarmNum: number;
  warnNum: number;
  infoNum: number;
};

export type TableSearchType = {
  alarmTime?: string[];
};
