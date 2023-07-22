/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 00:28:59
 * @LastEditTime: 2023-07-14 00:29:17
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\components\Stack\config.ts
 */

import type { DetailItem } from '@/components/Detail';
import { modelFormat, runFormat } from '@/utils/format';

export const controlItems: DetailItem[] = [
  { label: '系统模式', field: 'sysModel', format: modelFormat },
  { label: 'EMS运行状态', field: 'emsSysStatus', format: runFormat },
];
