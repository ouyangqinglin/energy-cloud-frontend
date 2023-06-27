export interface BenefitsRes {
  cumulativeTree: string;
  conserveEnergyReduceEmissions: string;
  monthEconomicPerformance: string;
  yearEconomicPerformance: string;
  cumulativeEconomicPerformance: string;
  siteId: number;
  todayEconomicPerformance: string;
}

export const enum AlarmLevel {
  // 提示
  info = 'info',
  // 次要
  warn = 'warn',
  // 重要
  alarm = 'warn',
  //严重
  error = 'error',
}

export const enum AlarmStatus {
  UNRESOLVED,
  RESOLVED,
}

export interface DeviceAlarm {
  alarmTime: string;
  content: string;
  detailInfo: string;
  deviceId: number;
  deviceName: string;
  fromResource: number;
  functionKey: string;
  // 	告警id
  id: number;
  isConfirm: number;
  level: string;
  name: string;
  productTypeName: string;
  // 是否已处理 0未处理 1已处理
  status: AlarmStatus;
}
