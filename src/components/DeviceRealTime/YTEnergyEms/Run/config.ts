/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 00:28:59
 * @LastEditTime: 2023-10-17 14:31:51
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Ems\Run\config.ts
 */

import type { DetailItem } from '@/components/Detail';
import {
  closeFormat,
  currentFormat,
  modelFormat,
  powerFormat,
  runFormat,
  singleBFormat,
  singleFormat,
  tempFormat,
  voltageFormat,
  systemOperatingModeFormat,
  converterFormat,
  converterStauesFormat,
  batteryWorkFormat,
  batteryWorkingStatusFormat,
} from '@/utils/format';

export const controlItems: DetailItem[] = [
  { label: '系统模式', field: 'sysModel', format: modelFormat },
  { label: 'EMS运行状态', field: 'emsSysStatus', format: runFormat },
  { label: '主接触器状态', field: 'MainContactorStatus', format: closeFormat },
  { label: '气溶胶信号', field: 'AerosolSignal', format: singleBFormat },
  { label: 'BMS急停信号', field: 'BmsStopSignal', format: singleBFormat },
  { label: '电气急停信号', field: 'EmergencyStopSignal', format: singleFormat },
];

export const strategyItems: DetailItem[] = [
  { label: '防逆流阈值', field: 'antiRefluxThreshold', format: powerFormat },
  { label: '变压器最大负荷', field: 'maxLoadOfTransformer', format: powerFormat },
];

export const protectItems: DetailItem[] = [
  { label: '单体最高允许充电电压', field: 'maxAllowableChargingVoltage', format: voltageFormat },
  {
    label: '单体过压故障消除回差值',
    field: 'overVoltageErrorClearDifference',
    format: voltageFormat,
  },
  { label: '单体最低允许充电电压', field: 'minAllowableChargingVoltage', format: voltageFormat },
  {
    label: '单体欠压故障消除回差值',
    field: 'lowVoltageErrorClearDifference',
    format: voltageFormat,
  },
  { label: '单体最高允许温度', field: 'maxAllowableTemperature', format: tempFormat },
  { label: '单体过温故障消除回差值', field: 'overTempErrorClearDifference', format: tempFormat },
  { label: '单体最低允许温度', field: 'minAllowableTemp', format: tempFormat },
  { label: '单体欠温故障消除回差值', field: 'lowTempErrorClearDifference', format: tempFormat },
  { label: '电池组最高允许电压', field: 'maxAllowableVoltageOfBatteryPack', format: voltageFormat },
  {
    label: '电池组过压故障回差值',
    field: 'overVoltageErrorDifferenceOfBatteryPack',
    format: voltageFormat,
  },
  {
    label: '电池组最高允许充电电流',
    field: 'maxAllowableChargingCurrentOfBatteryPack',
    format: currentFormat,
  },
  {
    label: '电池组最高允许放电电流',
    field: 'maxAllowableDischargeCurrentOfBatteryPack',
    format: currentFormat,
  },
];
export const emsOperationItems: DetailItem[] = [
  { label: '系统工作模式', field: 'systemOperatingMode', format: systemOperatingModeFormat },
  { label: '系统工作状态', field: 'emsSysStatus', format: runFormat },
  { label: '变流器工作模式', field: 'converterOperatingMode', format: converterFormat },
  { label: '变流器工作状态', field: 'converterWorkingStatus', format: converterStauesFormat },
  { label: '电池组工作模式', field: 'batteryPackOperatingMode', format: batteryWorkFormat },
  {
    label: '电池组工作状态',
    field: 'batteryPackWorkingStatus',
    format: batteryWorkingStatusFormat,
  },
  { label: '主接触器状态', field: 'MainContactorStatus', format: closeFormat },
  { label: '预充触器状态', field: 'prechargeContactStatus', format: closeFormat },
  { label: '直流断路器状态', field: 'DCCircuitBreakerStatus', format: closeFormat },
  { label: '交流断路器状态 ', field: 'ACCircuitBreakerStatus', format: closeFormat },
  { label: '气溶胶信号', field: 'AerosolSignal', format: singleBFormat },
  { label: 'BMS急停信号', field: 'BmsStopSignal', format: singleBFormat },
  { label: '电气急停信号', field: 'EmergencyStopSignal', format: singleFormat },
];
