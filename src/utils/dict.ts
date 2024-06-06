/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-22 15:11:07
 * @LastEditTime: 2024-06-06 09:00:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\utils\dict.ts
 */
import { OptionType, ValueEnum } from '@/types';
import { MapTypeEnum, reportTypeEnum, timeDimensionEnum } from './dictionary';
import { formatMessage } from './index';

export const alarmSource = {
  0: {
    text: formatMessage({ id: 'device.deviceSide', defaultMessage: '设备端' }),
  },
  1: {
    text: formatMessage({ id: 'device.platformRules', defaultMessage: '平台规则' }),
  },
};
export const electricMoneyMap = new Map([
  [1, formatMessage({ id: 'siteManage.set.demandCharge', defaultMessage: '需量电费' })],
  [0, formatMessage({ id: 'siteManage.set.capacityCharge', defaultMessage: '容量电费' })],
]);

export const runningState = {
  1: {
    text: formatMessage({ id: 'common.normal', defaultMessage: '正常' }),
    status: 'Success',
  },
  0: {
    text: formatMessage({ id: 'common.abnormal', defaultMessage: '异常' }),
    status: 'Error',
  },
};

export const buildStatus = {
  1: {
    text: formatMessage({ id: 'siteManage.set.siteStatusSuccess', defaultMessage: '已交付' }),
    status: 'Success',
  },
  0: {
    text: formatMessage({ id: 'siteManage.set.siteStatusProcessing', defaultMessage: '建设中' }),
    status: 'Processing',
  },
};

export const enableStatus = {
  0: {
    text: formatMessage({ id: 'common.disable', defaultMessage: '禁用' }),
    status: 'Success',
  },
  1: {
    text: formatMessage({ id: 'common.enable', defaultMessage: '启用' }),
    status: 'Error',
  },
};

export const jumpMethodEnum = {
  0: {
    text: formatMessage({ id: 'common.1001', defaultMessage: '直接跳转' }),
    status: 'Success',
  },
  1: {
    text: formatMessage({ id: 'common.1002', defaultMessage: 'SSO跳转' }),
    status: 'Error',
  },
};

export const dataSaveTime = {
  0: formatMessage({ id: 'common.time.oneMonth', defaultMessage: '一个月' }),
  1: formatMessage({ id: 'common.time.threeMonth', defaultMessage: '三个月' }),
  2: formatMessage({ id: 'common.time.sixMonth', defaultMessage: '六个月' }),
  3: formatMessage({ id: 'common.time.oneYear', defaultMessage: '一年' }),
};

export const noticeMethod = {
  0: formatMessage({ id: 'common.notInform', defaultMessage: '不通知' }),
  1: formatMessage({ id: 'common.shortMessage', defaultMessage: '短信' }),
  2: formatMessage({ id: 'common.email', defaultMessage: '邮件' }),
  3: formatMessage({ id: 'common.SMSAndEmail', defaultMessage: '短信+邮件' }),
};

export const deviceAlarmStatus = {
  1: {
    text: formatMessage({ id: 'common.warning', defaultMessage: '告警' }),
    status: 'Processing',
    icon: 'red',
  },
  0: {
    text: formatMessage({ id: 'common.normal', defaultMessage: '正常' }),
    status: 'Success',
    icon: 'green',
  },
};

export enum OnlineStatusEnum {
  Offline,
  Online,
  None,
}

export const onlineStatus: ValueEnum = {
  [OnlineStatusEnum.None]: {
    text: formatMessage({ id: 'common.notConfigured', defaultMessage: '未配置' }),
    status: '',
  },
  [OnlineStatusEnum.Online]: {
    text: formatMessage({ id: 'common.onLine', defaultMessage: '在线' }),
    icon: 'green',
    status: 'Processing',
  },
  [OnlineStatusEnum.Offline]: {
    text: formatMessage({ id: 'common.offline', defaultMessage: '离线' }),
    icon: 'red',
    status: 'Default',
  },
};

export enum ChargingTypeEnum {
  Card,
  App,
  LocalManage,
  Vin,
  PassWord,
  Hand,
}

