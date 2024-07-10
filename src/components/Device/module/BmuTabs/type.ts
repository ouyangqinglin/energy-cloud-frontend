/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-07-09 14:50:35
 * @LastEditTime: 2024-07-09 14:50:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\BmuTabs\type.ts
 */

export type BmuType = {
  bmuTabNum?: number;
  bmuMap?: Map<string, string>;
  onOpenChart?: (
    deviceId: string,
    collectionInfo: {
      title: string;
      collection: string;
    },
  ) => void;
};
