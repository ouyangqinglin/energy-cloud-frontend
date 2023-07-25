import { YTProColumns } from '@/components/YTProTable/typing';
import { effectStatus } from '@/utils/dictionary';
import { isEmpty } from 'lodash';
import { getRoleListForCurrentUser, getCustomer } from './service';
import { CustomerInfo } from './type';

export const columns: YTProColumns<CustomerInfo>[] = [
  {
    title: '序号',
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
    render: (_, entity) => {
      if (isEmpty(entity)) {
        return '';
      }
      // eslint-disable-next-line no-param-reassign
      return entity.roles.reduce((str, cur) => (str += ' ' + cur.roleName), '');
    },
    hideInSearch: true,
  },

  {
    title: '角色',
    dataIndex: 'roleId',
    hideInTable: true,
    valueType: 'select',
    request: async () => {
      const res = await getCustomer();
      if (res && res.data) {
        return res.data.roles?.map(({ roleId, roleName }) => ({
          label: roleName,
          value: roleId,
        }));
      }
      return [];
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
    ellipsis: true,
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