export const ChargingType: ValueEnum = {
  [ChargingTypeEnum.Card]: {
    text: formatMessage({ id: 'device.card', defaultMessage: '刷卡' }),
  },
  [ChargingTypeEnum.App]: {
    text: formatMessage({ id: 'device.app', defaultMessage: 'App启动' }),
  },
  [ChargingTypeEnum.LocalManage]: {
    text: formatMessage({ id: 'device.localManage', defaultMessage: '本地管理员' }),
  },
  [ChargingTypeEnum.Vin]: {
    text: formatMessage({ id: 'device.vin', defaultMessage: 'Vin码' }),
  },
  [ChargingTypeEnum.PassWord]: {
    text: formatMessage({ id: 'device.passWord', defaultMessage: '密码' }),
  },
  [ChargingTypeEnum.Hand]: {
    text: formatMessage({ id: 'device.hand', defaultMessage: '手动' }),
  },
};

export enum GunTypeEnum {
  DC = 1,
  AC = 2,
}

export const GunType: ValueEnum = {
  [GunTypeEnum.DC]: {
    text: formatMessage({ id: 'device.DC', defaultMessage: '直流' }),
  },
  [GunTypeEnum.AC]: {
    text: formatMessage({ id: 'device.AC', defaultMessage: '交流' }),
  },
};

export enum SourceTypeEnum {
  Voltage12V,
  Voltage24V,
}

export const SourceType: ValueEnum = {
  [SourceTypeEnum.Voltage12V]: {
    text: '12V',
  },
  [SourceTypeEnum.Voltage24V]: {
    text: '24V',
  },
};

export enum ServerTypeEnum {
  Null,
  SINOPEC,
  XIAOJI,
  JoinFastCharge,
  None,
  FastCharg,
  StateGrid,
  SANYUN,
  ZHJN,
  PT,
  XXCD,
  XX,
  XYSPT,
  YKCen,
}

export const ServerType: ValueEnum = {
  [ServerTypeEnum.Null]: {
    text: formatMessage({ id: 'device.not', defaultMessage: '无' }),
  },
  [ServerTypeEnum.SINOPEC]: {
    text: formatMessage({ id: 'device.SINOPEC', defaultMessage: '中石化' }),
  },
  [ServerTypeEnum.XIAOJI]: {
    text: formatMessage({ id: 'device.XIAOJI', defaultMessage: '小桔' }),
  },
  [ServerTypeEnum.JoinFastCharge]: {
    text: formatMessage({ id: 'device.JoinFastCharge', defaultMessage: '联合快充' }),
  },
  [ServerTypeEnum.None]: {
    text: formatMessage({ id: 'device.None', defaultMessage: '暂无' }),
  },
  [ServerTypeEnum.FastCharg]: {
    text: formatMessage({ id: 'device.FastCharg', defaultMessage: '速充' }),
  },
  [ServerTypeEnum.StateGrid]: {
    text: formatMessage({ id: 'device.StateGrid', defaultMessage: '国网电动' }),
  },
  [ServerTypeEnum.SANYUN]: {
    text: formatMessage({ id: 'device.SANYUN', defaultMessage: '三盈' }),
  },
  [ServerTypeEnum.ZHJN]: {
    text: formatMessage({ id: 'device.ZHJN', defaultMessage: '中核汇能' }),
  },
  [ServerTypeEnum.PT]: {
    text: formatMessage({ id: 'device.PT', defaultMessage: '普天' }),
  },
  [ServerTypeEnum.XXCD]: {
    text: formatMessage({ id: 'device.XXCD', defaultMessage: '星星充电' }),
  },
  [ServerTypeEnum.XX]: {
    text: formatMessage({ id: 'device.XX', defaultMessage: '协鑫' }),
  },
  [ServerTypeEnum.XYSPT]: {
    text: formatMessage({ id: 'device.XYSPT', defaultMessage: '三盈双平台监控后台' }),
  },
  [ServerTypeEnum.YKCen]: {
    text: formatMessage({ id: 'device.YKCen', defaultMessage: '云快充等' }),
  },
};

export enum ChargingStrategyEnum {
  Auto,
  Time,
  Money,
  Quantity,
  SOC,
}

