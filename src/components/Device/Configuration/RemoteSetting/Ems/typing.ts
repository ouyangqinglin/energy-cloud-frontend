/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-12 09:39:46
 * @LastEditTime: 2023-09-12 09:39:46
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\RemoteSetting\Ems\typing.ts
 */

import { Moment } from 'moment';

export type EmsType = {
  deviceId?: string;
  productId?: string;
};

export type ProtectFormType = {
  deviceId?: string;
  protectData?: {
    OverchargeProtection?: number;
    OverchargeRelease?: number;
    OverdischargeProtection?: number;
    Overrelease?: number;
  };
  onSuccess?: () => void;
};

export type SystemTimeFormType = {
  deviceId?: string;
  systemTimeData?: {
    sysTem?: Moment;
    yearWait?: number;
    monthWait?: number;
    dayWait?: number;
    hourWait?: number;
    minuteWait?: number;
    secondWait?: number;
    weekWait?: number;
  };
  onSuccess?: () => void;
};
