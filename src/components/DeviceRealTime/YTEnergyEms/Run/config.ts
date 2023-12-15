/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 00:28:59
 * @LastEditTime: 2023-12-15 09:18:39
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\YTEnergyEms\Run\config.ts
 */

import type { DetailItem } from '@/components/Detail';
import { DeviceTypeEnum } from '@/utils/dictionary';
import {
  closeFormat,
  systemOperatingModeFormat,
  converterFormat,
  converterStauesFormat,
  batteryWorkFormat,
  batteryWorkingStatusFormat,
  systemRunFormat,
  singleEffectFormat,
  openFormat,
} from '@/utils/format';

export const emsOperationItems: DetailItem[] = [
  { label: '系统工作模式', field: 'systemOperatingMode', format: systemOperatingModeFormat },
  { label: '系统工作状态', field: 'systemWorkingStatus', format: systemRunFormat },
  { label: '变流器工作模式', field: 'converterOperatingMode', format: converterFormat },
  { label: '变流器工作状态', field: 'converterWorkingStatus', format: converterStauesFormat },
  { label: '电池组工作模式', field: 'batteryPackOperatingMode', format: batteryWorkFormat },
  {
    label: '电池组工作状态',
    field: 'batteryPackWorkingStatus',
    format: batteryWorkingStatusFormat,
  },
  { label: '主接触器状态', field: 'bmsOpenAndClose', format: closeFormat },
  { label: '预充触器状态', field: 'prechargeContactStatus', format: closeFormat },
  { label: '直流断路器状态', field: 'DCCircuitBreakerStatus', format: closeFormat },
  { label: '交流断路器状态 ', field: 'ACCircuitBreakerStatus', format: openFormat },
  { label: 'BMS急停信号', field: 'BmsStopSignal', format: singleEffectFormat },
  { label: '电气急停信号', field: 'EmergencyStopSignal', format: singleEffectFormat },
  { label: '消防喷射信号', field: 'fsig', format: singleEffectFormat },
];
