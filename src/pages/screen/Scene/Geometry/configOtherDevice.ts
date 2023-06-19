import ChargingStack from '@/assets/image/screen/Geometry/img_充电堆_def@2x.png';
import PowerDistributionRoom from '@/assets/image/screen/Geometry/配电房@2x.png';
import HUAWEIInverter from '@/assets/image/screen/Geometry/img_华为逆变器-1_def@2x.png';
import EnergyStorageGridConnectedCabinet from '@/assets/image/screen/Geometry/储能并网计量柜_def@2x.png';
import YTEnergyStorage from '@/assets/image/screen/Geometry/永泰储能smart@2x.png';
import HWEnergyStorage from '@/assets/image/screen/Geometry/华为储能@2x.png';
import YTChargingHost from '@/assets/image/screen/Geometry/永泰充电主机@2x.png';
import HomeEnergyStore from '@/assets/image/screen/Geometry/img_家储_def@2x.png';
import CoffeeEnergyStore from '@/assets/image/screen/Geometry/img_咖啡店_def@2x.png';
import { DeviceType } from './Dialog';
import type { CellConfigItem } from './type';
import { DeviceMark } from './type';

export const otherCeils: CellConfigItem[] = [
  {
    key: 'chargingStack',
    mark: DeviceMark.HW_CHARGING_STACK,
    deviceType: DeviceType.HW_CHARGING_STACK,
    cellStyle: {
      width: 42,
      height: 64,
      left: 394,
      top: 117,
    },
    component: ChargingStack,
    default: ChargingStack,
  },
  {
    key: 'powerDistributionRoom',
    mark: DeviceMark.BOX_TYPE_SUBSTATION,
    deviceType: DeviceType.BOX_TYPE_SUBSTATION,
    cellStyle: {
      width: 70,
      height: 82,
      left: 469,
      top: 83,
    },
    component: PowerDistributionRoom,
    default: PowerDistributionRoom,
  },
  {
    key: 'photovoltaicStorageGridConnectedCabinet',
    mark: DeviceMark.PV_CABINET,
    deviceType: DeviceType.PV_CABINET,
    cellStyle: {
      width: 27,
      height: 47,
      left: 513,
      top: 141,
    },
    component: EnergyStorageGridConnectedCabinet,
    default: EnergyStorageGridConnectedCabinet,
  },
  {
    key: 'HUAWEIInverter1',
    mark: DeviceMark.PV_INVERTER_1,
    deviceType: DeviceType.PV_INVERTER,
    loopNum: 12,
    cellStyle: {
      width: 21,
      height: 24,
      left: 544,
      top: 123,
    },
    component: HUAWEIInverter,
    default: HUAWEIInverter,
  },
  {
    key: 'HUAWEIInverter2',
    mark: DeviceMark.PV_INVERTER_2,
    deviceType: DeviceType.PV_INVERTER,
    loopNum: 4,
    cellStyle: {
      width: 21,
      height: 24,
      left: 563,
      top: 110,
    },
    component: HUAWEIInverter,
    default: HUAWEIInverter,
  },
  {
    key: 'energyStorageGridConnectedCabinet',
    mark: DeviceMark.ENERGY_CABINET,
    deviceType: DeviceType.ENERGY_CABINET,
    cellStyle: {
      width: 27,
      height: 48,
      left: 550,
      top: 161,
    },
    component: EnergyStorageGridConnectedCabinet,
    default: EnergyStorageGridConnectedCabinet,
  },
  {
    key: 'YTEnergyStorage',
    mark: DeviceMark.YT_ENERGY_STORAGE_BOX,
    deviceType: DeviceType.ENERGY_STORAGE_BOX,
    cellStyle: {
      width: 29,
      height: 50,
      left: 611,
      top: 174,
    },
    component: YTEnergyStorage,
    default: YTEnergyStorage,
  },
  {
    key: 'HWEnergyStorage',
    mark: DeviceMark.HW_ENERGY_STORAGE_BOX,
    deviceType: DeviceType.ENERGY_STORAGE_BOX,
    cellStyle: {
      width: 40,
      height: 59,
      left: 643,
      top: 142,
    },
    component: HWEnergyStorage,
    default: HWEnergyStorage,
  },

  {
    key: 'YTChargingHost',
    mark: DeviceMark.YT_CHARGING_HOST,
    deviceType: DeviceType.CHARGING_HOST,
    cellStyle: {
      width: 31,
      height: 56,
      left: 687,
      top: 156,
    },
    component: YTChargingHost,
    default: YTChargingHost,
  },
  {
    key: 'HomeEnergyStore',
    cellStyle: {
      width: 212,
      height: 152,
      left: 410,
      top: 468,
    },
    component: HomeEnergyStore,
    default: HomeEnergyStore,
  },
  {
    key: 'CoffeeEnergyStore',
    cellStyle: {
      width: 208,
      height: 132,
      left: 551,
      top: 404,
    },
    component: CoffeeEnergyStore,
    default: CoffeeEnergyStore,
  },
];
