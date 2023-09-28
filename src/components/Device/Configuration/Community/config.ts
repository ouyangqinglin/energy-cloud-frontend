/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-31 16:23:48
 * @LastEditTime: 2023-08-31 16:23:52
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\Config\config.ts
 */

import type { DetailItem } from '@/components/Detail';

export const accountItem: DetailItem[] = [
  { label: 'mqtt用户名', field: 'userName' },
  { label: 'mqtt密码', field: 'a' },
];

export const meterItem: DetailItem[] = [
  { label: 'mqtt用户名', field: 'userName' },
  { label: 'mqtt密码', field: 'a' },
  { label: '电流变比', field: 'currentRatio' },
  { label: '电压变比', field: 'voltageRatio' },
  { label: '电能变比', field: 'energyRatio' },
  { label: '功率变比', field: 'powerRatio' },
];

export const thirtySiteItem: DetailItem[] = [{ label: '第三方站点', field: 'thirdSiteName' }];

export const thirtySiteGunItem: DetailItem[] = [
  { label: '第三方站点', field: 'thirdSiteName' },
  { label: '任一充电枪序列码', field: 'anyGnSn' },
];

export const bWattItem: DetailItem[] = [
  { label: '项目 ID', field: 'projectId' },
  { label: 'BMS ID', field: 'bmsId' },
  { label: 'EMS ID', field: 'emsId' },
  { label: 'PCS ID', field: 'pcsId' },
  { label: '单体温度 ID', field: 'temperatureDeviceId' },
  { label: '单体电压 ID', field: 'voltageDeviceId' },
  { label: '空调 ID', field: 'airConditionerId' },
  { label: '系统时钟 ID', field: 'clockDeviceId' },
  { label: '能耗统计 ID', field: 'statisticsDeviceId' },
  { label: '第三方站点', field: 'thirdSiteName' },
];
