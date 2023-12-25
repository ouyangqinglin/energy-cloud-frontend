/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-31 16:23:48
 * @LastEditTime: 2023-12-22 15:24:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\Community\config.ts
 */

import type { DetailItem } from '@/components/Detail';
import { formatMessage } from '@/utils';

export const accountItem: DetailItem[] = [
  {
    label: 'mqtt' + formatMessage({ id: 'common.userName', defaultMessage: '用户名' }),
    field: 'userName',
  },
  {
    label: 'mqtt' + formatMessage({ id: 'common.password', defaultMessage: '密码' }),
    field: 'a',
    span: 2,
  },
];

export const meterItem: DetailItem[] = [
  {
    label: 'mqtt' + formatMessage({ id: 'common.userName', defaultMessage: '用户名' }),
    field: 'userName',
  },
  { label: 'mqtt' + formatMessage({ id: 'common.password', defaultMessage: '密码' }), field: 'a' },
  {
    label: formatMessage({ id: 'device.currentRatio', defaultMessage: '电流变比' }),
    field: 'currentRatio',
  },
  {
    label: formatMessage({ id: 'device.voltageRatio', defaultMessage: '电压变比' }),
    field: 'voltageRatio',
  },
  {
    label: formatMessage({ id: 'device.electricRatio', defaultMessage: '电能变比' }),
    field: 'energyRatio',
  },
  {
    label: formatMessage({ id: 'device.powerRatio', defaultMessage: '功率变比' }),
    field: 'powerRatio',
  },
];
export const selfEnergyMeterItem: DetailItem[] = [
  {
    label: formatMessage({ id: 'device.currentRatio', defaultMessage: '电流变比' }),
    field: 'currentRatio',
  },
  {
    label: formatMessage({ id: 'device.voltageRatio', defaultMessage: '电压变比' }),
    field: 'voltageRatio',
    span: 2,
  },
];

export const thirtySiteItem: DetailItem[] = [
  {
    label: formatMessage({ id: 'device.thirdPartySite', defaultMessage: '第三方站点' }),
    field: 'thirdSiteName',
  },
];

export const thirtySiteGunItem: DetailItem[] = [
  {
    label: formatMessage({ id: 'device.thirdPartySite', defaultMessage: '第三方站点' }),
    field: 'thirdSiteName',
  },
  {
    label: formatMessage({
      id: 'device.anyChargingGunSequenceCode',
      defaultMessage: '任一充电枪序列码',
    }),
    field: 'anyGnSn',
    span: 2,
  },
];

export const bWattItem: DetailItem[] = [
  {
    label: formatMessage({ id: 'device.item', defaultMessage: '项目' }) + ' ID',
    field: 'projectId',
  },
  { label: 'BMS ID', field: 'bmsId' },
  { label: 'EMS ID', field: 'emsId' },
  { label: 'PCS ID', field: 'pcsId' },
  {
    label: formatMessage({ id: 'device.cellTemperature', defaultMessage: '单体温度' }) + ' ID',
    field: 'temperatureDeviceId',
  },
  {
    label: formatMessage({ id: 'device.cellVoltage', defaultMessage: '单体电压' }) + ' ID',
    field: 'voltageDeviceId',
  },
  {
    label: formatMessage({ id: 'device.airConditioner', defaultMessage: '空调' }) + ' ID',
    field: 'airConditionerId',
  },
  {
    label: formatMessage({ id: 'device.systemClock', defaultMessage: '系统时钟' }) + ' ID',
    field: 'clockDeviceId',
  },
  {
    label:
      formatMessage({ id: 'device.energyConsumptionStatistics', defaultMessage: '能耗统计' }) +
      ' ID',
    field: 'statisticsDeviceId',
  },
  {
    label: formatMessage({ id: 'device.thirdPartySite', defaultMessage: '第三方站点' }),
    field: 'thirdSiteName',
  },
];
