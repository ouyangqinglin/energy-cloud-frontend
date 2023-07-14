/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:25:54
 * @LastEditTime: 2023-07-14 14:25:58
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\EnergyConverter\config.tsx
 */

import { ProField } from '@ant-design/pro-components';
import type { DetailItem } from '@/components/Detail';
import { onlineStatus } from '@/utils/dictionary';
import {
  chargeFormat,
  closeFormat,
  currentFormat,
  voltageFormat,
  percentageFormat,
  kohmFormat,
  powerHourFormat,
  tempFormat,
} from '@/utils/format';

export const controlItems: DetailItem[] = [
  { label: '室内风机开关', field: 'a' },
  { label: '压缩机开关', field: 'b' },
  { label: '电加热开关', field: 'c' },
  { label: '公告告警开关 ', field: 'd' },
  { label: '制冷状态', field: 'e' },
  { label: '制热状态', field: 'f' },
  { label: '除湿状态', field: 'g' },
  { label: '送风状态', field: 'h' },
  { label: '待机状态', field: 'i' },
  { label: '空调机组运行状态', field: 'z' },
];

export const statusItems: DetailItem[] = [
  { label: '回风湿度', field: 'a' },
  { label: '送风温度', field: 'b' },
  { label: '冷凝温度', field: 'c' },
  { label: '蒸发温度', field: 'd' },
  { label: '回风温度', field: 'e' },
];
