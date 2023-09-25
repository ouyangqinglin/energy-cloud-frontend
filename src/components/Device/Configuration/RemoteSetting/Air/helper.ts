/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-25 13:52:36
 * @LastEditTime: 2023-09-25 13:52:37
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\RemoteSetting\Air\helper.ts
 */

import { DetailItem } from '@/components/Detail';
import { tempFormat, percentageFormat } from '@/utils/format';

export const runItems: DetailItem[] = [
  { label: '制冷点', field: 'RefrigerationPoint', format: tempFormat },
  { label: '制冷回差', field: 'CoolingReturnDifference', format: tempFormat },
  { label: '加热点', field: 'HeatingPoint', format: tempFormat },
  { label: '加热回差', field: 'HeatingReturnDifference', format: tempFormat },
  { label: '除湿点', field: 'DehumidificationPoint', format: percentageFormat },
  { label: '除湿回差', field: 'DehumidificationReturnDifference', format: percentageFormat },
  { label: '高温点', field: 'HighTemperaturePoint', format: tempFormat },
  { label: '低温点', field: 'LowTemperaturePoint', format: tempFormat },
  { label: '高湿点', field: 'HighHumidityPoint', format: tempFormat },
  { label: '内风机停止点', field: 'InternalFanStopPoint', format: tempFormat },
  { label: '高温开启值', field: 'HighTemperatureOpeningValue', format: tempFormat },
  { label: '高温关闭值', field: 'HighTemperatureShutdownValue', format: tempFormat },
  { label: '低温开启值', field: 'LowTemperatureOpeningValue', format: tempFormat },
  { label: '低温关闭值', field: 'LowTemperatureShutdownValue', format: tempFormat },
];
