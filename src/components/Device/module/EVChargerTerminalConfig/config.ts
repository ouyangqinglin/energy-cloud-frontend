import { formatMessage } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import type { ConfigDataType } from './data';
export const columns: ProColumns<ConfigDataType>[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
  },
  {
    title: formatMessage({ id: 'device.serialNumber', defaultMessage: '序列号' }),
    dataIndex: 'serialNumber',
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'device.ConfigName', defaultMessage: '名称' }),
    hideInSearch: true,
    dataIndex: 'ConfigName',
  },
  {
    title: formatMessage({ id: 'device.networkStatus', defaultMessage: '网络状态' }),
    hideInSearch: true,
    dataIndex: 'networkStatus',
  },
  {
    title: formatMessage({ id: 'device.ratedCurrent', defaultMessage: '额定电流' }) + '(A)',
    hideInSearch: true,
    dataIndex: 'ratedCurrent',
  },
];
