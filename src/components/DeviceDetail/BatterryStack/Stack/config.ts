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
} from '@/utils/format';
import { MaxUnitType } from './type';

export const controlItems: DetailItem[] = [
  { label: '充放电状态', field: 'CADI', format: (value) => chargeFormat(value, false) },
  {
    label: '主接触器状态',
    field: 'MainContactorStatus',
    format: (value) => closeFormat(value, false),
  },
  {
    label: '预充接触器状态',
    field: 'PrechargeContactorStatus',
    format: (value) => chargeFormat(value, false),
  },
  {
    label: '直流断路器状态',
    field: 'DCCircuitBreakerStatus',
    format: (value) => chargeFormat(value, false),
  },
  {
    label: '交流断路器状态',
    field: 'ACCircuitBreakerStatus',
    format: (value) => chargeFormat(value, false),
  },
];

export const statusItems: DetailItem[] = [
  { label: '充/放电功率', field: 'a' },
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
