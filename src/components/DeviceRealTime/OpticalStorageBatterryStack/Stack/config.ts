/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 00:28:59
 * @LastEditTime: 2023-07-25 16:53:16
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\BatterryStack\Stack\config.ts
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
  fault1Format,
  fault2Format,
  fault3Format,
  doorFormat,
  abnormalFormat,
  externalFaultFormat,
  hydrogenFormat,
  contactorFormat,
  runStateFormat,
} from '@/utils/format';
import { MaxUnitType } from './type';
import { formatMessage } from '@/utils';

export const controlItems: DetailItem[] = [
  {
    label: formatMessage({
      id: 'siteMonitor.prechargeContactorStatus',
      defaultMessage: '预充接触器状态',
    }),
    field: 'PrechargeContactorStatus',
    format: closeFormat,
  },
  {
    label: formatMessage({
      id: 'siteMonitor.dcCircuitBreakerStatus',
      defaultMessage: '直流断路器状态',
    }),
    field: 'DCCircuitBreakerStatus',
    format: closeFormat,
  },
  {
    label: formatMessage({
      id: 'siteMonitor.acCircuitBreakerStatus',
      defaultMessage: '交流断路器状态',
    }),
    field: 'ACCircuitBreakerStatus',
    format: closeFormat,
  },
  {
    label: formatMessage({ id: 'siteMonitor.contactorStatus', defaultMessage: '接触器状态' }),
    field: 'contactorStatus',
    format: contactorFormat,
  },
  {
    label: formatMessage({ id: 'siteMonitor.externalFaultStatus', defaultMessage: '对外故障' }),
    field: 'externalFaultStatus',
    format: externalFaultFormat,
  },
  {
    label: formatMessage({
      id: 'siteMonitor.chargeDischargeIndication',
      defaultMessage: '充放电指示',
    }),
    field: 'CADI',
    format: chargeFormat,
  },
  {
    label: formatMessage({ id: 'siteMonitor.firstLevelAlarm', defaultMessage: '一级报警' }),
    field: 'firstLevelAlarm',
    format: fault1Format,
  },
  {
    label: formatMessage({ id: 'siteMonitor.secondLevelAlarm', defaultMessage: '二级报警' }),
    field: 'secondLevelAlarm',
    format: fault2Format,
  },
  {
    label: formatMessage({ id: 'siteMonitor.threeLevelAlarm', defaultMessage: '三级报警' }),
    field: 'threeLevelAlarm',
    format: fault3Format,
  },
  {
    label: formatMessage({ id: 'siteMonitor.accessControlStatus', defaultMessage: '门禁状态' }),
    field: 'AccessControlStatus',
    format: doorFormat,
  },
];

export const statusItems: DetailItem[] = [
  {
    label: formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' }),
    field: 'RunState',
    format: runStateFormat,
  },
  {
    label: formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压' }),
    field: 'TotalBatteryVoltage',
    format: voltageFormat,
  },
  { label: 'SOC', field: 'SOC', format: percentageFormat },
  { label: 'SOH', field: 'SOH', format: percentageFormat },
  {
    label: formatMessage({ id: 'siteMonitor.insulationValue', defaultMessage: '绝缘值' }),
    field: 'InsulationValue',
    format: kohmFormat,
  },
  {
    label: formatMessage({
      id: 'siteMonitor.positiveInsulationValue',
      defaultMessage: '正极绝缘值',
    }),
    field: 'PositiveInsulationValue',
    format: kohmFormat,
  },
  {
    label: formatMessage({
      id: 'siteMonitor.negativeInsulationValue',
      defaultMessage: '负极绝缘值',
    }),
    field: 'NegativeInsulationValue',
    format: kohmFormat,
  },
  {
    label: formatMessage({ id: 'siteMonitor.averageVoltage', defaultMessage: '平均电压' }),
    field: 'AverageVoltage',
    format: voltageFormat,
  },
  {
    label: formatMessage({ id: 'siteMonitor.prechargeTotalPressure', defaultMessage: '预充总压' }),
    field: 'TPCP',
    format: voltageFormat,
  },
  {
    label: formatMessage({ id: 'siteMonitor.hydrogenConcentration', defaultMessage: '氢气浓度' }),
    field: 'HydrogenConcentration',
    format: hydrogenFormat,
  },
  {
    label:
      'BMU1-10' +
      formatMessage({ id: 'siteMonitor.communicationState', defaultMessage: '通信状态' }),
    field: 'BMU1CS',
    format: abnormalFormat,
  },
];

