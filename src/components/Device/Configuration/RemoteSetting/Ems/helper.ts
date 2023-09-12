/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-12 09:31:13
 * @LastEditTime: 2023-09-12 09:31:17
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\RemoteSetting\helper.ts
 */

import { DetailItem } from '@/components/Detail';
import { voltageFormat } from '@/utils/format';

export const protectItems: DetailItem[] = [
  { label: '过充保护', field: 'OverchargeProtection', format: voltageFormat },
  { label: '过充释放', field: 'OverchargeRelease', format: voltageFormat },
  { label: '过放保护', field: 'OverdischargeProtection', format: voltageFormat },
  { label: '过放释放', field: 'Overrelease', format: voltageFormat },
];

export const systemTimeItems: DetailItem[] = [{ label: '系统时间', field: 'sysTem' }];
