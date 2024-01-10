import { YTProColumns } from '@/components/YTProTable/typing';
import { effectStatus } from '@/utils/dict';
import { isEmpty } from 'lodash';
import { getRoleListForCurrentUser } from './service';
import { CustomerInfo } from './type';

export const columns: YTProColumns<CustomerInfo>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: '账号名',
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
    title: '角色',
    dataIndex: 'roleId',
    hideInTable: true,
    valueType: 'select',
    request: async () => {
      const res = await getRoleListForCurrentUser();
      if (!res) {
        return [];
      }
      const roleList = res.data ?? [];
      const rawSource = roleList.map((it) => {
        return {
          label: it.roleName,
          value: it.roleId,
        };
      });
      return rawSource;
    },
  },
  {
    title: '组织名称',
    dataIndex: 'orgName',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '电话',
    dataIndex: 'phonenumber',
    width: 100,
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    valueEnum: effectStatus,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateRange',
    width: 150,
    render: (_, record) => record.createTime,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
];
