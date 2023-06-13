/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-25 10:23:41
 * @LastEditTime: 2023-05-25 10:23:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\alarm\data.d.ts
 */

export type AlarmType = {
  id: string;
  content: string;
  device: string;
  station: string;
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
