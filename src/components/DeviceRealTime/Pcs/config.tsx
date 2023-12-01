/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:25:54
 * @LastEditTime: 2023-07-25 16:06:40
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\Pcs\config.tsx
 */

import type { DetailItem } from '@/components/Detail';
import { formatMessage } from '@/utils';
import {
  currentFormat,
  voltageFormat,
  tempFormat,
  powerFormat,
  frequencyFormat,
  faultFormat,
  workFormat,
  electricModelFormat,
} from '@/utils/format';

export const runItems: DetailItem[] = [
  {
    label: formatMessage({ id: 'siteMonitor.currentActualChargeDischargeWorkingMode', defaultMessage: '当前实际充放电工作模式'}),
    field: 'CurrentChargingAndDischargingModel',
    format: electricModelFormat,
  },
  { label: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态'}), field: 'WorkStatus', format: workFormat },
  { label: formatMessage({ id: 'siteMonitor.systemFaultWord', defaultMessage: '系统故障字'}), field: 'SystemFault', format: faultFormat },
  { label: formatMessage({ id: 'siteMonitor.hardwareFaultWord', defaultMessage: '硬件故障字'}) + '1', field: 'HardwareFault1', format: faultFormat },
  { label: formatMessage({ id: 'siteMonitor.hardwareFaultWord', defaultMessage: '硬件故障字'}) + '2', field: 'HardwareFault2', format: faultFormat },
  { label: formatMessage({ id: 'siteMonitor.gridFaultWord', defaultMessage: '电网故障字'}), field: 'GridFault', format: faultFormat },
  { label: formatMessage({ id: 'siteMonitor.busFaultWord', defaultMessage: '母线故障字'}), field: 'BusFault', format: faultFormat },
  { label: formatMessage({ id: 'siteMonitor.acCapacitorFaultWord', defaultMessage: '交流电容故障字'}), field: 'AcCapacitorFault', format: faultFormat },
  { label: formatMessage({ id: 'siteMonitor.switchFaultWord', defaultMessage: '开关故障字'}), field: 'SwitchFault', format: faultFormat },
  { label: formatMessage({ id: 'siteMonitor.otherFaultWord', defaultMessage: '其他故障字'}), field: 'OtherFault', format: faultFormat },
];

export const exchargeItems: DetailItem[] = [
  { label: formatMessage({ id: 'siteMonitor.export', defaultMessage: '输出'})  + 'AB' + formatMessage({ id: 'siteMonitor.lineVoltage', defaultMessage: '线电压'}), field: 'Uab', format: voltageFormat },
  { label: formatMessage({ id: 'siteMonitor.export', defaultMessage: '输出'})  + 'BC' + formatMessage({ id: 'siteMonitor.lineVoltage', defaultMessage: '线电压'}), field: 'Ubc', format: voltageFormat },
  { label: formatMessage({ id: 'siteMonitor.export', defaultMessage: '输出'})  + 'CA' + formatMessage({ id: 'siteMonitor.lineVoltage', defaultMessage: '线电压'}), field: 'Uca', format: voltageFormat },
  { label: formatMessage({ id: 'siteMonitor.export', defaultMessage: '输出'}) + 'A' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+ formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压'}), field: 'Ua', format: voltageFormat },
  { label: formatMessage({ id: 'siteMonitor.export', defaultMessage: '输出'}) + 'B' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+ formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压'}), field: 'Ub', format: voltageFormat },
  { label: formatMessage({ id: 'siteMonitor.export', defaultMessage: '输出'}) + 'C' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+ formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压'}), field: 'Uc', format: voltageFormat },
  { label: formatMessage({ id: 'siteMonitor.export', defaultMessage: '输出'}) + 'A' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+ formatMessage({ id: 'siteMonitor.current', defaultMessage: '电流'}), field: 'OutputIa', format: currentFormat },
  { label: formatMessage({ id: 'siteMonitor.export', defaultMessage: '输出'}) + 'B' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+ formatMessage({ id: 'siteMonitor.current', defaultMessage: '电流'}), field: 'OutputIb', format: currentFormat },
  { label: formatMessage({ id: 'siteMonitor.export', defaultMessage: '输出'}) + 'C' + formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+ formatMessage({ id: 'siteMonitor.current', defaultMessage: '电流'}), field: 'OutputIc', format: currentFormat },
  { label: formatMessage({ id: 'siteMonitor.inductance', defaultMessage: '电感'})+'A'+formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+formatMessage({ id: 'siteMonitor.current', defaultMessage: '电流'}), field: 'inductanceIa', format: currentFormat },
  { label: formatMessage({ id: 'siteMonitor.inductance', defaultMessage: '电感'})+'B'+formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+formatMessage({ id: 'siteMonitor.current', defaultMessage: '电流'}), field: 'inductanceIb', format: currentFormat },
  { label: formatMessage({ id: 'siteMonitor.inductance', defaultMessage: '电感'})+'C'+formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+formatMessage({ id: 'siteMonitor.current', defaultMessage: '电流'}), field: 'inductanceIc', format: currentFormat },
  { label: formatMessage({ id: 'siteMonitor.alternating', defaultMessage: '交流'})+'A'+formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+formatMessage({ id: 'siteMonitor.activePower', defaultMessage: '有功功率'}), field: 'Pa', format: powerFormat },
  { label: formatMessage({ id: 'siteMonitor.alternating', defaultMessage: '交流'})+'B'+formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+formatMessage({ id: 'siteMonitor.activePower', defaultMessage: '有功功率'}), field: 'Pb', format: powerFormat },
  { label: formatMessage({ id: 'siteMonitor.alternating', defaultMessage: '交流'})+'C'+formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+formatMessage({ id: 'siteMonitor.activePower', defaultMessage: '有功功率'}), field: 'Pc', format: powerFormat },
  { label: formatMessage({ id: 'siteMonitor.alternating', defaultMessage: '交流'})+'A'+formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+formatMessage({ id: 'siteMonitor.apparentPower', defaultMessage: '视在功率'}), field: 'Sa', format: powerFormat },
  { label: formatMessage({ id: 'siteMonitor.alternating', defaultMessage: '交流'})+'B'+formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+formatMessage({ id: 'siteMonitor.apparentPower', defaultMessage: '视在功率'}), field: 'Sb', format: powerFormat },
  { label: formatMessage({ id: 'siteMonitor.alternating', defaultMessage: '交流'})+'C'+formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+formatMessage({ id: 'siteMonitor.apparentPower', defaultMessage: '视在功率'}), field: 'Sc', format: powerFormat },
  { label: formatMessage({ id: 'siteMonitor.alternating', defaultMessage: '交流'})+'A'+formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+formatMessage({ id: 'siteMonitor.reactivePower', defaultMessage: '无功功率'}), field: 'Qa', format: powerFormat },
  { label: formatMessage({ id: 'siteMonitor.alternating', defaultMessage: '交流'})+'B'+formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+formatMessage({ id: 'siteMonitor.reactivePower', defaultMessage: '无功功率'}), field: 'Qb', format: powerFormat },
  { label: formatMessage({ id: 'siteMonitor.alternating', defaultMessage: '交流'})+'C'+formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相'})+formatMessage({ id: 'siteMonitor.reactivePower', defaultMessage: '无功功率'}), field: 'Qc', format: powerFormat },
  { label: formatMessage({ id: 'siteMonitor.acOutputTotalActivePower', defaultMessage: '交流输出总有功功率'}), field: 'P', format: powerFormat },
  { label: formatMessage({ id: 'siteMonitor.acOutputTotalReactivePower', defaultMessage: '交流输出总无功功率'}), field: 'Q', format: powerFormat },
  { label: formatMessage({ id: 'siteMonitor.acOutputTotalApparentPower', defaultMessage: '交流输出总视在功率'}), field: 'S', format: powerFormat },
  { label: formatMessage({ id: 'siteMonitor.gridFrequency', defaultMessage: '电网频率'}), field: 'Freq', format: frequencyFormat },
  { label: formatMessage({ id: 'siteMonitor.currentPhasePowerGrid', defaultMessage: '电网当前相序'}), field: 'GridPhaseSequence' },
  { label: formatMessage({ id: 'siteMonitor.acPowerFactor', defaultMessage: '交流功率因数'}), field: 'COS' },
];

export const directCurrentItems: DetailItem[] = [
  { label: formatMessage({ id: 'siteMonitor.totalBusVoltage', defaultMessage: '总母线电压' }), field: 'totalBusVoltage', format: voltageFormat },
  { label: formatMessage({ id: 'siteMonitor.positiveBusVoltage', defaultMessage: '正母线电压' }), field: 'positiveBusVoltage', format: voltageFormat },
  { label: formatMessage({ id: 'siteMonitor.negativeBusVoltage', defaultMessage: '负母线电压' }), field: 'negativeBusVoltage', format: voltageFormat },
  { label: formatMessage({ id: 'siteMonitor.batteryVoltage', defaultMessage: '电池电压' }), field: 'BatteryVoltage', format: voltageFormat },
  { label: formatMessage({ id: 'siteMonitor.batteryCurrent', defaultMessage: '电池电流' }), field: 'batteryCurrent', format: currentFormat },
  { label: formatMessage({ id: 'siteMonitor.dcPower', defaultMessage: '直流功率' }), field: 'PDC', format: powerFormat },
  { label: formatMessage({ id: 'siteMonitor.totalDcCurrent', defaultMessage: '直流总电流' }), field: 'TotalDcI', format: currentFormat },
];

export const tempItems: DetailItem[] = [
  { label: formatMessage({ id: 'siteMonitor.ambientTemperature', defaultMessage: '环境温度' }), field: 'EnvironmentTemperature', format: tempFormat },
  { label: 'IGBT' + formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度'}), field: 'IgbtTemperature', format: tempFormat },
  { label: formatMessage({ id: 'siteMonitor.inductanceTemperature', defaultMessage: '电感温度' }), field: 'InductanceTemperature', format: tempFormat },
];

export const versionItems: DetailItem[] = [
  { label: 'DSP-V' + formatMessage({ id: 'siteMonitor.versions', defaultMessage: '版本'}), field: 'DspVVersion' },
  { label: 'DSP-B' + formatMessage({ id: 'siteMonitor.versions', defaultMessage: '版本'}), field: 'DspBVersion' },
  { label: 'DSP-D' + formatMessage({ id: 'siteMonitor.versions', defaultMessage: '版本'}), field: 'DspDVersion' },
  { label: 'CPLD-V' + formatMessage({ id: 'siteMonitor.versions', defaultMessage: '版本'}), field: 'CpldVVersion' },
  { label: 'CPLD-B' + formatMessage({ id: 'siteMonitor.versions', defaultMessage: '版本'}), field: 'CpldBVersion' },
  { label: 'CPLD-D' + formatMessage({ id: 'siteMonitor.versions', defaultMessage: '版本'}), field: 'CpldDVersion' },
];
