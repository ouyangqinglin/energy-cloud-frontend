import type { ReactNode } from 'react';

export type CardInfo = {
  title: string;
  icon: ReactNode;
  field?: keyof AllCardRes;
  value?: number;
  description: string;
  items: CardInfoItem[];
};

export type CardInfoItem = {
  label: string;
  field?: keyof AllCardRes;
  render?: (data: AllCardRes) => ReactNode;
  value?: number;
};

export interface AllCardRes
  extends ESCardRes,
    PVCardRes,
    OverViewCardRes,
    AlarmCardRes,
    EICardRes,
    EBCardRes,
    CSCardRes {}

export interface ESCardRes {
  //发电功率
  essGeneratedPower: number;
  //剩余电量
  dumpEnergy: number;
  //今日发电量
  essChargeElecToday: number;
  //今日放电量
  essDischargeElecToday: number;
  //累计发电量
  generatedElecTotal: number;
}

export interface PVCardRes {
  //发电功率
  pvGeneratedPower: number;
  //组件容量
  moduleCapacity: number;
  //今日发电量
  generatedElecToday: number;
  //累计发电量
  generatedElecTotal: number;
}
export interface OverViewCardRes {
  //总站点数
  powerStationCount: number;
  //光储充站数
  pvAndEssAndChargePowerStationCount: number;
  //光
  pvPowerStationCount: number;
  //充
  chargePowerStationCount: number;
  //储
  essPowerStationCount: number;
  //光储
  pvAndEssPowerStationCount: number;
  //储充
  essAndChargePowerStationCount: number;
}
export interface AlarmCardRes {
  //总条数
  totalNum: number;
  //严重条数
  errorNum: number;
  //重要条数
  alarmNum: number;
  //次要条数
  warnNum: number;
  //提示条数
  infoNum: number;
}

export interface EICardRes {
  //光伏日收益
  pvGainsDay: number;
  //储能日收益
  essGainsDay: number;
  //充电桩日收益
  chargingPileGainsDay: number;
  //总日收益
  gainsDay: number;
  //光伏累计收益
  pvGainsTotal: number;
  //储能累计收益
  essGainsTotal: number;
  //充电桩累计收益
  chargingPileGainsTotal: number;
  //总累计收益
  gainsTotal: number;
}

export interface EBCardRes {
  //累计CO2减排/t
  totalReduceCO2: number;
  //当日等效植树
  equivalentTreeNum: number;
  //当日CO2减排
  todayReduceCO2: number;
  //当日节约标准媒
  todayReduceCoal: number;
}

export interface CSCardRes {
  //充电功率
  chargePower: number;
  //充电桩天充电量
  cpChargeElecToday: number;
  //充电桩累计充电量
  cpChargeElecTotal: number;
  //空闲枪数
  leisureGunNum: number;
  //使用枪数
  beUsingGunNum: number;
}
