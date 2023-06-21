import type { CSSProperties, PureComponent } from 'react';
import type { DeviceType } from './Dialog';

/**
 * @description 标记设备，方便识别设备id对应图上是哪个设备，mark的顺序为开发自己规定
 * 永泰160kW充电桩		1
 * 永泰1#充电终端		2
 * 永泰2#充电终端		3
 * 华为1#充电终端		4
 * 华为2#充电终端		5
 * 华为3#充电终端		6
 * 华为600kW充电堆	7
 * 市电进线柜(配电柜)		8
 * 光伏并网柜		9
 * 1号逆变器		10
 * 2号逆变器		11
 * 储能并网柜		12
 * 永泰并网柜		13
 * 华为并网柜		14
 * 充电主机     15
 * 右侧#1永泰快充终端    16
 * 永泰120kW充电桩		17
 * 右侧#2永泰快充终端    18
 * 右侧#3永泰快充终端    19
 * 右侧交流桩    20
 */
export const enum DeviceMark {
  DC_PILE_160KW = 1,
  YT_CHARGING_TERMINAL_1,
  YT_CHARGING_TERMINAL_2,
  HW_CHARGING_TERMINAL_1,
  HW_CHARGING_TERMINAL_2,
  HW_CHARGING_TERMINAL_3,
  HW_CHARGING_STACK,
  BOX_TYPE_SUBSTATION,
  PV_CABINET,
  PV_INVERTER_1,
  PV_INVERTER_2,

  ENERGY_CABINET,
  YT_ENERGY_STORAGE_BOX,
  HW_ENERGY_STORAGE_BOX,

  // 右侧
  YT_CHARGING_HOST,
  YT_CHARGING_TERMINAL_3,
  DC_PILE_120KW,
  YT_CHARGING_TERMINAL_4,
  YT_CHARGING_TERMINAL_5,
  YT_AC_CHARGING_TERMINAL,

  // 遗弃
  // POWER_EXCHANGE_BOX = 'POWER_EXCHANGE_BOX',
}
// export const enum DeviceMark {
//   DC_PILE_160KW = 'DC_PILE_160KW',
//   YT_CHARGING_TERMINAL_1 = 'DC_PILE_160KW',
//   YT_CHARGING_TERMINAL_2 = 'YT_CHARGING_TERMINAL_2',
//   HW_CHARGING_TERMINAL_1 = 'HW_CHARGING_TERMINAL_1',
//   HW_CHARGING_TERMINAL_2 = 'HW_CHARGING_TERMINAL_2',
//   HW_CHARGING_TERMINAL_3 = 'HW_CHARGING_TERMINAL_3',
//   HW_CHARGING_STACK = 'HW_CHARGING_STACK',
//   BOX_TYPE_SUBSTATION = 'BOX_TYPE_SUBSTATION',

//   YT_ENERGY_STORAGE_BOX = 'YT_ENERGY_STORAGE_BOX',
//   HW_ENERGY_STORAGE_BOX = 'HW_ENERGY_STORAGE_BOX',

//   YT_CHARGING_HOST = 'YT_CHARGING_HOST',

//   ENERGY_CABINET = 'ENERGY_CABINET',
//   PV_CABINET = 'PV_CABINET',
//   PV_INVERTER_1 = 'PV_INVERTER_1',
//   PV_INVERTER_2 = 'PV_INVERTER_2',
//   DC_PILE_120KW = 'DC_PILE_120KW',

//   // 右侧
//   YT_CHARGING_TERMINAL_3 = 'YT_CHARGING_TERMINAL_3',
//   YT_CHARGING_TERMINAL_4 = 'YT_CHARGING_TERMINAL_4',
//   YT_CHARGING_TERMINAL_5 = 'YT_CHARGING_TERMINAL_5',
//   YT_AC_CHARGING_TERMINAL = 'YT_AC_CHARGING_TERMINAL',

//   // 遗弃
//   POWER_EXCHANGE_BOX = 'POWER_EXCHANGE_BOX',
// }

export interface CellConfigItem {
  key: string;
  mark?: DeviceMark;
  deviceName?: string;
  deviceId?: string | number | null;
  deviceType?: DeviceType;
  // 逆变器才有
  loopNum?: number;
  cellStyle: CellStyle;
  component: PureComponent | undefined;
  default?: PureComponent;
  active?: PureComponent;
  hover?: PureComponent;
}

export type DeviceInfoType = {
  deviceId: string | number;
  deviceType: DeviceType | null;
  deviceName?: string;
  mark?: DeviceMark;
  // 逆变器才有
  loopNum: number | undefined;
};

export interface CellStyle extends Pick<CSSProperties, 'cursor'> {
  width: number;
  height: number;
  left: number;
  top: number;
}

export const enum EventType {
  CLICK,
  MOUSE_OUT,
  MOUSE_ENTER,
}

export type DeviceListRes = {
  deviceId: number;
  mark?: any;
}[];
