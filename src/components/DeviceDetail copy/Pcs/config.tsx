/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:25:54
 * @LastEditTime: 2023-07-14 14:25:58
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\EnergyConverter\config.tsx
 */

import type { DetailItem } from '@/components/Detail';
import {
  currentFormat,
  voltageFormat,
  tempFormat,
  powerFormat,
  frequencyFormat,
  faultFormat,
  workFormat,
  electricModel,
} from '@/utils/format';

export const runItems: DetailItem[] = [
  {
    label: '当前实际充放电工作模式',
    field: 'CurrentChargingAndDischargingModel',
    format: electricModel,
  },
  { label: '工作状态', field: 'WorkStatus', format: workFormat },
  { label: '系统故障字', field: 'SystemFault', format: faultFormat },
  { label: '硬件故障字1', field: 'HardwareFault1', format: faultFormat },
  { label: '硬件故障字2', field: 'HardwareFault2', format: faultFormat },
  { label: '电网故障字', field: 'GridFault', format: faultFormat },
  { label: '母线故障字', field: 'BusFault', format: faultFormat },
  { label: '交流电容故障字', field: 'AcCapacitorFault', format: faultFormat },
  { label: '开关故障字', field: 'SwitchFault', format: faultFormat },
  { label: '其他故障字', field: 'OtherFault', format: faultFormat },
];

export const exchargeItems: DetailItem[] = [
  { label: '输出AB线电压', field: 'Uab', format: voltageFormat },
  { label: '输出BC线电压', field: 'Ubc', format: voltageFormat },
  { label: '输出CA线电压', field: 'Uca', format: voltageFormat },
  { label: '输出A相电压', field: 'Ua', format: voltageFormat },
  { label: '输出B相电压', field: 'Ub', format: voltageFormat },
  { label: '输出C相电压', field: 'Uc', format: voltageFormat },
  { label: '输出A相电流', field: 'OutputIa', format: currentFormat },
  { label: '输出B相电流', field: 'OutputIb', format: currentFormat },
  { label: '输出C相电流', field: 'OutputIc', format: currentFormat },
  { label: '电感A相电流', field: 'inductanceIa', format: currentFormat },
  { label: '电感B相电流', field: 'inductanceIb', format: currentFormat },
  { label: '电感C相电流', field: 'inductanceIc', format: currentFormat },
  { label: '电网频率', field: 'Freq', format: frequencyFormat },
  { label: '电网当前相序', field: 'GridPhaseSequence' },
  { label: '交流A相有功功率', field: 'Pa', format: powerFormat },
  { label: '交流B相有功功率', field: 'Pb', format: powerFormat },
  { label: '交流C相有功功率', field: 'Pc', format: powerFormat },
  { label: '交流A相视在功率', field: 'Sa', format: powerFormat },
  { label: '交流B相视在功率', field: 'Sb', format: powerFormat },
  { label: '交流C相视在功率', field: 'Sc', format: powerFormat },
  { label: '交流A相无功功率', field: 'Qa', format: powerFormat },
  { label: '交流B相无功功率', field: 'Qb', format: powerFormat },
  { label: '交流C相无功功率', field: 'Qc', format: powerFormat },
  { label: '交流输出总有功功率', field: 'P', format: powerFormat },
  { label: '交流输出总无功功率', field: 'Q', format: powerFormat },
  { label: '交流输出总视在功率', field: 'S', format: powerFormat },
  { label: '交流功率因数', field: 'COS' },
];

export const directCurrentItems: DetailItem[] = [
  { label: '总母线电压', field: 'totalBusVoltage', format: voltageFormat },
  { label: '正母线电压', field: 'positiveBusVoltage', format: voltageFormat },
  { label: '负母线电压', field: 'negativeBusVoltage', format: voltageFormat },
  { label: '电池电压', field: 'BatteryVoltage', format: voltageFormat },
  { label: '电池电流', field: 'batteryCurrent', format: currentFormat },
  { label: '直流功率', field: 'PDC', format: powerFormat },
];

export const tempItems: DetailItem[] = [
  { label: '环境温度', field: 'EnvironmentTemperature', format: tempFormat },
  { label: 'IGBT温度', field: 'IgbtTemperature', format: tempFormat },
  { label: '电感温度', field: 'InductanceTemperature', format: tempFormat },
];

export const versionItems: DetailItem[] = [
  { label: 'DSP-V版本', field: 'DspVVersion' },
  { label: 'DSP-B版本', field: 'DspBVersion' },
  { label: 'DSP-D版本', field: 'DspDVersion' },
  { label: 'CPLD-V版本', field: 'CpldVVersion' },
  { label: 'CPLD-B版本', field: 'CpldBVersion' },
  { label: 'CPLD-D版本', field: 'CpldDVersion' },
];
