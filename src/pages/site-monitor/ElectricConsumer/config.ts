import type { YTProColumns } from '@/components/YTProTable/typing';
import { connectStatus } from '@/utils/dictionary';
import type { DeviceInfo } from './type';

export const columns: YTProColumns<DeviceInfo>[] = [
  {
    title: '设备ID',
    dataIndex: 'deviceId',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '所属站点',
    dataIndex: 'siteName',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '设备名称',
    dataIndex: 'name',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '通信状态',
    dataIndex: 'connectStatus',
    valueEnum: connectStatus,
    width: 120,
    ellipsis: true,
  },
  {
    title: '功率(kW)',
    dataIndex: 'power',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: 'A枪功率(kW)',
    dataIndex: 'gunA',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: 'B枪功率(kW)',
    dataIndex: 'gunB',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
];

export const loadColumns: YTProColumns<DeviceInfo>[] = [
  {
    title: '设备ID',
    dataIndex: 'deviceId',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '所属站点',
    dataIndex: 'siteName',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '设备名称',
    dataIndex: 'name',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '通信状态',
    dataIndex: 'connectStatus',
    valueEnum: connectStatus,
    width: 120,
    ellipsis: true,
  },
  {
    title: '功率(kW)',
    dataIndex: 'power',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '电压(V)',
    dataIndex: 'v',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '电流(A)',
    dataIndex: 'a',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '日用电量（kWh）',
    dataIndex: 'totalCharge',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
];
