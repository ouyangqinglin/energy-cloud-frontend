import { CSSProperties, PureComponent } from 'react';
import { DeviceType } from '../Dialog';

export interface CellConfigItem {
  key: string;
  name?: string;
  deviceId?: string;
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
  deviceId: string;
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
