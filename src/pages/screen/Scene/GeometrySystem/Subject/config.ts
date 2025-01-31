import { ReactComponent as Icon_BASE } from '@/assets/image/screen/geometrySystem/icon_base.svg';

import Icon_PV from '@/assets/image/screen/geometrySystem/icon_pv.svg';
import Icon_PV_DISABLE from '@/assets/image/screen/geometrySystem/icon_pv_disable.svg';
import Icon_FAN from '@/assets/image/screen/geometrySystem/icon_fan.svg';
import Icon_DIESEL from '@/assets/image/screen/geometrySystem/icon_diesel.svg';
import Icon_PV_FAN from '@/assets/image/screen/geometrySystem/icon_pv_fan.svg';
import Icon_PV_DIESEL from '@/assets/image/screen/geometrySystem/icon_pv_diesel.svg';
import Icon_FAN_DIESEL from '@/assets/image/screen/geometrySystem/icon_fan_diesel.svg';
import Icon_PV_FAN_DIESEL from '@/assets/image/screen/geometrySystem/icon_pv_fan_diesel.svg';

import Icon_PV_US from '@/assets/image/screen/geometrySystem/icon_pv_us.svg';
import Icon_PV_DISABLE_US from '@/assets/image/screen/geometrySystem/icon_pv_disable_us.svg';
import Icon_FAN_US from '@/assets/image/screen/geometrySystem/icon_fan_us.svg';
import Icon_DIESEL_US from '@/assets/image/screen/geometrySystem/icon_diesel_us.svg';
import Icon_PV_FAN_US from '@/assets/image/screen/geometrySystem/icon_pv_fan_us.svg';
import Icon_PV_DIESEL_US from '@/assets/image/screen/geometrySystem/icon_pv_diesel_us.svg';
import Icon_FAN_DIESEL_US from '@/assets/image/screen/geometrySystem/icon_fan_diesel_us.svg';
import Icon_PV_FAN_DIESEL_US from '@/assets/image/screen/geometrySystem/icon_pv_fan_diesel_us.svg';

import Icon_PC from '@/assets/image/screen/geometrySystem/icon_pc.png';
import Icon_LOAD from '@/assets/image/screen/geometrySystem/icon_load.png';
import Icon_GE from '@/assets/image/screen/geometrySystem/icon_ge.png';
import Icon_ES from '@/assets/image/screen/geometrySystem/icon_es.png';
import Icon_ES_disable from '@/assets/image/screen/geometrySystem/icon_es_disable.png';
//EN_ICON
import Icon_PC_US from '@/assets/image/screen/geometrySystem/icon_pc_us.png';
import Icon_LOAD_US from '@/assets/image/screen/geometrySystem/icon_load_us.png';
import Icon_GE_US from '@/assets/image/screen/geometrySystem/icon_ge_us.png';
import Icon_ES_US from '@/assets/image/screen/geometrySystem/icon_es_us.png';
import Icon_ES_disable_US from '@/assets/image/screen/geometrySystem/icon_es_disable_us.png';

// import Icon_BASE from '@/assets/image/screen/geometrySystem/icon_base.png';
import { SubSystemType } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import type { CellStyle } from '../../Geometry/type';
import { getLocale } from '@/utils';
import type { ReactNode } from 'react';
import { formatMessage } from '@/utils';
const isUS = getLocale().isEnUS;

export type CellConfig = {
  name: string;
  cellStyle: CellStyle;
  icon: ReactNode;
  isSVG?: boolean;
  iconDisable?: ReactNode;
  subsystemType?: SubSystemType;
  hide?: boolean;
};

export const groupSvg = {
  icon_pv_disable: Icon_PV_DISABLE,
  icon_pv: Icon_PV,
  icon_fan: Icon_FAN,
  icon_diesel: Icon_DIESEL,
  icon_pv_fan: Icon_PV_FAN,
  icon_pv_diesel: Icon_PV_DIESEL,
  icon_fan_diesel: Icon_FAN_DIESEL,
  icon_pv_fan_diesel: Icon_PV_FAN_DIESEL,
  icon_pv_disable_us: Icon_PV_DISABLE_US,
  icon_pv_us: Icon_PV_US,
  icon_fan_us: Icon_FAN_US,
  icon_diesel_us: Icon_DIESEL_US,
  icon_pv_fan_us: Icon_PV_FAN_US,
  icon_pv_diesel_us: Icon_PV_DIESEL_US,
  icon_fan_diesel_us: Icon_FAN_DIESEL_US,
  icon_pv_fan_diesel_us: Icon_PV_FAN_DIESEL_US,
};

export const config: CellConfig[] = [
  {
    name: formatMessage({ id: 'screen.foundationBed', defaultMessage: '基座' }),
    isSVG: true,
    cellStyle: {
      width: 340,
      height: 211,
      left: 288,
      top: 175,
    },
    icon: Icon_BASE,
  },
  {
    name: formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' }),
    cellStyle: {
      width: 218,
      height: 170,
      left: 173,
      top: 86,
      zIndex: 1,
    },
    subsystemType: SubSystemType.E,
    icon: isUS ? Icon_GE_US : Icon_GE,
  },
  {
    name: formatMessage({ id: 'device.storage', defaultMessage: '储能' }),
    cellStyle: {
      width: 218,
      height: 145,
      left: 532,
      top: 107,
      zIndex: 1,
    },
    subsystemType: SubSystemType.ES,
    icon: isUS ? Icon_ES_US : Icon_ES,
    iconDisable: isUS ? Icon_ES_disable_US : Icon_ES_disable,
  },
  // 存在充电桩和负载
  {
    name: formatMessage({ id: 'screen.electricityConsumption', defaultMessage: '用电' }),
    cellStyle: {
      width: 297,
      height: 229,
      left: 501,
      top: 276,
      zIndex: 1,
    },
    subsystemType: SubSystemType.CS,
    icon: isUS ? Icon_PC_US : Icon_PC,
  },
  {
    name: formatMessage({ id: 'device.load', defaultMessage: '负载' }),
    hide: true,
    cellStyle: {
      width: 297,
      height: 229,
      left: 501,
      top: 276,
      zIndex: 1,
    },
    subsystemType: SubSystemType.L,
    icon: isUS ? Icon_LOAD_US : Icon_LOAD,
  },
  {
    name: formatMessage({ id: 'screen.1017', defaultMessage: '组合' }),
    cellStyle: {
      width: 109,
      height: 106,
      left: 156,
      top: 291,
    },
    subsystemType: SubSystemType.GROUP,
    icon: Icon_PV,
  },
];
