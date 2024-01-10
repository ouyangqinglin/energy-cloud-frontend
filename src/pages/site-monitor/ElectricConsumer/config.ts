import type { YTProColumns } from '@/components/YTProTable/typing';
import { connectStatus } from '@/utils/dict';
import type { DeviceInfo } from './type';
import { formatMessage } from '@/utils';

export const columns: YTProColumns<DeviceInfo>[] = [
  {
    title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
    dataIndex: 'name',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'common.deviceCode', defaultMessage: '设备编码' }),
    dataIndex: 'deviceId',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'common.equipmentSerial', defaultMessage: '设备序列号' }),
    dataIndex: 'sn',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'siteMonitor.owningSite', defaultMessage: '所属站点' }),
    dataIndex: 'siteName',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'siteMonitor.communicationStatus', defaultMessage: '通信状态' }),
    dataIndex: 'connectStatus',
    valueEnum: connectStatus,
    width: 120,
    ellipsis: true,
  },
  {
    title: `${formatMessage({ id: 'common.power', defaultMessage: '功率' })}(kW)`,
    dataIndex: 'power',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: `${formatMessage({
      id: 'common.dayPowerConsumption',
      defaultMessage: '日用电量',
    })}(kWh)`,
    dataIndex: 'dailyElectricityConsumption',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: `${formatMessage({
      id: 'common.totalPowerConsumption',
      defaultMessage: '累计用电量',
    })}(kWh)`,
    dataIndex: 'accumulatedElectricityConsumption',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
];

export const loadColumns: YTProColumns<DeviceInfo>[] = [
  {
    title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
    dataIndex: 'name',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'common.deviceCode', defaultMessage: '设备编码' }),
    dataIndex: 'deviceId',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'common.equipmentSerial', defaultMessage: '设备序列号' }),
    dataIndex: 'sn',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'siteMonitor.owningSite', defaultMessage: '所属站点' }),
    dataIndex: 'siteName',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'siteMonitor.communicationStatus', defaultMessage: '通信状态' }),
    dataIndex: 'connectStatus',
    valueEnum: connectStatus,
    width: 120,
    ellipsis: true,
  },
  {
    title: `${formatMessage({ id: 'common.power', defaultMessage: '功率' })}(kW)`,
    dataIndex: 'power',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: `${formatMessage({
      id: 'common.dayPowerConsumption',
      defaultMessage: '日用电量',
    })}(kWh)`,
    dataIndex: 'dailyElectricityConsumption',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: `${formatMessage({
      id: 'common.totalPowerConsumption',
      defaultMessage: '累计用电量',
    })}(kWh)`,
    dataIndex: 'accumulatedElectricityConsumption',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
];
