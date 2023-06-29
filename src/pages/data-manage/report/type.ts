/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-29 11:39:16
 * @LastEditTime: 2023-06-29 11:39:32
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\report\type.ts
 */
import { reportTypeEnum, timeDimensionEnum } from '@/utils/dictionary';

export type TableSearchType = {
  siteId?: number;
  type?: reportTypeEnum;
  device?: number;
  dimention?: timeDimensionEnum;
};

export type TableDataType = {
  id: number;
};
