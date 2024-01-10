import { YTProColumns } from '@/components/YTProTable/typing';
import { effectStatus } from '@/utils/dict';
import { RoleInfo } from './type';
import { formatMessage } from '@/utils';

export const dataSource = {
  1: {
    text: formatMessage({ id: 'user.customRole', defaultMessage: '自定义角色' }),
  },
  0: {
    text: formatMessage({ id: 'user.predefinedRoles', defaultMessage: '预定义角色' }),
  },
};

export const columns: YTProColumns<RoleInfo>[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: formatMessage({ id: 'system.Role.role_name', defaultMessage: '角色名称' }),
    dataIndex: 'roleName',
    width: 120,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'system.Role.type', defaultMessage: '角色类型' }),
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: dataSource,
    width: 120,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
    dataIndex: 'status',
    valueType: 'select',
    width: 100,
    valueEnum: effectStatus,
  },
  {
    title: formatMessage({ id: 'common.remark', defaultMessage: '备注' }),
    dataIndex: 'remark',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'common.lastTime', defaultMessage: '最后更新时间' }),
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: formatMessage({ id: 'common.renew', defaultMessage: '更新人' }),
    dataIndex: 'updateByName',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
];
