/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:25:54
 * @LastEditTime: 2023-09-20 11:25:26
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Air\config.tsx
 */

import type { DetailItem } from '@/components/Detail';
import {
  percentageFormat,
  tempFormat,
  openFormat,
  airsetFormat,
  airAlarmFormat,
  airWorkFormat,
  airSwitchFormat,
  airRunFormat,
} from '@/utils/format';

export const controlItems: DetailItem[] = [
  { label: '室内风机开关', field: 'IndoorFanSwitch', format: openFormat },
  { label: '压缩机开关', field: 'compressorSwitch', format: openFormat },
  { label: '电加热开关', field: 'ElectricHeatingSwitch', format: openFormat },
  { label: '公告告警开关', field: 'AnnouncementAlarmSwitch', format: openFormat },
  { label: '制冷状态', field: 'CoolingState', format: openFormat },
  { label: '制热状态', field: 'HeatingState', format: openFormat },
  { label: '除湿状态', field: 'DehumidificationState', format: openFormat },
  { label: '送风状态', field: 'AirSupplyStatus', format: openFormat },
  { label: '待机状态', field: 'PositionInReadiness', format: airRunFormat },
  { label: '空调机组运行状态', field: 'AirConditioningUnitOperationStatus', format: airsetFormat },
  { label: '空调报警状态', field: 'AirConditioningAlarmStatus', format: airAlarmFormat },
  { label: '空调开关量输出', field: 'AirConditioningSwitchOutput', format: airSwitchFormat },
  { label: '空调工作状态', field: 'AirConditioningWorkingStatus', format: airWorkFormat },
];

export const statusItems: DetailItem[] = [
  { label: '回风湿度', field: 'ReturnAirHumidity', format: percentageFormat },
  { label: '送风温度', field: 'SupplyAirTemperature', format: tempFormat },
  { label: '冷凝温度', field: 'CondensingTemperature', format: tempFormat },
  { label: '蒸发温度', field: 'EvaporatingTemperature', format: tempFormat },
  { label: '回风温度', field: 'ReturnAirTemperature', format: tempFormat },
];
