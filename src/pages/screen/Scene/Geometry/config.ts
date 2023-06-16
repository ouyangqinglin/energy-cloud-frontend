import 左1_永泰_160kW_充电桩 from '@/assets/image/screen/Geometry/左1_永泰_160kW_充电桩.png';
import 左2_永泰_充电终端 from '@/assets/image/screen/Geometry/左2_永泰_充电终端.png';
import 左3_永泰_充电终端 from '@/assets/image/screen/Geometry/左3_永泰_充电终端.png';
import 左4_华为_充电终端 from '@/assets/image/screen/Geometry/左4_华为_充电终端.png';
import 左5_华为_充电终端 from '@/assets/image/screen/Geometry/左5_华为_充电终端.png';
import 左6_华为_充电终端 from '@/assets/image/screen/Geometry/左6_华为_充电终端.png';
import 右1_永泰_充电终端 from '@/assets/image/screen/Geometry/右1_永泰_充电终端.png';
import 右2_永泰_充电终端 from '@/assets/image/screen/Geometry/右2_永泰_充电终端.png';
import 右3_永泰_120KW_充电桩 from '@/assets/image/screen/Geometry/右3_永泰_120KW_充电桩.png';
import 右4_永泰_充电终端 from '@/assets/image/screen/Geometry/右4_永泰_充电终端.png';
import 右5_交流桩 from '@/assets/image/screen/Geometry/右5_交流桩.png';
import { DeviceType } from './Dialog';
import type { CellConfigItem } from './type';
import { DeviceMark } from './type';

export const chargingStackCeils: CellConfigItem[] = [
  {
    key: 'ChargingStation160KW',
    deviceType: DeviceType.DC_PILE,
    mark: DeviceMark.DC_PILE_160KW,
    cellStyle: {
      width: 61,
      height: 77,
      left: 118,
      top: 322,
    },
    component: 左1_永泰_160kW_充电桩,
    default: 左1_永泰_160kW_充电桩,
  },
  {
    key: 'YTChargingStack1',
    mark: DeviceMark.YT_CHARGING_TERMINAL_1,
    deviceType: DeviceType.YT_CHARGING_TERMINAL,
    cellStyle: {
      width: 37,
      height: 63,
      left: 208,
      top: 290,
    },
    component: 左2_永泰_充电终端,
    default: 左2_永泰_充电终端,
  },
  {
    key: 'YTChargingStack2',
    mark: DeviceMark.YT_CHARGING_TERMINAL_2,
    deviceType: DeviceType.YT_CHARGING_TERMINAL,
    cellStyle: {
      width: 45,
      height: 67,
      left: 256,
      top: 256,
    },
    component: 左3_永泰_充电终端,
    default: 左3_永泰_充电终端,
  },
  {
    key: 'HWChargingStack1',
    mark: DeviceMark.HW_CHARGING_TERMINAL_1,
    deviceType: DeviceType.HW_CHARGING_TERMINAL,
    cellStyle: {
      width: 42,
      height: 68,
      left: 301,
      top: 233,
    },
    component: 左4_华为_充电终端,
    default: 左4_华为_充电终端,
  },
  {
    key: 'HWChargingStack2',
    mark: DeviceMark.HW_CHARGING_TERMINAL_2,
    deviceType: DeviceType.HW_CHARGING_TERMINAL,
    cellStyle: {
      width: 41,
      height: 64,
      left: 346,
      top: 206,
    },
    component: 左5_华为_充电终端,
    default: 左5_华为_充电终端,
  },
  {
    key: 'HWChargingStack3',
    mark: DeviceMark.HW_CHARGING_STACK,
    deviceType: DeviceType.HW_CHARGING_STACK,
    cellStyle: {
      width: 46,
      height: 60,
      left: 386,
      top: 181,
    },
    component: 左6_华为_充电终端,
    default: 左6_华为_充电终端,
  },
  {
    key: 'YTChargingStack3',
    mark: DeviceMark.YT_CHARGING_TERMINAL_3,
    deviceType: DeviceType.YT_CHARGING_TERMINAL,
    cellStyle: {
      width: 36,
      height: 60,
      left: 679,
      top: 223,
    },
    component: 右1_永泰_充电终端,
    default: 右1_永泰_充电终端,
  },
  {
    key: 'ChargingStation120KW',
    mark: DeviceMark.DC_PILE_120KW,
    deviceType: DeviceType.DC_PILE,
    cellStyle: {
      width: 78,
      height: 83,
      left: 738,
      top: 251,
    },
    component: 右3_永泰_120KW_充电桩,
    default: 右3_永泰_120KW_充电桩,
  },
  {
    key: 'YTChargingStack5',
    mark: DeviceMark.YT_CHARGING_TERMINAL_4,
    deviceType: DeviceType.YT_CHARGING_TERMINAL,
    cellStyle: {
      width: 50,
      height: 59,
      left: 806,
      top: 298,
    },
    component: 右2_永泰_充电终端,
    default: 右2_永泰_充电终端,
  },
  {
    key: 'YTChargingStack6',
    mark: DeviceMark.YT_CHARGING_TERMINAL_5,
    deviceType: DeviceType.YT_CHARGING_TERMINAL,
    cellStyle: {
      width: 50,
      height: 60,
      left: 863,
      top: 331,
    },
    component: 右4_永泰_充电终端,
    default: 右4_永泰_充电终端,
  },
  {
    key: 'YT_AC_ChargingStack1',
    mark: DeviceMark.YT_AC_CHARGING_TERMINAL,
    deviceType: DeviceType.YT_CHARGING_TERMINAL,
    cellStyle: {
      width: 23,
      height: 46,
      left: 988,
      top: 328,
    },
    component: 右5_交流桩,
    default: 右5_交流桩,
  },
];
