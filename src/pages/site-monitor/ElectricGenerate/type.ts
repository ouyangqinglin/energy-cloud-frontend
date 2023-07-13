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
"generatingElectricityInverter": 0, //正在发电逆变器数量
"noGenerateElectricityInverter": 2, //未发电逆变器数量
"generatingElectricityPv": 0, //正在发电组串数量
"noGenerateElectricityPv": 20, //未发电组串数量
"lowEfficiencyGeneratingElectricityPv": 0, //低效发电组串数量
"offline": 1, //通信断链
"selfUseRate": 100, //自发自用比例
"selfSufficiencyRate": 1 //自给自足比例