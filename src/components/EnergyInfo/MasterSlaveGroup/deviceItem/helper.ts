/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-12 10:36:31
 * @LastEditTime: 2023-12-12 10:36:59
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\MasterSlaveGroup\deviceItem\helper.ts
 */

import { DetailItem } from '@/components/Detail';

export const maxConfig: DetailItem[] = [
  { label: 'U', field: 'TotalBatteryVoltage', unit: '(V)' },
  { label: 'I', field: 'TotalBatteryCurrent', unit: '(A)' },
  { label: 'P', field: 'P', unit: '(kW)' },
];
