/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 10:56:00
 * @LastEditTime: 2023-07-14 10:56:00
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\components\Cluster\config.ts
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

export const runItems: DetailItem[] = [
  { label: '运行状态', field: 'a' },
  {
    label: '通信',
    field: 'status',
    format: (value) => <ProField text={value} mode="read" valueEnum={onlineStatus} />,
  },
  { label: '告警', field: 'a' },
];

export const statusItems: DetailItem[] = [
  { label: 'BMU1-10通信状态', field: 'a' },
  { label: 'PACK风扇状态', field: 'b' },
  { label: 'PACK风扇状态反馈', field: 'c' },
  { label: 'BMU1风扇', field: 'd' },
  { label: 'PACK风扇PWM占空比1', field: 'e' },
  { label: 'BMU2风扇', field: 'f' },
  { label: 'PACK风扇PWM占空比2', field: 'g' },
  { label: 'BMU3风扇', field: 'h' },
  { label: 'PACK风扇PWM占空比3', field: 'i' },
  { label: 'BMU4风扇', field: 'MVVOSU' },
  { label: 'PACK风扇PWM占空比4', field: 'j' },
  { label: 'BMU5风扇', field: 'k' },
  { label: 'PACK风扇PWM占空比5', field: 'l' },
  { label: 'BMU6风扇', field: 'm' },
  { label: 'PACK风扇PWM占空比6', field: 'n' },
  { label: 'BMU7风扇', field: 'o' },
  { label: 'PACK风扇PWM占空比7', field: 'p' },
  { label: 'BMU8风扇', field: 'q' },
  { label: 'PACK风扇PWM占空比8', field: 'r' },
  { label: 'BMU9风扇', field: 's' },
  { label: 'PACK风扇PWM占空比9', field: 't' },
  { label: 'BMU10风扇', field: 'u' },
  { label: 'PACK风扇PWM占空比10', field: 'v' },
];
