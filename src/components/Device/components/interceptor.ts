/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-23 14:19:52
 * @LastEditTime: 2024-03-23 14:22:07
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\components\helper.ts
 */

export const flat = (key: string, data: Record<string, any>[]) => {
  const result: Record<string, any> = {};
  data?.forEach?.((item, index) => {
    Object.keys(item)?.forEach?.((itemKey) => {
      result[`${key}[${index}].${itemKey}`] = item[itemKey];
    });
  });
  return result;
};
