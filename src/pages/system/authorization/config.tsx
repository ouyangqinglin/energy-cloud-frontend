import { Switch } from 'antd';
import type { AuthDataType } from './type';
import { formatMessage } from '@/utils';
import { YTProColumns } from '@/components/YTProTable/typing';

export const columns: YTProColumns<AuthDataType>[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: formatMessage({ id: 'system.applyName', defaultMessage: '应用名称' }),
    dataIndex: 'appName',
    width: 120,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'system.applyId', defaultMessage: '应用ID' }),
    dataIndex: 'appId',
    width: 120,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'system.key', defaultMessage: '密匙' }),
    dataIndex: 'secret',
    valueType: 'password',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: 'Key',
    dataIndex: 'encryptKey',
    valueType: 'password',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
    dataIndex: 'status',
    renderWithEmit(_, { status, id, emit }) {
      return (
        <Switch
          checkedChildren={formatMessage({ id: 'common.enable', defaultMessage: '启用' })}
          unCheckedChildren={formatMessage({ id: 'common.disable', defaultMessage: '禁用' })}
          checked={!!status}
          onChange={(value) => emit?.('enable', { id, status: Number(value) })}
        />
      );
    },
    width: 100,
  },
  {
    title: formatMessage({ id: 'common.description', defaultMessage: '描述' }),
    dataIndex: 'description',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'common.createTime', defaultMessage: '创建时间' }),
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 120,
  },
];
