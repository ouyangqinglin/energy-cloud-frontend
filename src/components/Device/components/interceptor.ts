/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-23 14:19:52
 * @LastEditTime: 2024-04-09 11:49:27
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\components\interceptor.ts
 */

import { parseToArray } from '@/utils';

export const flat = (key: string, data: string) => {
  const result: Record<string, any> = {};
  parseToArray(data)?.forEach?.((item, index) => {
    Object.keys(item)?.forEach?.((itemKey) => {
      result[`${key}[${index}].${itemKey}`] = item[itemKey];
    });
  });
  return result;
};
