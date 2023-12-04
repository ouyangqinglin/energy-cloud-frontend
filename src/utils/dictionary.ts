/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-26 14:58:44
 * @LastEditTime: 2023-11-20 13:54:03
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\utils\dictionary.ts
 */

export enum RequestCode {
  NoToken = 500001,
  TokenExpire = 500003,
}

export const aks = [
  { key: '595f6302d987647e6c2cb83344e3c487', securityJsCode: '442c0d8de42797daebe1579fdcfcbccb' },
];

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
  Cabinet = 32,
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
  PvEnergy = 69,
  PvEnergyAir = 71,
  PvEnergyPcs = 74,
  PvEnergyMeter = 75,
  PvEnergyBms = 70,
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

export const weekInfo = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];

export const color = {};

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

export const buildStatus = {
  1: {
    text: '已交付',
    status: 'Success',
  },
  0: {
    text: '建设中',
    status: 'Processing',
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
    text: '正常',
    status: 'Success',
  },
  1: {
    text: '异常',
    status: 'Error',
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

export const deviceAlarmStatus = {
  1: {
    text: '告警',
    status: 'Error',
    icon: 'red',
  },
  0: {
    text: '正常',
    status: 'Success',
    icon: 'green',
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

export const dataSaveTime = {
  0: '一个月',
  1: '三个月',
  2: '六个月',
  3: '一年',
};

export const noticeMethod = {
  0: '不通知',
  1: '短信',
  2: '邮件',
  3: '短信+邮件',
};

export enum reportTypeEnum {
  Site = 0,
  Electric = 1,
  PvInverter = 2,
  Energy = 3,
  ChargeOrder = 41,
  ChargeBase = 4,
  Else = 5,
}

export const reportType = new Map([
  [reportTypeEnum.Site, '站点报表'],
  [reportTypeEnum.Electric, '市电报表'],
  [reportTypeEnum.PvInverter, '光伏报表'],
  [reportTypeEnum.Energy, '储能报表'],
  [reportTypeEnum.ChargeOrder, '充电桩订单报表'],
  [reportTypeEnum.ChargeBase, '充电桩基础报表'],
  [reportTypeEnum.Else, '其他负载报表'],
]);

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

export const timeDimension = new Map([
  [timeDimensionEnum.Day, { text: '按日统计', format: 'YYYY-MM-DD' }],
  [timeDimensionEnum.Month, { text: '按月统计', format: 'YYYY-MM' }],
  [timeDimensionEnum.Year, { text: '按年统计', format: 'YYYY' }],
  [timeDimensionEnum.Cycle, { text: '按生命周期统计' }],
]);

export const cleanUpType = {
  0: '自动恢复',
  1: '手动清除',
};

export const logType = {
  0: { text: '设备下行' },
  1: { text: '设备上报' },
  2: { text: '规则触发' },
};

export const enum SiteTypeEnum {
  PV = 1,
  ES = 2,
  CS = 3,
  ES_CS = 23,
  PV_ES = 12,
  PV_ES_CS = 123,
  Exchange = 4,
}

export type SiteTypeEnumType = `${(typeof SiteTypeEnum)[keyof typeof SiteTypeEnum]}`;

export const siteType = {
  0: { text: '全部' },
  [SiteTypeEnum.PV]: { text: '光伏站点' },
  [SiteTypeEnum.ES]: { text: '储能站点' },
  [SiteTypeEnum.CS]: { text: '充电站点' },
  [SiteTypeEnum.ES_CS]: { text: '储充站点' },
  [SiteTypeEnum.PV_ES]: { text: '光储站点' },
  [SiteTypeEnum.PV_ES_CS]: { text: '光储充站点' },
};

export const operateUserType = {
  0: { text: '其它' },
  1: { text: '后台用户' },
  2: { text: '手机端用户' },
};

export const electricMoneyMap = new Map([
  [1, '需量电费'],
  [0, '容量电费'],
]);

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
