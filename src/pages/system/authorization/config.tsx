import type { ProColumns } from '@ant-design/pro-components';
import { Switch } from 'antd';
import type { ListDataType } from './type';

export const columns: ProColumns<ListDataType>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: '应用名称',
    dataIndex: 'applicationName',
    width: 120,
    ellipsis: true,
  },
  {
    title: '应用ID',
    dataIndex: 'applicationID',
    width: 120,
    ellipsis: true,
  },
  {
    title: '密匙',
    valueType: 'password',
    dataIndex: 'secret',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '状态',
    valueEnum: new Map<number, string>([
      // eslint-disable-next-line react/jsx-key
      [1, '有效'],
      // eslint-disable-next-line react/jsx-key
      [0, '无效'],
    ]),
    render(dom, entity, index, action, schema) {
      return <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={!!entity.status} />;
    },
    dataIndex: 'status',
    width: 150,
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'description',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
];
