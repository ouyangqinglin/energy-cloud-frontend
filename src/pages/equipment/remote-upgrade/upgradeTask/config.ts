import { YTProColumns } from '@/components/YTProTable/typing';
import { DeviceDataType } from '@/services/equipment';
import { formatMessage } from '@/utils';

export const taskUpdateStatus = {
  0: {
    text: formatMessage({ id: 'common.upgradeDuring', defaultMessage: '升级中' }),
  },
  1: {
    text: formatMessage({ id: 'common.upgradeSuc', defaultMessage: '升级成功' }),
  },
  2: {
    text: formatMessage({ id: 'common.upgradeFai', defaultMessage: '升级失败' }),
  },
};
export const taskDetailColumns: YTProColumns<DeviceDataType>[] = [
  {
    title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
    dataIndex: 'deviceName',
    width: 120,
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
    title: formatMessage({ id: 'common.original', defaultMessage: '原始版本' }),
    dataIndex: 'oldVersion',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'common.currentVersion', defaultMessage: '当前版本' }),
    dataIndex: 'current_version',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'upgradeManage.upgradeTime', defaultMessage: '升级时间' }),
    dataIndex: 'upgradeTime',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
    dataIndex: 'status',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
    valueEnum: taskUpdateStatus,
  },
];
export const taskStatus = {
  0: {
    text: formatMessage({ id: 'common.tobeDone', defaultMessage: '待执行' }),
  },
  1: {
    text: formatMessage({ id: 'common.done', defaultMessage: '已执行' }),
  },
};
