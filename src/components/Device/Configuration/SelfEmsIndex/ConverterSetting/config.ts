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

export const protectParamsItems: DetailItem[] = [
  { label: '一般充电功率限值', field: 'generalChargingPowerLimit', format: powerFormat },
  { label: '严重充电功率限值', field: 'severeChargingPowerLimit', format: powerFormat },
  { label: '一般逆变功率限值', field: 'generalInverterPowerLimit', format: powerFormat },
  { label: '严重逆变功率限制', field: 'severeInverterPowerLimitation', format: powerFormat },
  { label: '变流器一般过压限值', field: 'converterGeneralOvervoltageLimit', format: powerFormat },
  { label: '变流器严重过压限值', field: 'converterSevereOvervoltageLimit', format: powerFormat },
  { label: '变流器一般欠压限值', field: 'converterGeneralUndervoltageLimit', format: powerFormat },
  { label: '变流器严重欠压限值', field: 'converterSevereUndervoltageLimit', format: powerFormat },
  {
    label: '变流器一般充电电流限值',
    field: 'converterGeneralChargingCurrentLimit',
    format: powerFormat,
  },
  {
    label: '变流器严重充电电流限值',
    field: 'converterSevereChargingCurrentLimit',
    format: powerFormat,
  },
  { label: '一般逆变电流限值', field: 'generalInverterCurrentLimit', format: powerFormat },
  { label: '严重逆变电流限值', field: 'severeInverterCurrentLimit', format: powerFormat },
  {
    label: '变流器一般过温限值',
    field: 'converterGeneralOverTemperatureLimit',
    format: powerFormat,
  },
  {
    label: '变流器严重过温限值',
    field: 'converterSevereOverTemperatureLimit',
    format: powerFormat,
  },
  {
    label: '变流器一般低温限值',
    field: 'converterGeneralLowTemperatureLimit',
    format: powerFormat,
  },
  { label: '变流器严重低温限值', field: 'converterSevereLowTemperatureLimit', format: powerFormat },
];
export const powerParamsItems: DetailItem[] = [
  { label: '防逆流阈值', field: 'antiBackflowThreshold', format: powerFormat },
  { label: '变压器最大负荷', field: 'maximumLoadOfTransformer', format: powerFormat },
];
