/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 00:28:59
 * @LastEditTime: 2023-12-06 10:10:53
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\BatterryStack\Stack\config.ts
 */

import type { DetailItem } from '@/components/Detail';
import type { ProColumns } from '@ant-design/pro-components';
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
  singleFormat,
  doorFormat,
  externalFaultFormat,
  hydrogenFormat,
  contactorFormat,
  alarmArrFormat,
} from '@/utils/format';
import { MaxUnitType } from './type';

export const controlItemsOne: DetailItem[] = [
  {
    label: '预充接触器状态',
    field: 'PrechargeContactorStatus',
    format: closeFormat,
  },
  {
    label: '直流断路器状态',
    field: 'DCCircuitBreakerStatus',
    format: closeFormat,
  },
  {
    label: '交流断路器状态',
    field: 'ACCircuitBreakerStatus',
    format: closeFormat,
  },
];

export const controlItemsMain: DetailItem[] = [
  { label: '主接触器状态', field: 'contactorStatus', format: contactorFormat },
];

export const controlItemsMainYT: DetailItem[] = [
  { label: '主接触器状态', field: 'bmsOpenAndClose', format: closeFormat },
];

export const controlItemsTow: DetailItem[] = [
  { label: '对外故障', field: 'externalFaultStatus', format: externalFaultFormat },
  { label: '充放电指示', field: 'CADI', format: chargeFormat },
  { label: '一级报警', field: 'firstLevelAlarm', format: alarmArrFormat },
  { label: '二级报警', field: 'secondLevelAlarm', format: alarmArrFormat },
  { label: '三级报警', field: 'threeLevelAlarm', format: alarmArrFormat },
];

export const statusItemsOne: DetailItem[] = [
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

export const statusItemsH2: DetailItem[] = [
  { label: '氢气浓度', field: 'HydrogenConcentration', format: hydrogenFormat },
];

export const statusItemsTow: DetailItem[] = [
  { label: 'BMU1-10通信状态', field: 'BMU1CS', format: faultFormat },
  { label: '门禁状态', field: 'AccessControlStatus', format: doorFormat },
];

export const statusItemsWaterMine: DetailItem[] = [
  { label: '水浸信号', field: 'waterImmersionSignal', format: faultFormat },
  { label: '交流防雷器故障', field: 'aCLightningArresterFailure', format: faultFormat },
  {
    label: '隔开开关异常断开',
    field: 'abnormalDisconnectionOfTheIsolationSwitch',
    format: faultFormat,
  },
];

export const historyItems: DetailItem[] = [
  { label: '单次充电量', field: 'LastChargeLevel', format: powerHourFormat },
  { label: '单次放电量', field: 'LastDischargeCapacity', format: powerHourFormat },
  { label: '累计充电量', field: 'ACC', format: powerHourFormat },
  { label: '累计放电量', field: 'ADC', format: powerHourFormat },
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
