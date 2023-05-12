/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-10 11:19:07
 * @LastEditTime: 2023-05-11 10:49:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EquipForm\data.d.ts
 */

export type fileType = {
  url: string;
};

export type EquipFormType = {
  id?: string;
  stationId?: string;
  type?: string;
  model?: string;
  name?: string;
  sn?: string;
  url?: string;
  imgs?: fileType[];
};
