import { YTProColumns } from '@/components/YTProTable/typing';
import { effectStatus } from '@/utils/dictionary';
import { isEmpty } from 'lodash';
import { getRoleListForCurrentUser } from './service';
import { CustomerInfo } from './type';

export const columns: YTProColumns<CustomerInfo>[] = [
  {
    title: '序号',
    valueType: 'index',
    width: 48,
  },
  {
    title: '账号',
    dataIndex: 'userName',
    width: 140,
    ellipsis: true,
  },
  {
    title: '用户名',
    width: 140,
    dataIndex: 'nickName',
  },
  {
    title: '角色',
    dataIndex: 'roles',
    width: 140,
    hideInSearch: true,
    render: (_, entity) => {
      if (isEmpty(entity)) {
        return '';
      }
      // eslint-disable-next-line no-param-reassign
      return entity.roles.reduce((str, cur) => (str += ' ' + cur.roleName), '');
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    valueEnum: effectStatus,
  },
  {
    title: '备注',
    width: 150,
    dataIndex: 'remark',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateRange',
    hideInSearch: true,
    width: 150,
  },
  {
    title: '创建人',
    width: 100,
    dataIndex: 'createByName',
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
    width: 100,
    dataIndex: 'updateByName',
    hideInSearch: true,
  },
];