export const ChargingStrategy: ValueEnum = {
  [ChargingStrategyEnum.Auto]: {
    text: formatMessage({ id: 'device.auto', defaultMessage: '自动充满' }),
  },
  [ChargingStrategyEnum.Time]: {
    text: formatMessage({ id: 'device.time', defaultMessage: '按时间' }),
  },
  [ChargingStrategyEnum.Money]: {
    text: formatMessage({ id: 'device.money', defaultMessage: '按金额' }),
  },
  [ChargingStrategyEnum.Quantity]: {
    text: formatMessage({ id: 'device.quantity', defaultMessage: '按电量' }),
  },
  [ChargingStrategyEnum.SOC]: {
    text: formatMessage({ id: 'device.soc', defaultMessage: '按soc' }),
  },
};

export const onInstallStatus = {
  0: {
    text: formatMessage({ id: 'equipmentList.unInstall', defaultMessage: '未安装' }),
  },
  1: {
    text: formatMessage({ id: 'equipmentList.installed', defaultMessage: '已安装' }),
  },
};

export const onlineStatus1 = {
  [OnlineStatusEnum.None]: {
    text: formatMessage({ id: 'common.notConfigured', defaultMessage: '未配置' }),
    status: '',
  },
  [OnlineStatusEnum.Offline]: {
    text: formatMessage({ id: 'common.onLine', defaultMessage: '在线' }),
    icon: 'green',
    status: 'Processing',
  },
  [OnlineStatusEnum.Online]: {
    text: formatMessage({ id: 'common.offline', defaultMessage: '离线' }),
    icon: 'red',
    status: 'Default',
  },
};

export const connectStatus = {
  2: {
    text: formatMessage({ id: 'common.notConfigured', defaultMessage: '未配置' }),
  },
  1: {
    text: formatMessage({ id: 'common.onLine', defaultMessage: '在线' }),
    status: 'Success',
  },
  0: {
    text: formatMessage({ id: 'common.offline', defaultMessage: '离线' }),
    status: 'Error',
  },
};

export const alarmStatus = {
  0: {
    text: formatMessage({ id: 'common.alarming', defaultMessage: '告警中' }),
    status: 'Error',
  },
  1: {
    text: formatMessage({ id: 'common.eliminated', defaultMessage: '已消除' }),
    status: 'Default',
  },
};

export const alarmStatus1 = {
  0: {
    text: formatMessage({ id: 'common.normal', defaultMessage: '正常' }),
    status: 'success',
  },
  1: {
    text: formatMessage({ id: 'common.warning', defaultMessage: '告警' }),
    status: 'Error',
  },
};

export const chargingAndDischargingStatus = {
  0: {
    text: formatMessage({ id: 'common.stewing', defaultMessage: '静置' }),
    status: 'Default',
  },
  1: {
    text: formatMessage({ id: 'siteMonitor.discharge', defaultMessage: '放电' }),
    status: 'Warning',
  },
  2: {
    text: formatMessage({ id: 'siteMonitor.charge', defaultMessage: '充电' }),
    status: 'Processing',
  },
};

export const chargeAndDischargeStatus: ValueEnum = {
  0: {
    text: formatMessage({ id: 'device.discharge', defaultMessage: '放电' }),
  },
  1: {
    text: formatMessage({ id: 'device.charge', defaultMessage: '充电' }),
  },
};

export const systemMode = {
  0: {
    text: formatMessage({ id: 'siteMonitor.manualMode', defaultMessage: '手动模式' }),
  },
  1: {
    text: formatMessage({ id: 'siteMonitor.autoMode', defaultMessage: '自动模式' }),
  },
};

// 0是停机，1是故障，2是运行
export const workStatus = {
  2: {
    text: formatMessage({ id: 'siteMonitor.run', defaultMessage: '运行' }),
  },
  1: {
    text: formatMessage({ id: 'siteMonitor.fault', defaultMessage: '故障' }),
  },
  0: {
    text: formatMessage({ id: 'siteMonitor.halt', defaultMessage: '停机' }),
  },
};

