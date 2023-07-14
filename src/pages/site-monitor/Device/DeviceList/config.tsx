import {
  alarmStatus,
  chargingAndDischargingStatus,
  onlineStatus,
  runningState,
  systemMode,
  workStatus,
} from '@/utils/dictionary';

// 其他设备
export const OTColumns = [
  {
    title: '设备ID',
    dataIndex: 'deviceId',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '所属站点',
    dataIndex: 'siteName',
    hideInSearch: true,
    width: 120,
    ellipsis: true,
  },
  {
    title: '设备名称',
    dataIndex: 'deviceName',
    width: 120,
    ellipsis: true,
  },
  {
    title: '通信状态',
    dataIndex: 'connectStatus',
    render: (dom, record) => (record.connectStatus == 2 ? '-' : dom),
    valueType: 'select',
    valueEnum: onlineStatus,
    width: 120,
  },
  {
    title: '告警状态',
    dataIndex: 'alarmStatus',
    valueType: 'select',
    hideInSearch: true,
    valueEnum: alarmStatus,
    width: 120,
  },
  {
    title: '设备SN',
    dataIndex: 'sn',
    width: 150,
    ellipsis: true,
  },
];

// ems
export const EMScolumns = [
  ...OTColumns,
  {
    title: '系统模式',
    dataIndex: 'systemMode',
    valueEnum: systemMode,
    hideInSearch: true,
    width: 120,
    ellipsis: true,
  },
];

// 储能
export const ESColumns = [
  ...OTColumns,
  {
    title: '工作状态',
    dataIndex: 'workStatus',
    valueEnum: workStatus,
    hideInSearch: true,
    width: 120,
    ellipsis: true,
  },
  {
    title: '额定功率（kW）',
    dataIndex: 'energyStoragePower',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '当前功率（kW）',
    dataIndex: 'power',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
];

// batterStack电池堆
export const BSColumns = [
  ...OTColumns,
  {
    title: '充放状态',
    dataIndex: 'chargingAndDischargingStatus',
    valueEnum: chargingAndDischargingStatus,
    hideInSearch: true,
    width: 120,
    ellipsis: true,
  },
  {
    title: '额定容量（kWh）',
    dataIndex: 'ratedCapacity',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '当前SOC',
    dataIndex: 'soc',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
];

export const PVInverterColumns = [
  ...OTColumns,
  {
    title: '发电组串数',
    dataIndex: 'generatingElectricityPv',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '运行状态',
    dataIndex: 'runningState',
    hideInSearch: true,
    valueEnum: runningState,
    width: 150,
    ellipsis: true,
  },
  {
    title: '组件总容量（kWp）',
    dataIndex: 'totalCapacityOfComponents',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '额定功率（kW）',
    dataIndex: 'energyStoragePower',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '当前功率（kW）',
    dataIndex: 'power',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
];

// 充电桩
export const CSColumns = [
  ...OTColumns,
  {
    title: '额定功率（kW）',
    dataIndex: 'energyStoragePower',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '当前功率（kW）',
    dataIndex: 'power',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '今日充电量（kWh）',
    dataIndex: 'todayCharge',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
];

export const TabColumnsMap = new Map([
  [1, EMScolumns],
  [4, PVInverterColumns],
  [2, ESColumns],
  [3, BSColumns],
  [5, CSColumns],
  [6, OTColumns],
]);
