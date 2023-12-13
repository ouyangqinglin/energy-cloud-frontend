import type { ProColumns } from '@ant-design/pro-components';
import { Switch } from 'antd';
import type { ListDataType } from './type';
import { formatMessage } from '@/utils';

export const columns: ProColumns<ListDataType>[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: formatMessage({ id: 'system.applyName', defaultMessage: '应用名称' }),
    dataIndex: 'applicationName',
    width: 120,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'system.applyId', defaultMessage: '应用ID' }),
    dataIndex: 'applicationID',
    width: 120,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'system.key', defaultMessage: '密匙' }),
    valueType: 'password',
    dataIndex: 'secret',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
    valueEnum: new Map<number, string>([
      // eslint-disable-next-line react/jsx-key
      [1, formatMessage({ id: 'system.valid', defaultMessage: '有效' })],
      // eslint-disable-next-line react/jsx-key
      [0, formatMessage({ id: 'system.invalid', defaultMessage: '无效' })],
    ]),
    render(dom, entity, index, action, schema) {
      return <Switch checkedChildren={formatMessage({id: 'system.open', defaultMessage: '开启' })} unCheckedChildren={formatMessage({id: 'system.close', defaultMessage: '关闭' })} checked={!!entity.status} />;
    },
    dataIndex: 'status',
    width: 150,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'common.description', defaultMessage: '描述' }),
    dataIndex: 'description',
    hideInSearch: true,
    width: 150,
  },
  {
    title: formatMessage({ id: 'common.createTime', defaultMessage: '描述' }),
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
];
