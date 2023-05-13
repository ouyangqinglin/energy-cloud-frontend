import type { CSSProperties, PureComponent } from 'react';
import type { DeviceType } from './Dialog';

/**
 * @description 标记设备，方便识别设备id对应图上是哪个设备，mark的顺序为开发自己规定
 * 永泰160kW充电桩		1
 * 永泰2#充电终端		2
 * 永泰1#充电终端		3
 * 华为3#充电终端		4
 * 华为2#充电终端		5
 * 华为600kW充电堆		6
 * 市电进线柜(配电柜		7
 * 永泰工商业储能		8
 * 储能并网柜		9
 * 光伏并网柜		10
 * 1号逆变器		11
 * 2号逆变器		12
 * 永泰120kW充电桩		13
 */
export const enum DeviceMark {
  DC_PILE_160KW = 1,
  YT_CHARGING_TERMINAL_1,
  YT_CHARGING_TERMINAL_2,
  HW_CHARGING_TERMINAL_1,
  HW_CHARGING_TERMINAL_2,
  HW_CHARGING_STACK,
  BOX_TYPE_SUBSTATION,
  ENERGY_STORAGE_BOX,
  ENERGY_CABINET,
  PV_CABINET,
  PV_INVERTER_1,
  PV_INVERTER_2,
  DC_PILE_120KW,
}

export interface CellConfigItem {
  key: string;
  mark?: DeviceMark;
  name?: string;
  deviceId?: string | number;
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
