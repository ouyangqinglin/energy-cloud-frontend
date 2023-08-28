/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-26 14:58:44
 * @LastEditTime: 2023-08-25 15:09:44
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\utils\dictionary.ts
 */

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
  Gateway = 9,
  ElectricMeter = 17,
  PvInverter11 = 11,
  PvInverter4 = 28,
  PvInverter36 = 36,
  YtCharge160 = 13,
  Energy = 16,
  PvInverterCabinet = 18,
  HwCharge = 19,
  YtCharge120 = 24,
  EnergyCabinet = 30,
  BoxSubstation = 31,
  Cabinet = 32,
  HwChargeChild = 21,
  HwChargeYt = 22,
  BatteryStack = 2,
  BatteryCluster = 34,
  Pcs = 3,
  Ems = 1,
  Air = 7,
  Device = 'default',
}

export enum FormTypeEnum {
  Add = 'add',
  Edit = 'edit',
  Detail = 'detail',
}

export enum DeviceModelTypeEnum {
  Int = 'int',
  Long = 'long',
  Double = 'double',
  String = 'string',
  Boolean = 'boolean',
  Enum = 'enum',
  Struct = 'struct',
  Array = 'array',
}

export type FileType = {
  url: string;
};

export type LocationType<Params = Record<string, any>> = {
  query?: Params;
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

export type OptionType = {
  label: string;
  value: string | number;
  [key: string]: any;
};

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

export const runningState = {
  1: {
    text: '正常',
    status: 'Success',
  },
  0: {
    text: '异常',
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
  1: {
    text: '放电',
    status: 'Processing',
  },
  0: {
    text: '充电',
    status: 'Error',
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
