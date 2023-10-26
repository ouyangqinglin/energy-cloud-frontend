/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:10:41
 * @LastEditTime: 2023-10-16 09:43:19
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\config.ts
 */

import { DeviceDataType } from '@/services/equipment';
import { DeviceTypeEnum } from '@/utils/dictionary';

export type DeviceRealTimeType = {
  id: string;
  productId: string;
  deviceData?: DeviceDataType;
  loading?: boolean;
};

export type DeviceRealTimeMapType = {
  component: string;
  // component: React.FC<DeviceDetailType>;
  props?: Record<string, any>;
};

export const deviceRealTimeMap: any = {
  [DeviceTypeEnum.Gateway]: { component: 'Gateway' },
  [DeviceTypeEnum.ElectricMeter]: { component: 'ElectricMeter' },
  [DeviceTypeEnum.PvInverter11]: { component: 'PvInverter', props: { loopNum: 12 } },
  [DeviceTypeEnum.PvInverter4]: { component: 'PvInverter', props: { loopNum: 4 } },
  [DeviceTypeEnum.PvInverter36]: { component: 'PvInverter', props: { loopNum: 12 } },
  [DeviceTypeEnum.GRWTPvInverter]: { component: 'PvInverter', props: { loopNum: 12 } },
  [DeviceTypeEnum.YtCharge160]: { component: 'YTCharge' },
  [DeviceTypeEnum.Energy]: { component: 'Energy' },
  [DeviceTypeEnum.PvInverterCabinet]: { component: 'PvInverterCabinet' },
  [DeviceTypeEnum.HwCharge]: { component: 'HwCharge' },
  [DeviceTypeEnum.YtCharge360]: { component: 'HwCharge' },
  [DeviceTypeEnum.YtCharge120]: { component: 'YTCharge' },
  [DeviceTypeEnum.YunCharge120]: { component: 'HwChargeYt' },
  [DeviceTypeEnum.YtCharge7]: { component: 'YTCharge' },
  [DeviceTypeEnum.EnergyCabinet]: { component: 'EnergyCabinet' },
  [DeviceTypeEnum.BoxSubstation]: { component: 'BoxSubstation' },
  [DeviceTypeEnum.HwChargeChild]: { component: 'HwChargeChild' },
  [DeviceTypeEnum.HwChargeSuperChild]: { component: 'HwChargeChild' },
  [DeviceTypeEnum.HwChargeYt]: { component: 'HwChargeYt' },
  [DeviceTypeEnum.Device]: { component: 'Device' },
  [DeviceTypeEnum.BatteryStack]: { component: 'BatterryStack' },
  [DeviceTypeEnum.BatteryCluster]: { component: 'BatterryStack' },
  [DeviceTypeEnum.Pcs]: { component: 'Pcs' },
  [DeviceTypeEnum.Ems]: { component: 'Ems' },
  [DeviceTypeEnum.Air]: { component: 'Air' },
  [DeviceTypeEnum.BWattBatteryStack]: { component: 'BatterryStack' },
  [DeviceTypeEnum.BWattBatteryCluster]: { component: 'BatterryStack' },
  [DeviceTypeEnum.BWattPcs]: { component: 'Pcs' },
  [DeviceTypeEnum.BWattEms]: { component: 'Ems', props: { type: DeviceTypeEnum.BWattEms } },
  [DeviceTypeEnum.BWattElectricMeter]: { component: 'ElectricMeter' },
  // [DeviceTypeEnum.BWattAir]: { component: 'Air' },
  [DeviceTypeEnum.BWattEnergy]: { component: 'Energy' },
  [DeviceTypeEnum.YTEnergy]: { component: 'Energy' },
  [DeviceTypeEnum.YTEnergyPcs]: { component: 'Pcs' },
  [DeviceTypeEnum.YTEnergyBatteryStack]: { component: 'BatterryStack' },
  [DeviceTypeEnum.YTEnergyMetter]: { component: 'ElectricMeter' },
  [DeviceTypeEnum.YTEnergyEms]: { component: 'YTEnergyEms' },
};
