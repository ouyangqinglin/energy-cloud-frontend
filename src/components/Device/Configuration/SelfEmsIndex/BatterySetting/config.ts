/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 00:28:59
 * @LastEditTime: 2023-12-05 20:24:58
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\SelfEmsIndex\BatterySetting\config.ts
 */

import type { DetailItem } from '@/components/Detail';
import { currentFormat, powerFormat, tempFormat, voltageFormat } from '@/utils/format';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import { enableFormat } from '@/utils/format';

const options = [
  {
    value: 1,
    label: '禁用',
  },
  {
    value: 0,
    label: '使能',
  },
];

export const protectParamsItems: DetailItem[] = [
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
  { label: '一般过压限值', field: 'generalOvervoltageLimit', format: voltageFormat },
  { label: '严重过压限值', field: 'severeOvervoltageLimit', format: voltageFormat },
  { label: '一般欠压限值', field: 'generalUndervoltageLimit', format: voltageFormat },
  { label: '严重欠压限值', field: 'severeUndervoltageLimit', format: voltageFormat },
  { label: '一般充电电流限值', field: 'generalChargingCurrentLimit', format: currentFormat },
  { label: '严重充电电流限值', field: 'severeChargingCurrentLimit', format: currentFormat },
  { label: '一般放电电流限值', field: 'generalDischargeCurrentLimit', format: currentFormat },
  { label: '严重放电电流限值', field: 'severeDischargeCurrentLimit', format: currentFormat },
  { label: '一般过温限值', field: 'generalOverTemperatureLimit', format: tempFormat },
  { label: '严重过温限值', field: 'severeOverTemperatureLimit', format: tempFormat },
  { label: '一般低温限值', field: 'generalLowTemperatureLimit', format: tempFormat },
  { label: '严重低温限值', field: 'severeLowTemperatureLimit', format: tempFormat },
];
export const protectParamsColumns: ProFormColumnsType[] = [
  {
    title: '单体最高允许充电电压',
    dataIndex: 'maxAllowableChargingVoltage',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入单体最高允许充电电压' }],
    },
  },
  {
    title: '单体过压故障消除回差值',
    dataIndex: 'overVoltageErrorClearDifference',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入单体过压故障消除回差值' }],
    },
  },
  {
    title: '单体最低允许充电电压',
    dataIndex: 'minAllowableChargingVoltage',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入单体最低允许充电电压' }],
    },
  },
  {
    title: '单体欠压故障消除回差值',
    dataIndex: 'lowVoltageErrorClearDifference',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入单体欠压故障消除回差值' }],
    },
  },
  {
    title: '单体最高允许温度',
    dataIndex: 'maxAllowableTemperature',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入单体最高允许温度' }],
    },
  },
  {
    title: '单体过温故障消除回差值',
    dataIndex: 'overTempErrorClearDifference',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入单体过温故障消除回差值' }],
    },
  },
  {
    title: '单体最低允许温度',
    dataIndex: 'minAllowableTemp',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入单体最低允许温度' }],
    },
  },
  {
    title: '单体欠温故障消除回差值',
    dataIndex: 'lowTempErrorClearDifference',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入单体欠温故障消除回差值' }],
    },
  },
  {
    title: '电池组最高允许电压',
    dataIndex: 'maxAllowableVoltageOfBatteryPack',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入电池组最高允许电压' }],
    },
  },
  {
    title: '电池组过压故障回差值',
    dataIndex: 'overVoltageErrorDifferenceOfBatteryPack',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入电池组过压故障回差值' }],
    },
  },
  {
    title: '电池组最高允许充电电流',
    dataIndex: 'maxAllowableChargingCurrentOfBatteryPack',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入电池组最高允许充电电流' }],
    },
  },
  {
    title: '电池组最高允许放电电流',
    dataIndex: 'maxAllowableDischargeCurrentOfBatteryPack',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入电池组最高允许放电电流' }],
    },
  },
  {
    title: '一般过压限值',
    dataIndex: 'generalOvervoltageLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入一般过压限值' }],
    },
  },
  {
    title: '严重过压限值',
    dataIndex: 'severeOvervoltageLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入严重过压限值' }],
    },
  },
  {
    title: '一般欠压限值',
    dataIndex: 'generalUndervoltageLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入一般欠压限值' }],
    },
  },
  {
    title: '严重欠压限值',
    dataIndex: 'severeUndervoltageLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入严重欠压限值' }],
    },
  },
  {
    title: '一般充电电流限值',
    dataIndex: 'generalChargingCurrentLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入一般充电电流限值' }],
    },
  },
  {
    title: '严重充电电流限值',
    dataIndex: 'severeChargingCurrentLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入严重充电电流限值' }],
    },
  },
  {
    title: '一般放电电流限值',
    dataIndex: 'generalDischargeCurrentLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入一般放电电流限值' }],
    },
  },
  {
    title: '严重放电电流限值',
    dataIndex: 'severeDischargeCurrentLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入严重放电电流限值' }],
    },
  },
  {
    title: '一般过温限值',
    dataIndex: 'generalOverTemperatureLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入一般过温限值' }],
    },
  },
  {
    title: '严重过温限值',
    dataIndex: 'severeOverTemperatureLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入严重过温限值' }],
    },
  },
  {
    title: '一般低温限值',
    dataIndex: 'generalLowTemperatureLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入一般低温限值' }],
    },
  },
  {
    title: '严重低温限值',
    dataIndex: 'severeLowTemperatureLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入严重低温限值' }],
    },
  },
];

export const powerParamsItems: DetailItem[] = [
  {
    label: '电池系统自启动功能使能',
    field: 'EnableBatterySystemSelfStartFunction',
    format: enableFormat,
  },
];

export const powerParamsColumns: ProFormColumnsType[] = [
  {
    title: '电池系统自启动功能使能',
    dataIndex: 'EnableBatterySystemSelfStartFunction',
    valueType: 'select',
    formItemProps: {
      rules: [{ required: true, message: '请输入电池系统自启动功能使能' }],
    },
    fieldProps: {
      options,
    },
    colProps: {
      span: 24,
    },
  },
];
