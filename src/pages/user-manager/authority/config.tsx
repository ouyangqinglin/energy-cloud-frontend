import { YTProColumns } from '@/components/YTProTable/typing';
import { effectStatus } from '@/utils/dictionary';
import { RoleInfo } from './type';

export const dataSource = {
  1: {
    text: '手动',
  },
  0: {
    text: '系统预设',
  },
};

export const columns: YTProColumns<RoleInfo>[] = [
  {
    title: '序号',
    valueType: 'index',
    width: 48,
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: 120,
    ellipsis: true,
  },
  {
    title: '数据来源',
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: dataSource,
    width: 120,
    hideInSearch: true,
  },
  {
    title: 'web权限',
    dataIndex: 'authority',
    width: 120,
    hideInSearch: true,
    render: (_, record) => {
      return record.type ? <a>配置</a> : '--';
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    width: 100,
    valueEnum: effectStatus,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
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
    dataIndex: 'updateByName',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
];
