import { effectStatus } from '@/utils/dictionary';
import { ProColumns } from '@ant-design/pro-components';
import { ServiceInfo } from './type';

export const columns: ProColumns<ServiceInfo>[] = [
  {
    title: '序号',
    valueType: 'index',
    width: 48,
  },
  {
    title: '组织名称',
    dataIndex: 'orgName',
    width: 120,
    ellipsis: true,
  },
  {
    title: '组织ID',
    dataIndex: 'orgId',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: effectStatus,
    width: 100,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '创建人',
    dataIndex: 'createByName',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
];
