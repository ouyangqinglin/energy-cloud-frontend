/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-12 09:45:14
 * @LastEditTime: 2023-09-12 09:45:18
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\RemoteSetting\helper.ts
 */
import { DeviceTypeEnum } from '@/utils/dictionary';
import { RemoteSettingProductType } from './typing';

export const remoteSettingProductMap: Map<DeviceTypeEnum, RemoteSettingProductType> = new Map([
  [DeviceTypeEnum.Ems, { component: 'Ems', props: {} }],
  [DeviceTypeEnum.BWattAir, { component: 'Air', props: {} }],
]);
