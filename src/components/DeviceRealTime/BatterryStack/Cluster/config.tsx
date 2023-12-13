/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 10:56:00
 * @LastEditTime: 2023-07-15 10:56:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\BatterryStack\Cluster\config.tsx
 */

import { ProField } from '@ant-design/pro-components';
import type { DetailItem } from '@/components/Detail';
import { deviceAlarmStatus, onlineStatus } from '@/utils/dictionary';
import { clusterFormat, percentageFormat, openFormat, pankFanAlarmFormat } from '@/utils/format';

export const runItems: DetailItem[] = [
  {
    label: '运行状态',
    field: 'runState',
    format: clusterFormat,
  },
  {
    label: '通信',
    field: 'connectStatus',
    format: (value) => <ProField text={value} mode="read" valueEnum={onlineStatus} />,
  },
  {
    label: '告警',
    field: 'alarmStatus',
    format: (value) => <ProField text={value} mode="read" valueEnum={deviceAlarmStatus} />,
  },
];

export const statusItems: DetailItem[] = [
  { label: 'PACK风扇状态反馈', field: 'packFanAlarmStatus', format: pankFanAlarmFormat },
  { label: 'BMU1风扇', field: 'BMU1Fan', format: openFormat },
  { label: 'PACK风扇PWM占空比1', field: 'PACKFPDC1', format: percentageFormat },
  { label: 'BMU2风扇', field: 'BMU2Fan', format: openFormat },
  { label: 'PACK风扇PWM占空比2', field: 'PACKFPDC2', format: percentageFormat },
  { label: 'BMU3风扇', field: 'BMU3Fan', format: openFormat },
  { label: 'PACK风扇PWM占空比3', field: 'PACKFPDC3', format: percentageFormat },
  { label: 'BMU4风扇', field: 'BMU4Fan', format: openFormat },
  { label: 'PACK风扇PWM占空比4', field: 'PACKFPDC4', format: percentageFormat },
  { label: 'BMU5风扇', field: 'BMU5Fan', format: openFormat },
  { label: 'PACK风扇PWM占空比5', field: 'PACKFPDC5', format: percentageFormat },
  { label: 'BMU6风扇', field: 'BMU6Fan', format: openFormat },
  { label: 'PACK风扇PWM占空比6', field: 'PACKFPDC6', format: percentageFormat },
  { label: 'BMU7风扇', field: 'BMU7Fan', format: openFormat },
  { label: 'PACK风扇PWM占空比7', field: 'PACKFPDC7', format: percentageFormat },
  { label: 'BMU8风扇', field: 'BMU8Fan', format: openFormat },
  { label: 'PACK风扇PWM占空比8', field: 'PACKFPDC8', format: percentageFormat },
  { label: 'BMU9风扇', field: 'BMU9Fan', format: openFormat },
  { label: 'PACK风扇PWM占空比9', field: 'PACKFPDC9', format: percentageFormat },
  { label: 'BMU10风扇', field: 'BMU10Fan', format: openFormat },
  { label: 'PACK风扇PWM占空比10', field: 'PACKFPDC10', format: percentageFormat },
];