export const logType = {
  0: { text: formatMessage({ id: 'siteMonitor.deviceDownlink', defaultMessage: '设备下行' }) },
  1: { text: formatMessage({ id: 'siteMonitor.deviceReport', defaultMessage: '设备上报' }) },
  2: { text: formatMessage({ id: 'siteMonitor.ruleTriggering', defaultMessage: '规则触发' }) },
};

export const reportType = new Map([
  [reportTypeEnum.Site, formatMessage({ id: 'dataManage.siteReport', defaultMessage: '站点报表' })],
  [
    reportTypeEnum.Electric,
    formatMessage({ id: 'dataManage.mainsReport', defaultMessage: '市电报表' }),
  ],
  [
    reportTypeEnum.PvInverter,
    formatMessage({ id: 'dataManage.pvReport', defaultMessage: '光伏报表' }),
  ],
  [
    reportTypeEnum.Energy,
    formatMessage({ id: 'dataManage.storageReport', defaultMessage: '储能报表' }),
  ],
  [
    reportTypeEnum.ChargeOrder,
    formatMessage({ id: 'dataManage.chargingOrderReport', defaultMessage: '充电桩订单报表' }),
  ],
  [
    reportTypeEnum.ChargeBase,
    formatMessage({ id: 'dataManage.chargingFoundationReport', defaultMessage: '充电桩基础报表' }),
  ],
  [
    reportTypeEnum.Else,
    formatMessage({ id: 'dataManage.otherLoadReport', defaultMessage: '其他负载报表' }),
  ],
]);

export const timeDimension = new Map([
  [
    timeDimensionEnum.Day,
    {
      text: formatMessage({ id: 'dataManage.dayStatistics', defaultMessage: '按日统计' }),
      format: 'YYYY-MM-DD',
    },
  ],
  [
    timeDimensionEnum.Month,
    {
      text: formatMessage({ id: 'dataManage.monthStatistics', defaultMessage: '按月统计' }),
      format: 'YYYY-MM',
    },
  ],
  [
    timeDimensionEnum.Year,
    {
      text: formatMessage({ id: 'dataManage.yearStatistics', defaultMessage: '按年统计' }),
      format: 'YYYY',
    },
  ],
  [
    timeDimensionEnum.Cycle,
    {
      text: formatMessage({
        id: 'dataManage.lifeCycleStatistics',
        defaultMessage: '按生命周期统计',
      }),
    },
  ],
]);

export const alarmClearStatus = {
  0: {
    text: formatMessage({ id: 'dataManage.generate', defaultMessage: '产生' }),
  },
  1: {
    text: formatMessage({ id: 'dataManage.eliminate', defaultMessage: '消除' }),
  },
};

export const cleanUpType = {
  0: formatMessage({ id: 'dataManage.automaticRecovery', defaultMessage: '自动恢复' }),
  1: formatMessage({ id: 'dataManage.manualClear', defaultMessage: '手动消除' }),
};

export const effectStatus = {
  0: {
    text: formatMessage({ id: 'taskManage.valid', defaultMessage: '有效' }),
    status: 'Success',
  },
  1: {
    text: formatMessage({ id: 'taskManage.invalid', defaultMessage: '无效' }),
    status: 'Error',
  },
};

export const enum SiteTypeEnum {
  PV = 1,
  ES = 2,
  CS = 3,
  ES_CS = 23,
  PV_CS = 13,
  PV_ES = 12,
  PV_ES_CS = 123,
  Exchange = 4,
}

export type SiteTypeEnumType = `${(typeof SiteTypeEnum)[keyof typeof SiteTypeEnum]}`;

