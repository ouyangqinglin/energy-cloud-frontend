import { ReactComponent as Icon_PV } from '@/assets/image/screen/geometrySystem/icon_pv.svg';
import { ReactComponent as Icon_PV_disable } from '@/assets/image/screen/geometrySystem/icon_pv_disable.svg';
import { ReactComponent as Icon_PC } from '@/assets/image/screen/geometrySystem/icon_pc.svg';
import { ReactComponent as Icon_LOAD } from '@/assets/image/screen/geometrySystem/icon_load.svg';
import { ReactComponent as Icon_GE } from '@/assets/image/screen/geometrySystem/icon_ge.svg';
import { ReactComponent as Icon_ES } from '@/assets/image/screen/geometrySystem/icon_es.svg';
import { ReactComponent as Icon_ES_disable } from '@/assets/image/screen/geometrySystem/icon_es_disable.svg';
import { ReactComponent as Icon_BASE } from '@/assets/image/screen/geometrySystem/icon_base.svg';
import { SubSystemType } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import { CellStyle } from '../../Geometry/type';
import { ReactNode } from 'react';

export type CellConfig = {
  name: string;
  cellStyle: CellStyle;
  icon: ReactNode;
  iconDisable?: ReactNode;
  subsystemType?: SubSystemType;
  hide?: boolean;
};

export const config: CellConfig[] = [
  {
    name: '基座',
    cellStyle: {
      width: 340,
      height: 211,
      left: 288,
      top: 175,
    },
    icon: Icon_BASE,
  },
  {
    name: '市电',
    cellStyle: {
      width: 218,
      height: 170,
      left: 173,
      top: 86,
      zIndex: 1,
    },
    subsystemType: SubSystemType.E,
    icon: Icon_GE,
  },
  {
    name: '储能',
    cellStyle: {
      width: 218,
      height: 145,
      left: 532,
      top: 107,
      zIndex: 1,
    },
    subsystemType: SubSystemType.ES,
    icon: Icon_ES,
    iconDisable: Icon_ES_disable,
  },
  // 存在充电桩和负载
  {
    name: '用电',
    cellStyle: {
      width: 297,
      height: 229,
      left: 501,
      top: 276,
    },
    subsystemType: SubSystemType.CS,
    icon: Icon_PC,
  },
  {
    name: '负载',
    hide: true,
    cellStyle: {
      width: 297,
      height: 229,
      left: 501,
      top: 276,
    },
    subsystemType: SubSystemType.L,
    icon: Icon_LOAD,
  },
  {
    name: '光伏',
    cellStyle: {
      width: 218,
      height: 158,
      left: 173,
      top: 322,
    },
    subsystemType: SubSystemType.PV,
    iconDisable: Icon_PV_disable,
    icon: Icon_PV,
  },
];
