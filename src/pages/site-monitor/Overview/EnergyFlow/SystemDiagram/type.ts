export const enum AlarmLevel {
  // 提示
  info = 'info',
  // 次要
  warn = 'warn',
  // 重要
  alarm = 'alarm',
  //严重
  error = 'error',
}

// 1-发电单元 2-储能单元 3-用电单元 4-其他单元
export const enum SubsystemType {
  PG = 1,
  ES,
  EC,
  OT,
}

// 是否已处理 0未处理 1已处理
export const enum AlarmStatus {
  UNRESOLVED,
  RESOLVED,
}

export interface SiteAlarm {
  alarmTime: string;
  content: string;
  detailInfo: string;
  deviceName: string;
  fromResource: number;
  functionKey: string;

  // 	告警id
  id: number;
  // 主机设备id
  deviceId: number;
  // 告警设备id
  alarmDeviceId: number;
  // 是否确认:0-否 1-是
  isConfirm: number;
  // 站点名称
  siteName: string;
  // 站点id
  siteId: number;
  // 子系统id: 1-发电单元 2-储能单元 3-用电单元 4-其他单元
  subsystemId: SubsystemType;
  // 等级
  level: string;
  // 告警名称-标题
  name: string;
  productTypeName: string;
  // 是否已处理 0未处理 1已处理
  status: AlarmStatus;
}
