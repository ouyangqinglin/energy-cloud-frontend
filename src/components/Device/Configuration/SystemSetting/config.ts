/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 00:28:59
 * @LastEditTime: 2023-10-17 14:31:51
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Ems\Run\config.ts
 */

import type { DetailItem } from '@/components/Detail';
import { enableFormat } from '@/utils/format';

export const emsSystemEnabletems: DetailItem[] = [
  { label: '自启动功能使能', field: 'SysEnableSelfStartFunction', format: enableFormat },
  { label: '市电充电功能使能', field: 'MunicipalChargingFunctionEnabled', format: enableFormat },
  { label: '离网工作功能使能', field: 'EnableOffGridOperationFunction', format: enableFormat },
  { label: '并网工作功能使能', field: 'EnableGridConnectionFunction', format: enableFormat },
];
export const reportItems: DetailItem[] = [
  { label: 'EMS设备SN', field: 'SysEnableSelfStartFunction', format: enableFormat },
];
