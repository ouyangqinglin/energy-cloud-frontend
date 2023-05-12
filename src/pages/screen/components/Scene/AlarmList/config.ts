export const enum AlarmLevel {
  NORMAL = 'info',
  WARNING = 'warn',
  ERROR = 'error',
}

export const DEFAULT_DATA = {
  deviceName: '--',
  eventName: '--',
  eventTime: '--',
  eventType: AlarmLevel.ERROR,
};

export const alarmMap = {
  [AlarmLevel.ERROR]: {
    color: '#ff5656',
    text: '一级',
  },
  [AlarmLevel.WARNING]: {
    color: '#FFC22A',
    text: '二级',
  },
  [AlarmLevel.NORMAL]: {
    color: '#11DA81',
    text: '三级',
  },
};
