import { platformTypes } from '@/utils/dict';
import { ProColumns } from '@ant-design/pro-components';
import { VersionInfo } from './type';
import { formatMessage } from '@/utils';
import { upgradeForce } from '@/utils/dict';

export const columns: ProColumns<VersionInfo>[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: formatMessage({ id: 'system.Version.platform', defaultMessage: '平台' }),
    dataIndex: 'platform',
    valueType: 'select',
    valueEnum: platformTypes,
    width: 100,
  },
  {
    title: formatMessage({ id: 'system.Version.appType', defaultMessage: 'App类型' }),
    dataIndex: 'appTypeName',
    width: 130,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'system.Version.version', defaultMessage: '版本' }),
    dataIndex: 'version',
    width: 120,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'system.Version.systemName', defaultMessage: '系统名称' }),
    dataIndex: 'systemName',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'common.updatedTime', defaultMessage: '更新时间' }),
    dataIndex: 'releaseTime',
    width: 150,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'system.Version.isCoerce', defaultMessage: '是否强制升级' }),
    valueType: 'select',
    dataIndex: 'isCoerce',
    valueEnum: upgradeForce,
    width: 150,
    hideInSearch: true,
  },

  {
    title: formatMessage({ id: 'common.description', defaultMessage: '描述' }),
    dataIndex: 'details',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
];
