import type React from 'react';
import BoxSubstation from './BoxSubstation';
import YTCharge from './YTCharge';
import Device from './Device';
import Cabinet from './Cabinet';
import ElectricMeter from './ElectricMeter';
import EnergyCabinet from './EnergyCabinet';
import Energy from './Energy';
import Gateway from './Gateway';
import HwCharge from './HwCharge';
import HwChargeChild from './HwChargeChild';
import HwChargeYt from './HwChargeYt';
import PvInverter from './PvInverter';
import BatterryStack from './BatterryStack';
import type { PvInverterProps } from './PvInverter';
import PvInverterCabinet from './PvInverterCabinet';
import { DeviceTypeEnum } from '@/utils/dictionary';

export type DeviceDetailType = {
  id: string;
};

export type RealTimeProps = {
  id: string;
  loading?: boolean;
  open?: boolean;
};

export type BusinessDialogProps = {
  id: string;
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

export const deviceDetailMap: Omit<
  GetValue<DeviceTypeEnum, DeviceDialogMapType>,
  DeviceTypeEnum.PvInverter11 | DeviceTypeEnum.PvInverter4
> &
  Pick<
    GetValue<DeviceTypeEnum, PvInverterDeviceDialogMapType>,
    DeviceTypeEnum.PvInverter11 | DeviceTypeEnum.PvInverter4
  > = {
  [DeviceTypeEnum.Gateway]: { component: Gateway },
  [DeviceTypeEnum.ElectricMeter]: { component: ElectricMeter },
  [DeviceTypeEnum.PvInverter11]: { component: PvInverter, props: { loopNum: 12 } },
  [DeviceTypeEnum.PvInverter4]: { component: PvInverter, props: { loopNum: 4 } },
  [DeviceTypeEnum.YtCharge160]: { component: YTCharge },
  [DeviceTypeEnum.Energy]: { component: Energy },
  [DeviceTypeEnum.PvInverterCabinet]: { component: PvInverterCabinet },
  [DeviceTypeEnum.HwCharge]: { component: HwCharge },
  [DeviceTypeEnum.YtCharge120]: { component: YTCharge },
  [DeviceTypeEnum.EnergyCabinet]: { component: EnergyCabinet },
  [DeviceTypeEnum.BoxSubstation]: { component: BoxSubstation },
  [DeviceTypeEnum.Cabinet]: { component: Cabinet },
  [DeviceTypeEnum.HwChargeChild]: { component: HwChargeChild },
  [DeviceTypeEnum.HwChargeYt]: { component: HwChargeYt },
  [DeviceTypeEnum.Device]: { component: Device },
  [DeviceTypeEnum.BatteryStack]: { component: BatterryStack },
  [DeviceTypeEnum.BatteryCluster]: { component: BatterryStack },
};
