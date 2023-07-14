import type { YTProColumns } from '@/components/YTProTable/typing';
import { connectStatus } from '@/utils/dictionary';
import type { ElectricGenerateInfo } from './type';

export const columns: YTProColumns<ElectricGenerateInfo>[] = [
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
    dataIndex: 'deviceName',
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
    dataIndex: 'pv2',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: 'B枪功率(kW)',
    dataIndex: 'pv3',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
];

export const loadColumns: YTProColumns<ElectricGenerateInfo>[] = [
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
    dataIndex: 'deviceName',
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
    dataIndex: 'pv2',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: 'B枪功率(kW)',
    dataIndex: 'pv3',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
];
