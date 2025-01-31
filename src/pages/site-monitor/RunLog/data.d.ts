/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-30 08:51:57
 * @LastEditTime: 2023-05-30 08:52:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\operationLog\data.d.ts
 */

export type OperationLogType = {
  id: number;
  serviceName: string;
  deviceName: string;
  createTime: string;
  siteName: string;
  createByName: string;
  appName: string;
  appId: number;
};
