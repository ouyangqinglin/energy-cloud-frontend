import { YTProColumns } from '@/components/YTProTable/typing';
import { effectStatus } from '@/utils/dictionary';
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
    dataIndex: 'nickName',
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    hideInSearch: true,
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
    title: '电话',
    dataIndex: 'phonenumber',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '服务商',
    width: 120,
    ellipsis: true,
    dataIndex: 'orgName',
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: effectStatus,
  },
  {
    title: '备注',
    dataIndex: 'remark',
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
    dataIndex: 'updateByName',
    hideInSearch: true,
  },
];
