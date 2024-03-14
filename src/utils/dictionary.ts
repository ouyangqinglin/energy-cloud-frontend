/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-26 14:58:44
 * @LastEditTime: 2024-01-29 09:15:02
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\utils\dictionary.ts
 */

// import { formatMessage } from './index';
export enum RequestCode {
  NoToken = 500001,
  TokenExpire = 500003,
}

export enum MapTypeEnum {
  AMap,
  Google,
}

export const mapAks = {
  [MapTypeEnum.AMap]: [
    { key: '595f6302d987647e6c2cb83344e3c487', securityJsCode: '442c0d8de42797daebe1579fdcfcbccb' },
  ],
  [MapTypeEnum.Google]: [{ key: 'AIzaSyBnBWCK_zdES0iQPpyn5k14CUShUGgAUAQ' }],
};

export enum ChildSystemEnum {
  Pv = 1,
  Energy,
  Charge,
  Electric,
  Cabinet,
}

export enum EnergyEquipmentEnum {
  EMS = 1,
  BMS = 2,
  PCS = 3,
  AIR = 7,
  METER = 6,
}

export enum DeviceProductTypeEnum {
  Default = -1,
  ChargeStack = 510,
  FastChargeTerminal = 511,
  DCChargePile = 512,
  ACChargePile = 513,
  Energy = 514,
  PV = 515,
  ExchangeCabinet = 519,
  Battery = 520,
  OverchargeTerminal = 522,
  ChargeGun = 523,
  Ems = 524,
  BatteryStack = 526,
  BatteryPack = 528,
  Pcs = 536,
  BatteryCluster = 537,
  Air = 538,
  ElectricMeter = 539,
  LocalEms = 541,
  EnergyElectricMeter = 542,
  PvEnergy = 543,
  Dehumidifier = 544,
  FireFight = 545,
  ChargeMaster = 546,
  ChargeTerminal = 547,
}

export enum DeviceTypeEnum {
  Ems = 1,
  BatteryStack = 2,
  Pcs = 3,
  Air = 7,
  Gateway = 9,
  PvInverter11 = 11,
  YtCharge160 = 13,
  Energy = 16,
  ElectricMeter = 17,
  PvInverterCabinet = 18,
  HwCharge = 19,
  HwChargeSuperChild = 20,
  HwChargeChild = 21,
  HwChargeYt = 22,
  YtCharge120 = 24,
  YtCharge7 = 25,
  PvInverter4 = 28,
  EnergyCabinet = 30,
  BoxSubstation = 31,
  ExchangePowerCabinet = 32,
  YtCharge360 = 33,
  BatteryCluster = 34,
  PvInverter36 = 36,
  BWattEms = 37,
  BWattBatteryStack = 38,
  BWattPcs = 39,
  BWattElectricMeter = 40,
  BWattAir = 41,
  BWattBatteryCluster = 42,
  BWattEnergy = 44,
  YunCharge120 = 45,
  GRWTPvInverter = 47,
  //新增localEms
  YtCharge360LocalEms = 51,
  HwChargeLocalEms = 52,
  EnergyLocalEms = 54, //永泰工商业储能
  PvInverter4LocalEms = 55,
  PvInverter11LocalEms = 56,
  YtCharge160LocalEms = 57,
  YtCharge120LocalEms = 58,
  YTEnergyEms = 59,
  YTEnergyAir = 60,
  YTEnergyPcs = 61,
  YTEnergyMetter = 62,
  YTEnergyBatteryStack = 63,
  YTEnergy = 66,
  YTEnergyMetterRAIG = 67,
  YTEnergyMetterDTSD = 68,
  LiquidEnergyAir = 76,
  LiquidEnergyDehumidifier = 77,
  LiquidEnergyPcs = 79,
  LiquidEnergyBatteryStack = 80,
  LiquidEnergyEms = 83,
  LiquidEnergy = 84,
  LiquidEnergyFireFight = 85,
  YTEnergyMetterAKR = 87,
  Liquid2Ems = 89,
  Liquid2Air = 92,
  Liquid2ElectricMeter = 95,
  Liquid2InverterMeter = 96,
  Liquid2Energy = 97,
  Wind2EnergyEms = 98,
  Wind2BatteryStack = 106,
  Liquid2BatteryStack = 107,
  Wind2Energy = 105,
  Liquid2EnergyBatteryCluster = 107,
  ChargeY602 = 108,
  SmallEnergy = 109,
  SmallEnergyEms = 110,
  SmallEnergyBatteryCluster = 111,
  SmallEnergyAir = 113,
  SmallEnergyFireFight = 114,
  PvEnergy = 116,
  PvEnergyEms = 117,
  PvEnergyBms = 118,
  PvEnergyAir = 120,
  PvEnergyFirFight = 121,
  PvEnergyPcs = 122,
  ChargeY601 = 123,
  ChargeY802 = 124,
  ChargeGun = 125,
  ChargeS2801 = 126,
  ChargeMaster = 127,
  Charge2501 = 128,
  Charge2502 = 129,
  Charge6001 = 130,
  Charge6002 = 131,
  Charge5001 = 132,
  Charge5002 = 133,
  ChargeY801 = 134,
  FGCCEnergyEms = 136,
  FGCCEnergyAir = 137,
  FGCCEnergyPcs = 138,
  FGCCEnergyBatteryStack = 139,
  FGCCEnergy = 140,
  FGCCEnergyBatteryCluster = 142,
  FGCCEnergyBatteryModule = 141,
  FGCCEnergyWindTurbine = 143,
  Device = 'default',
}

