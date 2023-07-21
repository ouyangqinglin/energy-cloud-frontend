/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 00:28:59
 * @LastEditTime: 2023-07-14 00:29:17
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\components\Stack\config.ts
 */

import type { DetailItem } from '@/components/Detail';
import type { ProColumns } from '@ant-design/pro-table';
import {
  chargeFormat,
  closeFormat,
  currentFormat,
  voltageFormat,
  percentageFormat,
  kohmFormat,
  powerHourFormat,
  tempFormat,
  faultFormat,
  fault1Format,
  fault2Format,
  fault3Format,
  singleFormat,
  doorFormat,
} from '@/utils/format';
import { MaxUnitType } from './type';

export const controlItems: DetailItem[] = [
  {
    label: '主接触器状态',
    field: 'MainContactorStatus',
    format: (value) => closeFormat(value),
  },
  {
    label: '预充接触器状态',
    field: 'PrechargeContactorStatus',
    format: (value) => closeFormat(value),
  },
  {
    label: '直流断路器状态',
    field: 'DCCircuitBreakerStatus',
    format: (value) => closeFormat(value),
  },
  {
    label: '交流断路器状态',
    field: 'ACCircuitBreakerStatus',
    format: (value) => closeFormat(value),
  },
  { label: '对外故障', field: 'externalFaultStatus', format: faultFormat },
  { label: '充放电指示', field: 'CADI', format: chargeFormat },
  { label: '一级报警', field: 'firstLevelAlarm', format: fault1Format },
  { label: '二级报警', field: 'secondLevelAlarm', format: fault2Format },
  { label: '三级报警', field: 'threeLevelAlarm', format: fault3Format },
  { label: '气溶胶信号', field: 'AerosolSignal', format: singleFormat },
  { label: 'BMS急停信号', field: 'BmsStopSignal', format: singleFormat },
  { label: '电气急停信号', field: 'EmergencyStopSignal', format: singleFormat },
  { label: '门禁状态', field: 'AccessControlStatus', format: doorFormat },
];

export const protectItems: DetailItem[] = [
  { label: '过充保护', field: 'OverchargeProtection', format: voltageFormat },
  { label: '过充释放', field: 'OverchargeRelease', format: voltageFormat },
  { label: '过放保护', field: 'OverdischargeProtection', format: voltageFormat },
  { label: '过放释放', field: 'Overrelease', format: voltageFormat },
];

export const statusItems: DetailItem[] = [
  { label: '电流', field: 'TotalBatteryCurrent', format: currentFormat },
  { label: '电压', field: 'TotalBatteryVoltage', format: voltageFormat },
  { label: 'SOC', field: 'SOC', format: percentageFormat },
  { label: 'SOH', field: 'SOH', format: percentageFormat },
  { label: '绝缘值', field: 'InsulationValue', format: kohmFormat },
  { label: '正极绝缘值', field: 'PositiveInsulationValue', format: kohmFormat },
  { label: '负极绝缘值', field: 'NegativeInsulationValue', format: kohmFormat },
  { label: '平均电压', field: 'AverageVoltage', format: voltageFormat },
  { label: '预充总压', field: 'TPCP', format: voltageFormat },
];

export const historyItems: DetailItem[] = [
  { label: '单次充电', field: 'LastChargeLevel', format: powerHourFormat },
  { label: '单次放电', field: 'LastDischargeCapacity', format: powerHourFormat },
  { label: '累计充电', field: 'ACC', format: powerHourFormat },
  { label: '累计放电', field: 'ADC', format: powerHourFormat },
  { label: '电池柜开门次数', field: 'NOBCDO' },
];

export const tempItems: DetailItem[] = [
  { label: '平均温度', field: 'AverageTemperature', format: tempFormat },
  { label: '高压箱温度1', field: 'HighPressureBoxTemperature1', format: tempFormat },
  { label: '高压箱温度2', field: 'HighPressureBoxTemperature2', format: tempFormat },
  { label: '高压箱温度3', field: 'HighPressureBoxTemperature3', format: tempFormat },
  { label: '高压箱温度4', field: 'HighPressureBoxTemperature4', format: tempFormat },
];

export const abilityItems: DetailItem[] = [
  { label: '可充电量', field: 'RechargeableCapacity', format: powerHourFormat },
  { label: '可放电量', field: 'DischargeableCapacity', format: powerHourFormat },
  { label: '最大充电电流', field: 'MaximumChargingCurrent', format: currentFormat },
  { label: '最大放电电流', field: 'maximumDischargeCurrent', format: currentFormat },
];

export const maxUnitColumns: ProColumns<MaxUnitType>[] = [
  {
    title: '最高电芯电压（V）',
    dataIndex: 'maxVoltage',
    width: 150,
    ellipsis: true,
  },
  {
    title: '最低电芯电压（V）',
    dataIndex: 'minVoltage',
    width: 150,
    ellipsis: true,
  },
  {
    title: '最高温度点（℃）',
    dataIndex: 'maxTemp',
    width: 150,
    ellipsis: true,
  },
  {
    title: '最低温度点（℃）',
    dataIndex: 'minTemp',
    width: 150,
    ellipsis: true,
  },
];
