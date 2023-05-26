/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-26 13:55:43
 * @LastEditTime: 2023-05-26 18:20:03
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\index.ts
 */
import React from 'react';
import Gateway from '@/pages/screen/components/Gateway';
import ElectricMeter from '@/pages/screen/components/ElectricMeter';
import PvInverter from '@/pages/screen/components/PvInverter';
import YtCharge from '@/pages/screen/components/YtCharge';
import EnergyDialog from '@/pages/screen/components/EnergyDialog';
import PvInverterCabinet from '@/pages/screen/components/PvInverterCabinet';
import HwCharge from '@/pages/screen/components/HwCharge';
import EnergyCabinet from '@/pages/screen/components/EnergyCabinet';
import BoxSubstation from '@/pages/screen/components/BoxSubstation';
import Cabinet from '@/pages/screen/components/Cabinet';
import HwChargeChild from '@/pages/screen/components/HwChargeChild';
import HwChargeYt from '@/pages/screen/components/HwChargeYt';
import Device from './Device';
import type { PvInverterProps } from '@/pages/screen/components/PvInverter';
import { DeviceTypeEnum } from '@/utils/dictionary';

export type BusinessDialogProps = {
  id: string;
  open: boolean;
  onCancel: () => void;
  model?: string;
};

export type DeviceDialogMapType = {
  component: React.FC<BusinessDialogProps>;
  props?: Record<string, any>;
};

export type PvInverterDeviceDialogMapType = {
  component: React.FC<PvInverterProps>;
  props?: Record<string, any>;
};

type GetValue<T extends keyof any, V> = {
  [p in T]: V;
};

export const deviceDialogMap: Omit<
  GetValue<DeviceTypeEnum, DeviceDialogMapType>,
  DeviceTypeEnum.PvInverter11 | DeviceTypeEnum.PvInverter4
> &
  Pick<
    GetValue<DeviceTypeEnum, PvInverterDeviceDialogMapType>,
    DeviceTypeEnum.PvInverter11 | DeviceTypeEnum.PvInverter4
  > = {
  [DeviceTypeEnum.Gateway]: { component: Gateway },
  [DeviceTypeEnum.ElectricMeter]: { component: ElectricMeter },
  [DeviceTypeEnum.PvInverter11]: { component: PvInverter, props: { loopNum: 11 } },
  [DeviceTypeEnum.PvInverter4]: { component: PvInverter, props: { loopNum: 4 } },
  [DeviceTypeEnum.YtCharge160]: { component: YtCharge },
  [DeviceTypeEnum.Energy]: { component: EnergyDialog },
  [DeviceTypeEnum.PvInverterCabinet]: { component: PvInverterCabinet },
  [DeviceTypeEnum.HwCharge]: { component: HwCharge },
  [DeviceTypeEnum.YtCharge120]: { component: YtCharge },
  [DeviceTypeEnum.EnergyCabinet]: { component: EnergyCabinet },
  [DeviceTypeEnum.BoxSubstation]: { component: BoxSubstation },
  [DeviceTypeEnum.Cabinet]: { component: Cabinet },
  [DeviceTypeEnum.HwChargeChild]: { component: HwChargeChild },
  [DeviceTypeEnum.HwChargeYt]: { component: HwChargeYt },
  [DeviceTypeEnum.Device]: { component: Device },
};
