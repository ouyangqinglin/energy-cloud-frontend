import { DeviceTypeEnum } from '@/utils/dictionary';
import { DeviceDataType } from '@/services/equipment';

export type DeviceDetailType = {
  id: string;
  productId: string;
  onChange?: (value: DeviceDataType) => void;
};

export type RealTimeProps = {
  id: string;
  loading?: boolean;
  open?: boolean;
};

export type DeviceDialogMapType = {
  component: string;
  // component: React.FC<DeviceDetailType>;
  props?: Record<string, any>;
};

export type PvInverterDeviceDialogMapType = {
  component: string;
  // component: React.FC<PvInverterProps>;
  props?: Record<string, any>;
};

type GetValue<T extends keyof any, V> = {
  [p in T]?: V;
};

export const deviceDetailMap: Omit<
  GetValue<DeviceTypeEnum, DeviceDialogMapType>,
  DeviceTypeEnum.PvInverter11 | DeviceTypeEnum.PvInverter4
> &
  Pick<
    GetValue<DeviceTypeEnum, PvInverterDeviceDialogMapType>,
    DeviceTypeEnum.PvInverter11 | DeviceTypeEnum.PvInverter4
  > = {
  [DeviceTypeEnum.Gateway]: { component: 'Gateway' },
  [DeviceTypeEnum.ElectricMeter]: { component: 'ElectricMeter' },
  [DeviceTypeEnum.PvInverter11]: { component: 'PvInverter', props: { loopNum: 12 } },
  [DeviceTypeEnum.PvInverter4]: { component: 'PvInverter', props: { loopNum: 4 } },
  [DeviceTypeEnum.YtCharge160]: { component: 'YTCharge' },
  [DeviceTypeEnum.Energy]: { component: 'Energy' },
  [DeviceTypeEnum.PvInverterCabinet]: { component: 'PvInverterCabinet' },
  [DeviceTypeEnum.HwCharge]: { component: 'HwCharge' },
  [DeviceTypeEnum.YtCharge120]: { component: 'YTCharge' },
  [DeviceTypeEnum.EnergyCabinet]: { component: 'EnergyCabinet' },
  [DeviceTypeEnum.BoxSubstation]: { component: 'BoxSubstation' },
  [DeviceTypeEnum.HwChargeChild]: { component: 'HwChargeChild' },
  [DeviceTypeEnum.HwChargeYt]: { component: 'HwChargeYt' },
  [DeviceTypeEnum.Device]: { component: 'Device' },
  [DeviceTypeEnum.BatteryStack]: { component: 'BatterryStack' },
  [DeviceTypeEnum.BatteryCluster]: { component: 'BatterryStack' },
  [DeviceTypeEnum.Pcs]: { component: 'Pcs' },
  [DeviceTypeEnum.Ems]: { component: 'Ems' },
  [DeviceTypeEnum.Air]: { component: 'Air' },
};
