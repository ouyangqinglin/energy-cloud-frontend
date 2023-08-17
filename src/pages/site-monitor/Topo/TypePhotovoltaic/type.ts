export interface PvPanelVoList {
  // 编号
  serialNumber: string;
  // 接口
  inverterPort: string;
  voltage: number;
  current: number;
  //0 未发电   1发电
  status: number;
}

export interface PvInverterVoList {
  //逆变器天发电量
  generateElecDay?: number;
  //逆变器功率
  generatePowerDay?: number;
  pvPanelVoList: PvPanelVoList[];
}

export interface TypePhotovoltaicData {
  totalGenerateElec: number;
  totalGeneratePower: number;
  pvInverterVoList: PvInverterVoList[];
}
