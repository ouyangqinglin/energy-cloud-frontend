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

export interface DeviceAlarm {
  alarmTime: string;
  content: string;
  detailInfo: string;
  deviceId: number;
  deviceName: string;
  fromResource: number;
  functionKey: string;
  id: number;
  isConfirm: number;
  level: string;
  name: string;
  productTypeName: string;
  status: number;
}
