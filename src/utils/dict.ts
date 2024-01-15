/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-22 15:11:07
 * @LastEditTime: 2024-01-11 17:49:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\utils\dict.ts
 */
import { ValueEnum } from '@/types';
import { reportTypeEnum, timeDimensionEnum } from './dictionary';
import { formatMessage } from './index';

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
    status: 'Error',
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

export const onlineStatus = {
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
    text: formatMessage({ id: 'common.normal', defaultMessage: '正常' }),
    status: 'Success',
  },
  1: {
    text: formatMessage({ id: 'common.abnormal', defaultMessage: '异常' }),
    status: 'Error',
  },
};

export const alarmStatus1 = {
  0: {
    text: formatMessage({ id: 'common.eliminated', defaultMessage: '已消除' }),
    status: 'Default',
  },
  1: {
    text: formatMessage({ id: 'common.alarming', defaultMessage: '告警中' }),
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
    status: 'Processing',
  },
  2: {
    text: formatMessage({ id: 'siteMonitor.charge', defaultMessage: '充电' }),
    status: 'Error',
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
  1: formatMessage({ id: 'dataManage.manualClear', defaultMessage: '手动清除' }),
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
  PV_ES = 12,
  PV_ES_CS = 123,
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

export const connectEnum: ValueEnum = {
  1: {
    text: formatMessage({ id: 'common.connect', defaultMessage: '在线' }),
  },
  0: {
    text: formatMessage({ id: 'common.break', defaultMessage: '离线' }),
  },
};
