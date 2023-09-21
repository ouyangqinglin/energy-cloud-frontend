import { YTProColumns } from '@/components/YTProTable/typing';
import { DeviceDataType} from '@/services/equipment';

export const taskUpdateStatus = {
  1: {
    text: '升级成功',
  },
  2: {
    text: '升级失败',
  },
};
export const taskDetailColumns: YTProColumns<DeviceDataType>[] = [
  {
    title: '设备名称',
    dataIndex: 'deviceName',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '设备序列号',
    dataIndex: 'sn',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '原始版本',
    dataIndex: 'oldVersion',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '当前版本',
    dataIndex: 'current_version',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '升级时间',
    dataIndex: 'upgradeTime',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
    valueEnum: taskUpdateStatus,
  },
];
export const taskStatus = {
  0: {
    text: '待执行',
  },
  1: {
    text: '已执行',
  },
};
