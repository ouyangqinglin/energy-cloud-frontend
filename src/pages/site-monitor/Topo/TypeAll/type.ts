import { SiteTypeEnum } from '@/utils/dictionary';

// (1, '光伏'), (2, '储能'), (3, '充电桩'), (4, '其他负载'), (5, '市电'), (6, '配电柜');
export const enum SubsystemTypeForNode {
  PV = 1,
  ES,
  CS,
  OTHER,
  SUPPLY,
  DC,
}

export interface AllTypeData {
  //光伏总发电量
  photovoltaicTotal: number;
  //站点总用电量
  siteTotal: number;
  //("光伏站点","1"),("储能站点","2"),("充电站点","3"),("光储站点","12"),("光储充站点","123"),("储充站点","23")
  energyOptions: SiteTypeEnum;
  mainsSupply: MainsSupply;
}

export interface MainsSupply {
  //(1, "光伏"),(2, "储能"),(3, "充电桩"),(4, "其他负载"),(5, "市电"),(6, "配电柜")
  type: SubsystemTypeForNode;
  //今日购电量/今日充电量/今日用电量
  todayConsumption: number;
  //今日售电量/今日放电量
  todayProduction?: any;
  //功率
  power: number;
  // 组串数量
  pvNum?: number;
  // 剩余电量
  dischargeableCapacity?: number;
  children: MainsSupply[];
  soc: number;
}
