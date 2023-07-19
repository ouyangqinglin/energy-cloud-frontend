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
  percentageFormat,
  tempFormat,
  outputFormat,
  openCloseFormat,
  openFormat,
  booleanFormat,
  airsetFormat,
} from '@/utils/format';

export const controlItems: DetailItem[] = [
  { label: '室内风机开关', field: 'IndoorFanSwitch', format: outputFormat },
  { label: '压缩机开关', field: 'compressorSwitch', format: outputFormat },
  { label: '电加热开关', field: 'ElectricHeatingSwitch', format: openCloseFormat },
  { label: '公告告警开关', field: 'AnnouncementAlarmSwitch', format: openFormat },
  { label: '制冷状态', field: 'CoolingState', format: booleanFormat },
  { label: '制热状态', field: 'HeatingState', format: booleanFormat },
  { label: '除湿状态', field: 'DehumidificationState', format: booleanFormat },
  { label: '送风状态', field: 'AirSupplyStatus', format: booleanFormat },
  { label: '待机状态', field: 'PositionInReadiness', format: booleanFormat },
  { label: '空调机组运行状态', field: 'AirConditioningUnitOperationStatus', format: airsetFormat },
  { label: '空调报警状态', field: 'a' },
];

export const statusItems: DetailItem[] = [
  { label: '回风湿度', field: 'ReturnAirHumidity', format: percentageFormat },
  { label: '送风温度', field: 'SupplyAirTemperature', format: tempFormat },
  { label: '冷凝温度', field: 'CondensingTemperature', format: tempFormat },
  { label: '蒸发温度', field: 'EvaporatingTemperature', format: tempFormat },
  { label: '回风温度', field: 'ReturnAirTemperature', format: tempFormat },
];
