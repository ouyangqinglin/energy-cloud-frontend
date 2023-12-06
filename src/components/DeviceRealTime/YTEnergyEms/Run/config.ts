/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 00:28:59
 * @LastEditTime: 2023-10-17 14:31:51
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Ems\Run\config.ts
 */

import type { DetailItem } from '@/components/Detail';
import { formatMessage } from '@/utils';
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
  systemRunFormat,
} from '@/utils/format';

export const controlItems: DetailItem[] = [
  { label: formatMessage({ id: 'siteMonitor.systemModel', defaultMessage: '系统模式' }), field: 'sysModel', format: modelFormat },
  { label: 'EMS'+formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' }), field: 'emsSysStatus', format: runFormat },
  { label: formatMessage({ id: 'siteMonitor.mainContactorStatus', defaultMessage: '主接触器状态' }), field: 'MainContactorStatus', format: closeFormat },
  { label: formatMessage({ id: 'siteMonitor.aerosolSignal', defaultMessage: '气溶胶信号' }), field: 'AerosolSignal', format: singleBFormat },
  { label: 'BMS'+formatMessage({ id: 'siteMonitor.scramSignal', defaultMessage: '急停信号' }), field: 'BmsStopSignal', format: singleBFormat },
  { label: formatMessage({ id: 'siteMonitor.electricalScramSignal', defaultMessage: '电气急停信号' }), field: 'EmergencyStopSignal', format: singleFormat },
];

export const strategyItems: DetailItem[] = [
  { label: formatMessage({ id: 'device.antiBackflowThreshold', defaultMessage: '防逆流阈值' }), field: 'antiRefluxThreshold', format: powerFormat },
  { label: formatMessage({ id: 'device.maximumLoadOfTransformer', defaultMessage: '变压器最大负荷' }), field: 'maxLoadOfTransformer', format: powerFormat },
];

export const protectItems: DetailItem[] = [
  { label: formatMessage({ id: 'device.singleMaximumChargingVoltage', defaultMessage: '单体最高允许充电电压' }), field: 'maxAllowableChargingVoltage', format: voltageFormat },
  {
    label: formatMessage({ id: 'device.overvoltageOvervoltageEliminationValue', defaultMessage: '单体过压故障消除回差值' }),
    field: 'overVoltageErrorClearDifference',
    format: voltageFormat,
  },
  { label: formatMessage({ id: 'device.singleMinimumChargingVoltage', defaultMessage: '单体最低允许充电电压' }), field: 'minAllowableChargingVoltage', format: voltageFormat },
  {
    label: formatMessage({ id: 'device.overvoltageUndervoltageEliminationValue', defaultMessage: '单体欠压故障消除回差值' }),
    field: 'lowVoltageErrorClearDifference',
    format: voltageFormat,
  },
  { label: formatMessage({ id: 'device.maximumAllowableTemperatureCell', defaultMessage: '单体最高允许温度' }), field: 'maxAllowableTemperature', format: tempFormat },
  { label: formatMessage({ id: 'device.cellOvertemperatureEliminationDifference', defaultMessage: '单体过温故障消除回差值' }), field: 'overTempErrorClearDifference', format: tempFormat },
  { label: formatMessage({ id: 'device.minimumAllowableTemperatureCell', defaultMessage: '单体最低允许温度' }), field: 'minAllowableTemp', format: tempFormat },
  { label: formatMessage({ id: 'device.undertemperatureEliminationDifference', defaultMessage: '单体欠温故障消除回差值' }), field: 'lowTempErrorClearDifference', format: tempFormat },
  { label: formatMessage({ id: 'device.maximumAllowableVoltageBattery', defaultMessage: '电池组最高允许电压' }), field: 'maxAllowableVoltageOfBatteryPack', format: voltageFormat },
  {
    label: formatMessage({ id: 'device.batteryStringOvervoltageErrorDifference', defaultMessage: '电池组过压故障回差值' }),
    field: 'overVoltageErrorDifferenceOfBatteryPack',
    format: voltageFormat,
  },
  {
    label: formatMessage({ id: 'device.maximumAllowableChargingCurrentBattery', defaultMessage: '电池组最高允许充电电流' }),
    field: 'maxAllowableChargingCurrentOfBatteryPack',
    format: currentFormat,
  },
  {
    label: formatMessage({ id: 'device.maximumAllowableDischargingCurrentBattery', defaultMessage: '电池组最高允许放电电流' }),
    field: 'maxAllowableDischargeCurrentOfBatteryPack',
    format: currentFormat,
  },
];
export const emsOperationItems: DetailItem[] = [
  { label: formatMessage({ id: 'device.systemOperatingMode', defaultMessage: '系统工作模式' }), field: 'systemOperatingMode', format: systemOperatingModeFormat },
  { label: formatMessage({ id: 'device.systemOperatingState', defaultMessage: '系统工作状态' }), field: 'systemWorkingStatus', format: systemRunFormat },
  { label: formatMessage({ id: 'device.converterOperatingMode', defaultMessage: '变流器工作模式' }), field: 'converterOperatingMode', format: converterFormat },
  { label: formatMessage({ id: 'device.converterWorkingState', defaultMessage: '变流器工作状态' }), field: 'converterWorkingStatus', format: converterStauesFormat },
  { label: formatMessage({ id: 'device.batteryPackOperatingMode', defaultMessage: '电池组工作模式' }), field: 'batteryPackOperatingMode', format: batteryWorkFormat },
  {
    label: formatMessage({ id: 'device.batteryStringOperatingStatus', defaultMessage: '电池组工作状态' }),
    field: 'batteryPackWorkingStatus',
    format: batteryWorkingStatusFormat,
  },
  { label: formatMessage({ id: 'device.mainContactorStatus', defaultMessage: '主接触器状态' }), field: 'MainContactorStatus', format: closeFormat },
  { label: formatMessage({ id: 'device.prechargedContactStatus', defaultMessage: '预充触器状态' }), field: 'prechargeContactStatus', format: closeFormat },
  { label: formatMessage({ id: 'device.dcCircuitBreakerCondition', defaultMessage: '直流断路器状态' }), field: 'DCCircuitBreakerStatus', format: closeFormat },
  { label: formatMessage({ id: 'device.acCircuitBreakerCondition', defaultMessage: '交流断路器状态' }), field: 'ACCircuitBreakerStatus', format: closeFormat },
  { label: formatMessage({ id: 'siteMonitor.aerosolSignal', defaultMessage: '气溶胶信号' }), field: 'AerosolSignal', format: singleBFormat },
  { label: 'BMS'+formatMessage({ id: 'siteMonitor.scramSignal', defaultMessage: '急停信号' }), field: 'BmsStopSignal', format: singleBFormat },
  { label: formatMessage({ id: 'siteMonitor.electricalScramSignal', defaultMessage: '电气急停信号' }), field: 'EmergencyStopSignal', format: singleFormat },
];