export enum DeviceMasterMode {
  Master,
  Slave,
}

export type FileType = {
  url: string;
};

export type ListDataType = {
  id?: string;
  name?: string;
  children?: any[];
  [key: string]: any;
};

export enum AutoComStatusEnum {
  Complete = 'complete',
  Error = 'error',
  NoData = 'no_data',
}

export type EquipPropType = {
  key: string;
  type: string;
  value: string | number;
};

export type fieldType = {
  label: string;
  field: string;
};

export type AnyMapType = Record<string, any>;

export const useInfo = [
  { label: '占用', value: 1 },
  { label: '空闲', value: 0 },
];

export const weekInfoUS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const color = {};

export enum AmapLang {
  En = 'en',
  Zh = 'zh_cn',
  ZhEn = 'zh_en',
}

export const connectStatus = {
  2: {
    text: '未配置',
  },
  1: {
    text: '在线',
    status: 'Success',
  },
  0: {
    text: '离线',
    status: 'Error',
  },
};

export enum OnlineStatusEnum {
  Offline,
  Online,
  None,
}

export const onlineStatus = {
  [OnlineStatusEnum.None]: {
    text: '未配置',
    status: '',
  },
  [OnlineStatusEnum.Online]: {
    text: '在线',
    icon: 'green',
    status: 'Processing',
  },
  [OnlineStatusEnum.Offline]: {
    text: '离线',
    icon: 'red',
    status: 'Error',
  },
};

export const chargingAndDischargingStatus = {
  0: {
    text: '静置',
    status: 'Default',
  },
  1: {
    text: '放电',
    status: 'Processing',
  },
  2: {
    text: '充电',
    status: 'Error',
  },
};

export const chargingPutStatus = {
  0: {
    text: '充电',
  },
  1: {
    text: '放电',
  },
};

export const effectStatus = {
  0: {
    text: '有效',
    status: 'Success',
  },
  1: {
    text: '无效',
    status: 'Error',
  },
};

export const enableStatus = {
  0: {
    text: '禁用',
    status: 'Success',
  },
  1: {
    text: '启用',
    status: 'Error',
  },
};

export const alarmStatus = {
  0: {
    text: '告警中',
    status: 'Error',
  },
  1: {
    text: '已消除',
    status: 'Default',
  },
};

export const alarmClearStatus = {
  0: {
    text: '产生',
  },
  1: {
    text: '消除',
  },
};

// 0是停机，1是故障，2是运行
export const workStatus = {
  2: {
    text: '运行',
  },
  1: {
    text: '故障',
  },
  0: {
    text: '停机',
  },
};

export const systemMode = {
  0: {
    text: '手动模式',
  },
  1: {
    text: '自动模式',
  },
};

export const alarmSourceStatus = {
  1: {
    text: '平台告警',
  },
  0: {
    text: '设备告警',
  },
};

export const pageType = {
  0: '标准首页',
  1: '定制页',
};

export const serviceTypeMap = new Map([
  [0, '安装'],
  [1, '维护'],
]);

export const serviceProgressMap = new Map([
  [0, '已受理'],
  [1, '处理中'],
  [2, '完成'],
  [3, '完成'],
]);

export enum reportTypeEnum {
  Site = 0,
  Electric = 1,
  PvInverter = 2,
  Energy = 3,
  ChargeOrder = 41,
  ChargeBase = 4,
  Else = 5,
}

export const reportTypeSystemIdMap = new Map([
  [reportTypeEnum.PvInverter, ChildSystemEnum.Pv],
  [reportTypeEnum.Energy, ChildSystemEnum.Energy],
  [reportTypeEnum.ChargeBase, ChildSystemEnum.Charge],
  [reportTypeEnum.ChargeOrder, ChildSystemEnum.Charge],
]);

export enum timeDimensionEnum {
  Day,
  Month,
  Year,
  Cycle,
}

export const cleanUpType = {
  0: '自动恢复',
  1: '手动消除',
};

export const logType = {
  0: { text: '设备下行' },
  1: { text: '设备上报' },
  2: { text: '规则触发' },
};

export const operateUserType = {
  0: { text: '其它' },
  1: { text: '后台用户' },
  2: { text: '手机端用户' },
};

export const upgradeStatus = {
  0: { text: '升级中' },
  1: { text: '升级成功' },
  2: { text: '升级失败' },
};

export enum Size {
  small,
  normal,
  large,
}

export enum DeviceServicePageEnum {
  RunningData = 'runningData',
  RemoteControl = 'remoteControl',
  Config = 'config',
}

export const vehicleDrivingStatus = {
  0: { text: '休眠' },
  1: { text: '行驶' },
  2: { text: '离线' },
};

export const exchangeSiteStatus = {
  0: { text: '公有' },
  1: { text: '专用' },
};

export const operateStatus = {
  0: { text: '建设中' },
  1: { text: '营运中' },
  2: { text: '已停运' },
};

export const vehicleType = {
  0: { text: '牵引车' },
  1: { text: '混凝土搅拌车' },
};

export const chargeType = {
  0: { text: '换电站充电' },
};
