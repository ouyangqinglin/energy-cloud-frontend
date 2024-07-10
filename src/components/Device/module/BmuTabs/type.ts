/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-07-09 14:50:35
 * @LastEditTime: 2024-07-09 14:50:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\BmuTabs\type.ts
 */

import { DeviceModelType } from '@/types/device';

export type BmuType = {
  bmuMap?: Map<string, string>;
  modelMap?: Record<string, DeviceModelType>;
  onOpenChart?: (
    deviceId: string,
    collectionInfo: {
      title: string;
      collection: string;
    },
  ) => void;
};

export type MaxDataType = {
  cell: {
    max: {
      bmu?: number;
      index: number;
      value: number;
    };
    min: {
      bmu?: number;
      index: number;
      value: number;
    };
  };
  temp: {
    max: {
      bmu?: number;
      index: number;
      value: number;
    };
    min: {
      bmu?: number;
      index: number;
      value: number;
    };
  };
};
