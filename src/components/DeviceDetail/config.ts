/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-27 19:08:24
 * @LastEditTime: 2023-07-27 19:08:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\config.ts
 */
import type { BasicDataNode } from 'rc-tree';
import type { DataNode } from 'antd/lib/tree';
import { DeviceDataType } from '@/services/equipment';
import {
  YTPVInverterOutlined,
  YTEnergyOutlined,
  YTEmsOutlined,
  YTBmsOutlined,
  YTAirOutlined,
  YTMeterOutlined,
  YTChargeOutlined,
  YTChargeStackOutlined,
  YTCabinetOutlined,
} from '@/components/YTIcons';

export type TreeNode = BasicDataNode & DataNode & DeviceDataType;

export const deviceMap = new Map([
  [1, YTEmsOutlined],
  [2, YTBmsOutlined],
  [3, YTCabinetOutlined],
  [6, YTMeterOutlined],
  [7, YTAirOutlined],
  [11, YTPVInverterOutlined],
  [13, YTChargeOutlined],
  [14, YTChargeOutlined],
  [16, YTEnergyOutlined],
  [17, YTMeterOutlined],
  [18, YTMeterOutlined],
  [19, YTChargeStackOutlined],
  [20, YTChargeOutlined],
  [21, YTChargeOutlined],
  [22, YTChargeOutlined],
  [24, YTChargeOutlined],
  [25, YTChargeOutlined],
  [26, YTMeterOutlined],
  [28, YTPVInverterOutlined],
  [30, YTMeterOutlined],
  [31, YTMeterOutlined],
  [32, YTCabinetOutlined],
  [33, YTChargeStackOutlined],
]);
