/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-25 14:44:42
 * @LastEditTime: 2023-09-25 14:44:42
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\RemoteUpdate\typing.ts
 */

export type RemoteUpgradeType = {
  deviceId?: string;
  productId?: string;
  deviceData?: Record<string, any>;
};

export type UpgradeDataType = {
  id?: number;
  version?: string;
  status?: number;
};

export type UpgradeFormType = {
  deviceId?: string;
  versionItems?: UpgradeDataType[];
  deviceData?: Record<string, any>;
};
