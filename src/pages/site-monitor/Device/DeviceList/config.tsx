import type { DeviceDataType } from '@/services/equipment';
import { formatMessage } from '@/utils';
import { productTypeIconMap } from '@/utils/IconUtil';
import {
  // alarmStatus,
  alarmStatus1,
  chargingAndDischargingStatus,
  // systemMode,
  // workStatus,
  runningState,
  onlineStatus,
} from '@/utils/dict';
import { DeviceMasterMode, DeviceProductTypeEnum } from '@/utils/dictionary';
import type { DeviceType } from './data';

// 其他设备
export const getOtColumns = (onClick: {
  (rowData: DeviceType): void;
  (arg0: DeviceDataType): void;
}) => {
  return [
    {
      title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
      dataIndex: 'deviceName',
      width: 200,
      ellipsis: true,
      render: (_: any, record: DeviceDataType) => {
        const Component =
          productTypeIconMap.get(record?.productType ?? DeviceProductTypeEnum.Default) ||
          productTypeIconMap.get(DeviceProductTypeEnum.Default);
        return (
          <>
            <span
              className="cl-primary cursor"
              onClick={() => onClick(record)}
              title={record.deviceName}
            >
              {Component && <Component className="mr8" />}
              {record.masterSlaveMode === DeviceMasterMode.Master &&
                `(${formatMessage({ id: 'common.master', defaultMessage: '主' })})`}
              {record.masterSlaveMode === DeviceMasterMode.Slave &&
                `(${formatMessage({ id: 'common.slave', defaultMessage: '从' })})`}
              {record.deviceName}
            </span>
          </>
        );
      },
    },
    {
      title: formatMessage({ id: 'common.equipmentSerial', defaultMessage: '设备序列号' }),
      dataIndex: 'sn',
      width: 150,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'common.model', defaultMessage: '产品型号' }),
      dataIndex: 'model',
      width: 220,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
      dataIndex: 'productTypeName',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'siteMonitor.owningSite', defaultMessage: '所属站点' }),
      dataIndex: 'siteName',
      hideInSearch: true,
      width: 120,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'siteMonitor.communicationStatus', defaultMessage: '通信状态' }),
      dataIndex: 'connectStatus',
      render: (dom: any, record: { connectStatus: number }) =>
        record.connectStatus == 2 ? '-' : dom,
      valueType: 'select',
      valueEnum: onlineStatus,
      width: 120,
    },
    {
      title: formatMessage({ id: 'siteMonitor.alarmStatus', defaultMessage: '告警状态' }),
      dataIndex: 'alarmStatus',
      valueType: 'select',
      hideInSearch: true,
      valueEnum: alarmStatus1,
      width: 120,
    },
  ];
};

// ems
export const EMScolumns = [
  {
    title: formatMessage({ id: 'siteMonitor.systemWorkModel', defaultMessage: '系统工作模式' }),
    dataIndex: 'systemOperatingModeName',
    hideInSearch: true,
    // width: 120,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'siteMonitor.softVersion', defaultMessage: '软件版本号' }),
    dataIndex: 'softVersion',
    hideInSearch: false,
    // width: 100,
    ellipsis: true,
  },
];

// 储能
export const ESColumns = [
  {
    title: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }),
    dataIndex: 'workStatusName',
    hideInSearch: true,
    width: 120,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'siteMonitor.ratedPower', defaultMessage: '额定功率' }) + '（kW）',
    dataIndex: 'energyStoragePower',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'siteMonitor.currentPower', defaultMessage: '当前功率' }) + '（kW）',
    dataIndex: 'power',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
];

// batterStack电池堆
export const BSColumns = [
  {
    title: formatMessage({
      id: 'siteMonitor.chargingAndDischargingStatus',
      defaultMessage: '充放状态',
    }),
    dataIndex: 'chargingAndDischargingStatus',
    valueEnum: chargingAndDischargingStatus,
    hideInSearch: true,
    width: 120,
  },
  {
    title:
      formatMessage({ id: 'siteMonitor.ratedCapacity', defaultMessage: '额定容量' }) + '（kWh）',
    dataIndex: 'ratedCapacity',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'common.current', defaultMessage: '当前' }) + 'SOC',
    dataIndex: 'soc',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
];

export const PVInverterColumns = [
  {
    title: formatMessage({ id: 'siteMonitor.numberGeneratingSets', defaultMessage: '发电组串数' }),
    dataIndex: 'generatingElectricityPv',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' }),
    dataIndex: 'runningState',
    hideInSearch: true,
    valueEnum: runningState,
    width: 150,
    ellipsis: true,
  },
  {
    title:
      formatMessage({ id: 'siteMonitor.totalComponentCapacity', defaultMessage: '组件总容量' }) +
      '（kWp）',
    dataIndex: 'totalCapacityOfComponents',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'siteMonitor.ratedPower', defaultMessage: '额定功率' }) + '（kW）',
    dataIndex: 'energyStoragePower',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'siteMonitor.currentPower', defaultMessage: '当前功率' }) + '（kW）',
    dataIndex: 'power',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
];

// 充电桩
export const CSColumns = [
  {
    title: formatMessage({ id: 'siteMonitor.ratedPower', defaultMessage: '额定功率' }) + '（kW）',
    dataIndex: 'energyStoragePower',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'siteMonitor.currentPower', defaultMessage: '当前功率' }) + '（kW）',
    dataIndex: 'power',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title:
      formatMessage({ id: 'siteMonitor.chargingVolumeToday', defaultMessage: '今日充电量' }) +
      '（kWh）',
    dataIndex: 'todayCharge',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
];

// @ts-ignore
export const TabColumnsMap = new Map([
  [1, EMScolumns],
  [4, PVInverterColumns],
  [2, ESColumns],
  [3, BSColumns],
  [5, CSColumns],
  [6, []],
]);
