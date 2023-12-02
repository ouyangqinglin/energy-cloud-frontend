/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 00:28:59
 * @LastEditTime: 2023-10-17 14:31:51
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Ems\Run\config.ts
 */

import type { DetailItem } from '@/components/Detail';
import { powerFormat } from '@/utils/format';
import type { ProFormColumnsType } from '@ant-design/pro-components';

export const protectParamsItems: DetailItem[] = [
  { label: '一般充电功率限值', field: 'generalChargingPowerLimit', format: powerFormat },
  { label: '严重充电功率限值', field: 'severeChargingPowerLimit', format: powerFormat },
  { label: '一般逆变功率限值', field: 'generalInverterPowerLimit', format: powerFormat },
  { label: '严重逆变功率限制', field: 'severeInverterPowerLimitation', format: powerFormat },
  { label: '一般过压限值', field: 'converterGeneralOvervoltageLimit', format: powerFormat },
  { label: '严重过压限值', field: 'converterSevereOvervoltageLimit', format: powerFormat },
  { label: '一般欠压限值', field: 'converterGeneralUndervoltageLimit', format: powerFormat },
  { label: '严重欠压限值', field: 'converterSevereUndervoltageLimit', format: powerFormat },
  {
    label: '一般充电电流限值',
    field: 'converterGeneralChargingCurrentLimit',
    format: powerFormat,
  },
  {
    label: '严重充电电流限值',
    field: 'converterSevereChargingCurrentLimit',
    format: powerFormat,
  },
  { label: '一般逆变电流限值', field: 'generalInverterCurrentLimit', format: powerFormat },
  { label: '严重逆变电流限值', field: 'severeInverterCurrentLimit', format: powerFormat },
  {
    label: '一般过温限值',
    field: 'converterGeneralOverTemperatureLimit',
    format: powerFormat,
  },
  {
    label: '严重过温限值',
    field: 'converterSevereOverTemperatureLimit',
    format: powerFormat,
  },
  {
    label: '一般低温限值',
    field: 'converterGeneralLowTemperatureLimit',
    format: powerFormat,
  },
  { label: '严重低温限值', field: 'converterSevereLowTemperatureLimit', format: powerFormat },
];

export const protectParamsColumns: ProFormColumnsType[] = [
  {
    title: '一般充电功率限值',
    dataIndex: 'generalChargingPowerLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入一般充电功率限值' }],
    },
  },
  {
    title: '严重充电功率限值',
    dataIndex: 'severeChargingPowerLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入严重充电功率限值' }],
    },
  },
  {
    title: '一般逆变功率限值',
    dataIndex: 'generalInverterPowerLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入一般逆变功率限值' }],
    },
  },
  {
    title: '严重逆变功率限制',
    dataIndex: 'severeInverterPowerLimitation',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入严重逆变功率限制' }],
    },
  },
  {
    title: '一般过压限值',
    dataIndex: 'converterGeneralOvervoltageLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入一般过压限值' }],
    },
  },
  {
    title: '严重过压限值',
    dataIndex: 'converterSevereOvervoltageLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入严重过压限值' }],
    },
  },
  {
    title: '一般欠压限值',
    dataIndex: 'converterGeneralUndervoltageLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入一般欠压限值' }],
    },
  },
  {
    title: '严重欠压限值',
    dataIndex: 'converterSevereUndervoltageLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入严重欠压限值' }],
    },
  },
  {
    title: '一般充电电流限值',
    dataIndex: 'converterGeneralChargingCurrentLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入一般充电电流限值' }],
    },
  },
  {
    title: '严重充电电流限值',
    dataIndex: 'converterSevereChargingCurrentLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入严重充电电流限值' }],
    },
  },
  {
    title: '一般逆变电流限值',
    dataIndex: 'generalInverterCurrentLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入一般逆变电流限值' }],
    },
  },
  {
    title: '严重逆变电流限值',
    dataIndex: 'severeInverterCurrentLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入严重逆变电流限值' }],
    },
  },
  {
    title: '一般过温限值',
    dataIndex: 'converterGeneralOverTemperatureLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入一般过温限值' }],
    },
  },
  {
    title: '严重过温限值',
    dataIndex: 'converterSevereOverTemperatureLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入严重过温限值' }],
    },
  },
  {
    title: '一般低温限值',
    dataIndex: 'converterGeneralLowTemperatureLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入一般低温限值' }],
    },
  },
  {
    title: '严重低温限值',
    dataIndex: 'converterSevereLowTemperatureLimit',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入严重低温限值' }],
    },
  },
];

export const powerParamsItems: DetailItem[] = [
  { label: '防逆流阈值', field: 'antiBackflowThreshold', format: powerFormat },
  { label: '变压器最大负荷', field: 'maximumLoadOfTransformer', format: powerFormat },
];

export const powerParamsColumns: ProFormColumnsType[] = [
  {
    title: '防逆流阈值',
    dataIndex: 'antiBackflowThreshold',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入防逆流阈值' }],
    },
  },
  {
    title: '变压器最大负荷',
    dataIndex: 'maximumLoadOfTransformer',
    valueType: 'digit',
    formItemProps: {
      rules: [{ required: true, message: '请输入变压器最大负荷' }],
    },
  },
];
