// import { ReactComponent as Icon_PV } from '@/assets/image/screen/geometrySystem/icon_pv.svg';
// import { ReactComponent as Icon_PV_disable } from '@/assets/image/screen/geometrySystem/icon_pv_disable.svg';
// import { ReactComponent as Icon_PC } from '@/assets/image/screen/geometrySystem/icon_pc.svg';
// import { ReactComponent as Icon_LOAD } from '@/assets/image/screen/geometrySystem/icon_load.svg';
// import { ReactComponent as Icon_GE } from '@/assets/image/screen/geometrySystem/icon_ge.svg';
// import { ReactComponent as Icon_ES } from '@/assets/image/screen/geometrySystem/icon_es.svg';
// import { ReactComponent as Icon_ES_disable } from '@/assets/image/screen/geometrySystem/icon_es_disable.svg';
//CN_ICON
import { ReactComponent as Icon_BASE } from '@/assets/image/screen/geometrySystem/icon_base.svg';
import Icon_PV from '@/assets/image/screen/geometrySystem/icon_pv.png';
import Icon_PV_disable from '@/assets/image/screen/geometrySystem/icon_pv_disable.png';
import Icon_PC from '@/assets/image/screen/geometrySystem/icon_pc.png';
import Icon_LOAD from '@/assets/image/screen/geometrySystem/icon_load.png';
import Icon_GE from '@/assets/image/screen/geometrySystem/icon_ge.png';
import Icon_ES from '@/assets/image/screen/geometrySystem/icon_es.png';
import Icon_ES_disable from '@/assets/image/screen/geometrySystem/icon_es_disable.png';
//EN_ICON
import Icon_PV_US from '@/assets/image/screen/geometrySystem/icon_pv_us.png';
import Icon_PV_disable_US from '@/assets/image/screen/geometrySystem/icon_pv_disable_us.png';
import Icon_PC_US from '@/assets/image/screen/geometrySystem/icon_pc_us.png';
import Icon_LOAD_US from '@/assets/image/screen/geometrySystem/icon_load_us.png';
import Icon_GE_US from '@/assets/image/screen/geometrySystem/icon_ge_us.png';
import Icon_ES_US from '@/assets/image/screen/geometrySystem/icon_es_us.png';
import Icon_ES_disable_US from '@/assets/image/screen/geometrySystem/icon_es_disable_us.png';

// import Icon_BASE from '@/assets/image/screen/geometrySystem/icon_base.png';
import { SubSystemType } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import { CellStyle } from '../../Geometry/type';
import { getLocale } from '@/utils';
import { ReactNode } from 'react';
import { formatMessage } from '@/utils';
const isUS = getLocale() == 'en-US';

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
      width: 218,
      height: 158,
      left: 173,
      top: 322,
    },
    subsystemType: SubSystemType.PV,
    iconDisable: isUS ? Icon_PV_disable_US : Icon_PV_disable,
    icon: isUS ? Icon_PV_US : Icon_PV,
  },
];
