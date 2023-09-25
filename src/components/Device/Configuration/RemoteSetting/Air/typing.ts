/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-25 13:51:06
 * @LastEditTime: 2023-09-25 13:51:06
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\RemoteSetting\Air\typing.ts
 */

export type AirType = {
  deviceId?: string;
  productId?: string;
};

export type RunFormType = {
  deviceId?: string;
  runData?: {
    RefrigerationPoint?: number;
  };
  onSuccess?: () => void;
};
