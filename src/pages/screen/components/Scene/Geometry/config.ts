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
import EnergyFlow from '@/assets/image/screen/scenes/能流图@2x.png';

export const CellList = [
  {
    key: 'EnergyFlow',
    cellStyle: {
      width: 664,
      height: 332,
      left: 642,
      top: 365,
      zIndex: 0,
    },
    component: EnergyFlow,
    default: EnergyFlow,
  },
  {
    key: 'Cafe',
    cellStyle: {
      width: 208,
      height: 130,
      left: 991,
      top: 679,
    },
    component: Cafe,
    default: Cafe,
    hover: Cafe,
    active: HomeEnergyStorage,
  },
  {
    key: 'HomeEnergyStorage',
    cellStyle: {
      width: 212,
      height: 150,
      left: 850,
      top: 742,
    },
    component: HomeEnergyStorage,
    default: HomeEnergyStorage,
    hover: HomeEnergyStorage,
    active: HomeEnergyStorage,
  },
  {
    key: 'HomeEnergyStorage',
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
    key: 'energyStorageGridConnectedCabinet1',
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
    key: 'energyStorageGridConnectedCabinet2',
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
    cellStyle: {
      width: 59,
      height: 64,
      left: 1276,
      top: 598,
    },
    component: ChargingStation120KW,
    default: ChargingStation120KW,
  },
];
