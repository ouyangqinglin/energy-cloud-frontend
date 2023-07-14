/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 00:28:59
 * @LastEditTime: 2023-07-14 00:29:17
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\components\Stack\config.ts
 */

import type { DetailItem } from '@/components/Detail';
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

export const controlItems: DetailItem[] = [
  { label: '系统模式', field: 'a' },
  { label: '电气急停信号', field: 'b' },
  { label: 'BMS急停信号', field: 'c' },
  { label: 'BMS主接触器状态', field: 'd' },
  { label: 'PCS通讯状态', field: 'e' },
  { label: 'BMS通讯状态', field: 'f' },
  { label: '电表通讯状态', field: 'g' },
  { label: 'EMS系统状态', field: 'h' },
  { label: '制冷状态', field: 'i' },
  { label: '空调机组运行状态', field: 'z' },
  { label: '气溶胶信号', field: 'j' },
];

export const statusItems: DetailItem[] = [
  { label: '实时运行状态', field: 'a' },
  { label: '充/放电功率', field: 'b' },
  { label: 'SOC', field: 'c' },
  { label: 'SOH', field: 'd' },
  { label: '可充电量', field: 'e' },
  { label: '可放电量', field: 'f' },
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

export const maxUnitItems: DetailItem[] = [
  { label: '最高电芯电压（V）', field: 'a' },
  { label: '最低电芯电压（V）', field: 'b' },
  { label: '最高温度点（℃）', field: 'c' },
  { label: '最低温度点（℃）', field: 'd' },

  { label: '电芯编号', field: 'MaxNOIV' },
  { label: '电芯编号', field: 'MNOIV' },
  { label: '温度点', field: 'MITN' },
  { label: '温度点', field: 'MNOIT' },

  { label: '电压', field: 'MVVOASU' },
  { label: '电压', field: 'MVVOSU' },
  { label: '温度', field: 'MaximumIndividualTemperature' },
  { label: '温度', field: 'LVOMT' },
];
