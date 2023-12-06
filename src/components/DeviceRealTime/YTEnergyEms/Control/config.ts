import { formatMessage } from '@/utils';

export type BtnParamType = {
  text: string;
  value: number;
};
export type ControlParamItem = {
  label: string;
  field: string;
  btnParam: any;
};
export const controlItems: ControlParamItem[] = [
  {
    label: formatMessage({
      id: 'device.systemWorkingModeSwitch',
      defaultMessage: '系统工作模式切换',
    }),
    field: 'systemOperatingMode',
    btnParam: [
      {
        text: formatMessage({ id: 'device.peakFillingValley', defaultMessage: '削峰填谷' }),
        value: 0,
      },
      { text: formatMessage({ id: 'device.backupPower', defaultMessage: '备电' }), value: 1 },
      { text: formatMessage({ id: 'device.manualControl', defaultMessage: '手动控制' }), value: 2 },
    ],
  },
  {
    label: formatMessage({
      id: 'device.systemWorkingStateControl',
      defaultMessage: '系统工作状态控制',
    }),
    field: 'emsSysStatus',
    btnParam: [
      { text: formatMessage({ id: 'device.activate', defaultMessage: '启动' }), value: 0 },
      { text: formatMessage({ id: 'device.standby', defaultMessage: '待机' }), value: 1 },
      { text: formatMessage({ id: 'device.cease', defaultMessage: '停止' }), value: 2 },
      { text: formatMessage({ id: 'device.scram', defaultMessage: '急停' }), value: 3 },
    ],
  },
  {
    label: formatMessage({
      id: 'device.converterWorkingModeSwitch',
      defaultMessage: '变流器工作模式切换',
    }),
    field: 'converterOperatingMode',
    btnParam: [
      { text: formatMessage({ id: 'device.offGridWork', defaultMessage: '离网工作' }), value: 0 },
      {
        text: formatMessage({ id: 'device.gridConnectionWork', defaultMessage: '并网工作' }),
        value: 1,
      },
      { text: formatMessage({ id: 'device.mainsCharging', defaultMessage: '市电充电' }), value: 2 },
    ],
  },
  {
    label: formatMessage({
      id: 'device.converterOperatingStatusSwitch',
      defaultMessage: '变流器工作状态切换',
    }),
    field: 'converterWorkingStatus',
    btnParam: [
      { text: formatMessage({ id: 'device.activate', defaultMessage: '启动' }), value: 0 },
      { text: formatMessage({ id: 'device.standby', defaultMessage: '待机' }), value: 1 },
      { text: formatMessage({ id: 'device.cease', defaultMessage: '停止' }), value: 2 },
      { text: formatMessage({ id: 'device.reset', defaultMessage: '复位' }), value: 3 },
    ],
  },
  {
    label: formatMessage({
      id: 'device.batteryPackWorkingModeSwitch',
      defaultMessage: '电池组工作模式切换',
    }),
    field: 'batteryPackOperatingMode',
    btnParam: [
      { text: formatMessage({ id: 'device.normal', defaultMessage: '正常' }), value: 0 },
      { text: formatMessage({ id: 'device.nuclearCapacity', defaultMessage: '核容' }), value: 1 },
      { text: formatMessage({ id: 'device.balanced', defaultMessage: '均衡' }), value: 2 },
      { text: formatMessage({ id: 'siteMonitor.charge', defaultMessage: '充电' }), value: 3 },
      { text: formatMessage({ id: 'siteMonitor.discharge', defaultMessage: '放电' }), value: 4 },
    ],
  },
  {
    label: formatMessage({
      id: 'device.batteryPackOperatingStateControl',
      defaultMessage: '电池组工作状态控制',
    }),
    field: 'batteryPackWorkingStatus',
    btnParam: [
      { text: formatMessage({ id: 'device.activate', defaultMessage: '启动' }), value: 0 },
      { text: formatMessage({ id: 'device.standby', defaultMessage: '待机' }), value: 1 },
      { text: formatMessage({ id: 'device.cease', defaultMessage: '停止' }), value: 2 },
    ],
  },
  {
    label: formatMessage({ id: 'device.systemReset', defaultMessage: '系统复位' }),
    field: 'systemReset',
    btnParam: [{ text: formatMessage({ id: 'device.execute', defaultMessage: '执行' }), value: 1 }],
  },
];