export const historyItems: DetailItem[] = [
  {
    label: formatMessage({ id: 'siteMonitor.singleCharge', defaultMessage: '单次充电' }),
    field: 'LastChargeLevel',
    format: powerHourFormat,
  },
  {
    label: formatMessage({ id: 'siteMonitor.singleDischarge', defaultMessage: '单次放电' }),
    field: 'LastDischargeCapacity',
    format: powerHourFormat,
  },
  {
    label: formatMessage({ id: 'siteMonitor.cumulativeCharge', defaultMessage: '累计充电' }),
    field: 'ACC',
    format: powerHourFormat,
  },
  {
    label: formatMessage({ id: 'siteMonitor.cumulativeDischarge', defaultMessage: '累计放电' }),
    field: 'ADC',
    format: powerHourFormat,
  },
  {
    label: formatMessage({
      id: 'siteMonitor.numberBatteryCabinetDoors',
      defaultMessage: '电池柜开门次数',
    }),
    field: 'NOBCDO',
  },
];

export const tempItems: DetailItem[] = [
  {
    label: formatMessage({ id: 'siteMonitor.averageTemperature', defaultMessage: '平均温度' }),
    field: 'AverageTemperature',
    format: tempFormat,
  },
  {
    label:
      formatMessage({ id: 'siteMonitor.highboxTemperature', defaultMessage: '高压箱温度' }) + '1',
    field: 'HighPressureBoxTemperature1',
    format: tempFormat,
  },
  {
    label:
      formatMessage({ id: 'siteMonitor.highboxTemperature', defaultMessage: '高压箱温度' }) + '2',
    field: 'HighPressureBoxTemperature2',
    format: tempFormat,
  },
  {
    label:
      formatMessage({ id: 'siteMonitor.highboxTemperature', defaultMessage: '高压箱温度' }) + '3',
    field: 'HighPressureBoxTemperature3',
    format: tempFormat,
  },
  {
    label:
      formatMessage({ id: 'siteMonitor.highboxTemperature', defaultMessage: '高压箱温度' }) + '4',
    field: 'HighPressureBoxTemperature4',
    format: tempFormat,
  },
];

export const abilityItems: DetailItem[] = [
  {
    label: formatMessage({ id: 'siteMonitor.rechargeableCapacity', defaultMessage: '可充电量' }),
    field: 'RechargeableCapacity',
    format: powerHourFormat,
  },
  {
    label: formatMessage({ id: 'siteMonitor.dischargeCapacity', defaultMessage: '可放电量' }),
    field: 'DischargeableCapacity',
    format: powerHourFormat,
  },
  {
    label: formatMessage({
      id: 'siteMonitor.maximumChargingCurrent',
      defaultMessage: '最大充电电流',
    }),
    field: 'MaximumChargingCurrent',
    format: currentFormat,
  },
  {
    label: formatMessage({
      id: 'siteMonitor.maximumDischargingCurrent',
      defaultMessage: '最大放电电流',
    }),
    field: 'maximumDischargeCurrent',
    format: currentFormat,
  },
];

export const maxUnitColumns: ProColumns<MaxUnitType>[] = [
  {
    title:
      formatMessage({ id: 'siteMonitor.maximumCellVoltage', defaultMessage: '最高电芯电压' }) +
      '（V）',
    dataIndex: 'maxVoltage',
    width: 150,
    ellipsis: true,
  },
  {
    title:
      formatMessage({ id: 'siteMonitor.minimumCellVoltage', defaultMessage: '最低电芯电压' }) +
      '（V）',
    dataIndex: 'minVoltage',
    width: 150,
    ellipsis: true,
  },
  {
    title:
      formatMessage({ id: 'siteMonitor.maximumTemperaturePoint', defaultMessage: '最高温度点' }) +
      '（℃）',
    dataIndex: 'maxTemp',
    width: 150,
    ellipsis: true,
  },
  {
    title:
      formatMessage({ id: 'siteMonitor.minimumTemperaturePoint', defaultMessage: '最低温度点' }) +
      '（℃）',
    dataIndex: 'minTemp',
    width: 150,
    ellipsis: true,
  },
];
