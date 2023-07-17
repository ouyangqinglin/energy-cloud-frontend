export interface ElectricGenerateInfo {
  siteId: number;
  siteName: string;
  deviceId: number;
  deviceName: string;
  connectStatus: number;
  sn: string;
  ipv1: number;
  ipv2: number;
  ipv3: number;
  ipv4: number;
  ipv5: number;
  ipv6: number;
  ipv7: number;
  ipv8: number;
  ipv9: number;
  ipv10: number;
  ipv11: number;
  ipv12: number;
}

export interface ElectricGenerateStatistic {
  generatingElectricityInverter: number;
  noGenerateElectricityInverter: number;
  generatingElectricityPv: number;
  noGenerateElectricityPv: number;
  lowEfficiencyGeneratingElectricityPv: number;
  offline: number;
  selfUseRate: number;
  selfSufficiencyRate: number;
}
