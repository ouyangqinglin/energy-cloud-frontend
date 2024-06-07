import { ReactComponent as Icon_BASE } from '@/assets/image/screen/geometrySystem/icon_base.svg';
import Icon_PV from '@/assets/image/screen/geometrySystem/icon_pv.svg';
import Icon_PV_disable from '@/assets/image/screen/geometrySystem/icon_pv_disable.svg';
import Icon_FAN from '@/assets/image/screen/geometrySystem/icon_fan.svg';
import Icon_FAN_disable from '@/assets/image/screen/geometrySystem/icon_fan_disable.svg';

import Icon_SITEBASE from '@/assets/image/screen/geometrySystem/icon_site_base.svg';
import Icon_SITEBASE_disable from '@/assets/image/screen/geometrySystem/icon_site_base.svg';

import Icon_DIESEL from '@/assets/image/screen/geometrySystem/icon_diesel.svg';
import Icon_DIESEL_disable from '@/assets/image/screen/geometrySystem/icon_diesel_disable.svg';
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
    name: formatMessage({ id: 'device.pv', defaultMessage: '光伏' }),
    cellStyle: {
      width: 109,
      height: 106,
      left: 156,
      top: 291,
    },
    subsystemType: SubSystemType.PV,
    iconDisable: Icon_PV_disable,
    icon: Icon_PV,
  },
  {
    name: formatMessage({ id: 'screen.1010', defaultMessage: '风机' }),
    cellStyle: {
      width: 109,
      height: 115,
      left: 231,
      top: 327,
    },
    subsystemType: SubSystemType.F,
    iconDisable: Icon_FAN_disable,
    icon: Icon_FAN,
  },
  {
    name: formatMessage({ id: 'screen.1009', defaultMessage: '柴发' }),
    cellStyle: {
      width: 109,
      height: 106,
      left: 308,
      top: 381,
    },
    subsystemType: SubSystemType.D,
    iconDisable: Icon_DIESEL_disable,
    icon: Icon_DIESEL,
  },
  {
    name: formatMessage({ id: 'screen.foundationBed', defaultMessage: '基座' }),
    cellStyle: {
      width: 363,
      height: 223,
      left: 103,
      zIndex: -1,
      top: 301,
    },
    subsystemType: SubSystemType.PV || SubSystemType.F || SubSystemType.D,
    iconDisable: Icon_SITEBASE_disable,
    icon: Icon_SITEBASE,
  },
];
