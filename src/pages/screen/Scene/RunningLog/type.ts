export interface BenefitsRes {
  cumulativeTree: string;
  conserveEnergyReduceEmissions: string;
  monthEconomicPerformance: string;
  yearEconomicPerformance: string;
  cumulativeEconomicPerformance: string;
  siteId: number;
  todayEconomicPerformance: string;
}

export type DeviceLog = {
  createTime: string;
  logContent: string;
  deviceName: string;
};
