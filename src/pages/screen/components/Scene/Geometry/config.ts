import Cafe from '@/assets/image/screen/scenes/img_咖啡店_def@2x.png';
import HomeEnergyStorage from '@/assets/image/screen/scenes/img_家储_def@2x.png';
import ChargingStation160KW from '@/assets/image/screen/scenes/img_充电桩160KW_def@2x.png';
import ChargingStation120KW from '@/assets/image/screen/scenes/充电桩120KW_def@2x.png';
import ChargingTerminal from '@/assets/image/screen/scenes/img_充电终端1_def@2x.png';
import ChargingStack from '@/assets/image/screen/scenes/img_充电堆_def@2x.png';
import PowerDistributionRoom from '@/assets/image/screen/scenes/配电房@2x.png';
import EnergyStorage from '@/assets/image/screen/scenes/储能@2x.png';
import EnergyStorageGridConnectedCabinet from '@/assets/image/screen/scenes/储能并网计量柜_def@2x.png';
import HUAWEIInverter from '@/assets/image/screen/scenes/img_华为逆变器-1_def@2x.png';
import PowerExchangeCabinet from '@/assets/image/screen/scenes/img_换电柜_def@2x.png';
import Transformer from '@/assets/image/screen/scenes/变压器@2x.png';
import EnergyFlow from '@/assets/image/screen/scenes/能流图@2x.png';
import { DeviceType } from '../Dialog';
import { CellConfigItem } from './type';

export const CellList: CellConfigItem[] = [
  {
    key: 'Cafe',
    name: '咖啡厅负载',
    cellStyle: {
      width: 208,
      height: 130,
      left: 991,
      top: 679,
      cursor: 'default',
    },
    component: Cafe,
  },
  {
    key: 'HomeEnergyStorage',
    cellStyle: {
      width: 212,
      height: 150,
      left: 850,
      top: 742,
      cursor: 'default',
    },
    component: HomeEnergyStorage,
  },
  {
    key: 'ChargingStation160KW',
    deviceId: 'ChargingStation160KW',
    deviceType: DeviceType.DC_PILE,
    cellStyle: {
      width: 63,
      height: 61,
      left: 600,
      top: 595,
    },
    component: ChargingStation160KW,
    default: ChargingStation160KW,
  },
  {
    key: 'chargingStack1',
    deviceId: 'chargingStack1',
    deviceType: DeviceType.YT_CHARGING_TERMINAL,
    cellStyle: {
      width: 42,
      height: 47,
      left: 699,
      top: 559,
    },
    component: ChargingTerminal,
    default: ChargingTerminal,
  },
  {
    key: 'chargingStack2',
    deviceId: 'chargingStack2',
    deviceType: DeviceType.YT_CHARGING_TERMINAL,
    cellStyle: {
      width: 42,
      height: 47,
      left: 748,
      top: 530,
    },
    component: ChargingTerminal,
    default: ChargingTerminal,
  },
  {
    key: 'chargingStack3',
    deviceId: 'chargingStack3',
    deviceType: DeviceType.HW_CHARGING_TERMINAL,
    cellStyle: {
      width: 42,
      height: 47,
      left: 797,
      top: 502,
    },
    component: ChargingTerminal,
    default: ChargingTerminal,
  },
  {
    key: 'chargingStack4',
    deviceId: 'chargingStack4',
    deviceType: DeviceType.HW_CHARGING_TERMINAL,
    cellStyle: {
      width: 42,
      height: 47,
      left: 844,
      top: 475,
    },
    component: ChargingTerminal,
    default: ChargingTerminal,
  },
  {
    key: 'chargingStack',
    deviceId: 'chargingStack',
    deviceType: DeviceType.HW_CHARGING_STACK,
    cellStyle: {
      width: 39,
      height: 56,
      left: 874,
      top: 416,
    },
    component: ChargingStack,
    default: ChargingStack,
  },
  {
    key: 'powerDistributionRoom',
    deviceId: 'powerDistributionRoom',
    deviceType: DeviceType.BOX_TYPE_SUBSTATION,
    cellStyle: {
      width: 70,
      height: 81,
      left: 921,
      top: 366,
    },
    component: PowerDistributionRoom,
    default: PowerDistributionRoom,
  },
  {
    key: 'energyStorage',
    deviceId: 'energyStorage',
    deviceType: DeviceType.ENERGY_STORAGE_BOX,
    cellStyle: {
      width: 111,
      height: 85,
      left: 991,
      top: 396,
    },
    component: EnergyStorage,
    default: EnergyStorage,
  },
  {
    key: 'energyStorageGridConnectedCabinet',
    deviceId: 'energyStorageGridConnectedCabinet',
    deviceType: DeviceType.ENERGY_CABINET,
    cellStyle: {
      width: 24,
      height: 50,
      left: 1102,
      top: 435,
    },
    component: EnergyStorageGridConnectedCabinet,
    default: EnergyStorageGridConnectedCabinet,
  },
  {
    key: 'photovoltaicStorageGridConnectedCabinet',
    deviceId: 'photovoltaicStorageGridConnectedCabinet',
    deviceType: DeviceType.PV_CABINET,
    cellStyle: {
      width: 24,
      height: 50,
      left: 1152,
      top: 464,
    },
    component: EnergyStorageGridConnectedCabinet,
    default: EnergyStorageGridConnectedCabinet,
  },
  {
    key: 'HUAWEIInverter1',
    deviceId: 'HUAWEIInverter1',
    deviceType: DeviceType.PV_INVERTER,
    loopNum: 11,
    cellStyle: {
      width: 21,
      height: 24,
      left: 1202,
      top: 504,
    },
    component: HUAWEIInverter,
    default: HUAWEIInverter,
  },
  {
    key: 'HUAWEIInverter2',
    deviceId: 'HUAWEIInverter2',
    deviceType: DeviceType.PV_INVERTER,
    loopNum: 4,
    cellStyle: {
      width: 21,
      height: 24,
      left: 1226,
      top: 519,
    },
    component: HUAWEIInverter,
    default: HUAWEIInverter,
  },
  {
    key: 'powerExchangeCabinet',
    deviceId: 'HUAWEIInverter2',
    deviceType: DeviceType.POWER_EXCHANGE_BOX,
    cellStyle: {
      width: 32,
      height: 53,
      left: 1271,
      top: 524,
    },
    component: PowerExchangeCabinet,
    default: PowerExchangeCabinet,
  },
  {
    key: 'chargingStation120KW',
    deviceId: 'chargingStation120KW',
    deviceType: DeviceType.DC_PILE,
    cellStyle: {
      width: 59,
      height: 64,
      left: 1276,
      top: 598,
    },
    component: ChargingStation120KW,
    default: ChargingStation120KW,
  },
  {
    key: 'transformer',
    cellStyle: {
      width: 32,
      height: 40,
      left: 990,
      top: 365,
      cursor: 'default',
    },
    component: Transformer,
    default: Transformer,
  },
];