export const siteType = {
  0: { text: formatMessage({ id: 'common.all', defaultMessage: '全部' }) },
  [SiteTypeEnum.PV]: { text: formatMessage({ id: 'screen.pvSite', defaultMessage: '光伏站点' }) },
  [SiteTypeEnum.ES]: {
    text: formatMessage({ id: 'screen.storageSite', defaultMessage: '储能站点' }),
  },
  [SiteTypeEnum.CS]: {
    text: formatMessage({ id: 'screen.chargingStation', defaultMessage: '充电站点' }),
  },
  [SiteTypeEnum.ES_CS]: {
    text: formatMessage({ id: 'screen.storageChargeStation', defaultMessage: '储充站点' }),
  },
  [SiteTypeEnum.PV_CS]: {
    text: formatMessage({ id: 'screen.pvChargeStation', defaultMessage: '光充站点' }),
  },
  [SiteTypeEnum.PV_ES]: {
    text: formatMessage({ id: 'screen.opticalStorageSite', defaultMessage: '光储站点' }),
  },
  [SiteTypeEnum.PV_ES_CS]: {
    text: formatMessage({
      id: 'screen.opticalStorageChargingStation',
      defaultMessage: '光储充站点',
    }),
  },
};

export const platformTypes = {
  0: {
    text: formatMessage({ id: 'system.Version.android', defaultMessage: '安卓' }),
  },
  1: {
    text: formatMessage({ id: 'system.Version.ios', defaultMessage: '苹果' }),
  },
};

export const enableOptions = [
  {
    value: 1,
    label: formatMessage({ id: 'common.disable', defaultMessage: '禁用' }),
  },
  {
    value: 0,
    label: formatMessage({ id: 'common.enabled', defaultMessage: '使能' }),
  },
];

export const masterSlaveEnum: ValueEnum = {
  0: {
    text: formatMessage({ id: 'device.host', defaultMessage: '主机' }),
  },
  1: {
    text: formatMessage({ id: 'device.slave', defaultMessage: '从机' }),
  },
};
export const masterSlave1Enum: ValueEnum = {
  1: {
    text: formatMessage({ id: 'device.host', defaultMessage: '主机' }),
  },
  0: {
    text: formatMessage({ id: 'device.slave', defaultMessage: '从机' }),
  },
};
export const masterSlave2Enum: ValueEnum = {
  0: {
    text: formatMessage({ id: 'common.master', defaultMessage: '主' }),
  },
  1: {
    text: formatMessage({ id: 'common.slave', defaultMessage: '从' }),
  },
};
export const meterSerialNumberEnum: ValueEnum = {
  1: {
    text: formatMessage({ id: 'device.inverterMeter', defaultMessage: '计量电表' }),
  },
  2: {
    text: formatMessage({ id: 'device.gridMeter', defaultMessage: '防逆流电表' }),
  },
};

export const connectEnum: ValueEnum = {
  1: {
    text: formatMessage({ id: 'common.connect', defaultMessage: '在线' }),
  },
  0: {
    text: formatMessage({ id: 'common.break', defaultMessage: '离线' }),
  },
};
export const weekInfo = [
  formatMessage({ id: 'date.sunday', defaultMessage: '周日' }),
  formatMessage({ id: 'date.monday', defaultMessage: '周一' }),
  formatMessage({ id: 'date.tuesday', defaultMessage: '周二' }),
  formatMessage({ id: 'date.wednesday', defaultMessage: '周三' }),
  formatMessage({ id: 'date.thursday', defaultMessage: '周四' }),
  formatMessage({ id: 'date.friday', defaultMessage: '周五' }),
  formatMessage({ id: 'date.saturday', defaultMessage: '周六' }),
  formatMessage({ id: 'date.sunday', defaultMessage: '周日' }),
];

export const mapTypeOptions: OptionType[] = [
  {
    label: formatMessage({ id: 'common.amap', defaultMessage: '高德' }),
    value: MapTypeEnum.AMap,
  },
  {
    label: formatMessage({ id: 'common.google', defaultMessage: '谷歌' }),
    value: MapTypeEnum.Google,
  },
];

export const timeZoneOptions: OptionType[] = [
  {
    label:
      '(UTC+08:00) ' + formatMessage({ id: 'system.chinaShanghai', defaultMessage: '中国，上海' }),
    value: 8,
    position: { lng: 116.407649, lat: 39.903439 },
  },
  {
    label:
      '(UTC+0) ' + formatMessage({ id: 'system.africaGuinea', defaultMessage: '非洲，几内亚' }),
    value: 0,
    position: { lng: -13.592248, lat: 9.643234 },
  },
];
