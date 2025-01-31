import { effectStatus } from '@/utils/dict';
import { ProColumns } from '@ant-design/pro-components';
import { ServiceInfo } from './type';

export const columns: ProColumns<ServiceInfo>[] = [
  {
    title: '序号',
    dataIndex: 'index',
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
  {
    title: '最后更新时间',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '更新人',
    dataIndex: 'updateBy',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
];
