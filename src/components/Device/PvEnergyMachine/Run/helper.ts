/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-16 16:38:41
 * @LastEditTime: 2023-11-16 16:38:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\PvEnergyMachine\Run\helper.ts
 */

import { DetailItem } from '@/components/Detail';
import { alarmFormat, modelFormat, startFormat, tempFormat } from '@/utils/format';

export const runItems: DetailItem[] = [
  { label: '消防主机故障状态', field: 'a', format: alarmFormat },
  { label: '消防主机启动状态', field: 'b', format: startFormat },
  { label: '消防主机运行模式', field: 'c', format: modelFormat },
  { label: '箱外探测器烟雾预警', field: 'd', format: alarmFormat },
  { label: '箱外探测器烟雾预警', field: 'e', format: alarmFormat },
  { label: '箱外探测器烟雾预警', field: 'f', format: alarmFormat },
  { label: '箱外探测器烟雾预警', field: 'g', format: alarmFormat },
  { label: '箱外探测器温度01', field: 'h', format: tempFormat },
  { label: '箱外探测器温度02', field: 'i', format: tempFormat },
  { label: '箱外探测H2值', field: 'j' },
  { label: '箱外探测CO值', field: 'k' },
  { label: '站控消防反馈', field: 'l', format: alarmFormat },
  { label: '风机反馈', field: 'm', format: alarmFormat },
  { label: '消防火灾', field: 'n', format: alarmFormat },
  { label: '消防联动', field: 'o', format: alarmFormat },
  { label: '水浸1告警', field: 'p', format: alarmFormat },
  { label: '水浸2告警', field: 'q', format: alarmFormat },
  { label: '门禁1告警', field: 'r', format: alarmFormat },
  { label: '门禁2告警', field: 's', format: alarmFormat },
];
