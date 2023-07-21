/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 00:28:59
 * @LastEditTime: 2023-07-20 15:47:15
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\Ems\Run\config.ts
 */

import type { DetailItem } from '@/components/Detail';
import { closeFormat, modelFormat, runFormat, singleFormat, voltageFormat } from '@/utils/format';

export const controlItems: DetailItem[] = [
  { label: '系统模式', field: 'sysModel', format: modelFormat },
  { label: 'EMS运行状态', field: 'emsSysStatus', format: runFormat },
  {
    label: '主接触器状态',
    field: 'MainContactorStatus',
    format: (value) => closeFormat(value),
  },
  { label: '气溶胶信号', field: 'AerosolSignal', format: singleFormat },
  { label: 'BMS急停信号', field: 'BmsStopSignal', format: singleFormat },
  { label: '电气急停信号', field: 'EmergencyStopSignal', format: singleFormat },
];

export const protectItems: DetailItem[] = [
  { label: '过充保护', field: 'OverchargeProtection', format: voltageFormat },
  { label: '过充释放', field: 'OverchargeRelease', format: voltageFormat },
  { label: '过放保护', field: 'OverdischargeProtection', format: voltageFormat },
  { label: '过放释放', field: 'Overrelease', format: voltageFormat },
];
