/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-01 09:00:07
 * @LastEditTime: 2023-09-01 09:00:10
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\Configuration\Device\config.ts
 */

import type { DetailItem } from '@/components/Detail';
import {
  SelectTypeEnum,
  TABLETREESELECT,
  TABLETREESELECTVALUETYPE,
  TableTreeModalProps,
} from '@/components/TableSelect';
import { DeviceDataType } from '@/services/equipment';
import { ProFormColumnsType } from '@ant-design/pro-components';

export enum ConfigTypeEnum {
  Device,
  ChangeStack,
}

export const configTypeItemMap = new Map<ConfigTypeEnum, DetailItem>([
  [ConfigTypeEnum.Device, { label: '关联设备', field: 'associateDevices' }],
  [ConfigTypeEnum.ChangeStack, { label: '关联充电堆', field: 'associateStack' }],
]);
