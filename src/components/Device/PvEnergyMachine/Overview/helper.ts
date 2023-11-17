/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-15 16:59:59
 * @LastEditTime: 2023-11-16 14:35:39
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\PvEnergyMachine\Overview\helper.ts
 */

import Electric from '@/assets/image/device/electric.png';
import Energy from '@/assets/image/device/energy.png';
import Inverter from '@/assets/image/device/inverter.png';
import Pv from '@/assets/image/device/pv.png';
import Load from '@/assets/image/device/load.png';
import EmergentLoad from '@/assets/image/device/emergent-load.png';
import { FlowType, OverviewItemType } from '../typing';
import styles from '../index.less';

export const config: OverviewItemType[] = [
  {
    icon: Electric,
    style: {
      left: 106,
      top: 0,
      width: '82px',
      height: '102px',
    },
    items: [
      { label: '电网功率（kW）', field: 'a' },
      { label: '今日电网供电量（kWh）', field: 'b' },
      { label: '今日馈网电量（kWh）', field: 'c' },
    ],
  },
  {
    icon: Energy,
    style: {
      left: 577,
      top: 5,
      width: '101px',
      height: '93px',
    },
    items: [
      { label: '储能功率（kW）', field: 'a' },
      { label: '今日充电量（kW）', field: 'b' },
      { label: '今日放电量（kW）', field: 'c' },
      { label: 'SOC', field: 'd' },
    ],
  },
  {
    icon: Inverter,
    style: {
      left: 355,
      top: 121,
      width: '64px',
      height: '80px',
    },
  },
  {
    icon: Pv,
    style: {
      left: 96,
      top: 242,
      width: '101px',
      height: '80px',
    },
    items: [
      { label: '发电功率（kW）', field: 'a' },
      { label: '今日发电量（kWh）', field: 'b' },
    ],
  },
  {
    icon: Load,
    style: {
      left: 577,
      top: 242,
      width: '103px',
      height: '80px',
    },
    items: [
      { label: '普通负载（kW）', field: 'a', className: styles.vertical },
      { label: '负载总功率（kW）', field: 'b' },
      { label: '今日用电量（kWh）', field: 'c' },
    ],
  },
  {
    icon: EmergentLoad,
    style: {
      left: 710,
      top: 242,
      width: '92px',
      height: '80px',
    },
    items: [{ label: '紧急负载（kW）', field: 'a', className: styles.vertical }],
  },
];

export const flowItems: FlowType[] = [
  {
    pathId: '#path-top-left',
    field: 'a',
    keyPoints: [0, 1],
  },
  {
    pathId: '#path-top-right',
    field: 'b',
    keyPoints: [0, 1],
  },
  {
    pathId: '#path-bottom-left',
    field: 'c',
    keyPoints: [1, 0],
  },
  {
    pathId: '#path-bottom-right',
    field: 'd',
    keyPoints: [1, 0],
  },
];
