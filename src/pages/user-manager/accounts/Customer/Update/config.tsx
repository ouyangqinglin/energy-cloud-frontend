import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { TABLESELECT } from '@/components/TableSelect';
import { effectStatus } from '@/utils/dictionary';
import type { ProColumns } from '@ant-design/pro-components';
import { isEmpty } from 'lodash';
import { getRoleListForCurrentUser, getServiceProviderList } from '../service';
import type { CustomerUpdateInfo, TransformCustomerUpdateInfo } from '../type';

export const columns: ProColumns<TransformCustomerUpdateInfo, TABLESELECTVALUETYPE>[] = [
  {
    title: '服务商',
    valueType: TABLESELECT,
    dataIndex: 'serviceProvider',
    fieldProps: {
      tableId: 'orgId',
      tableName: 'orgName',
      valueId: 'orgId',
      valueName: 'orgName',
      multiple: false,
      proTableProps: {
        columns: [
          {
            title: '代理商ID',
            dataIndex: 'orgId',
            width: 150,
            ellipsis: true,
            hideInSearch: true,
          },
          {
            title: '代理商名称',
            dataIndex: 'orgName',
            width: 200,
            ellipsis: true,
          },
        ],
        request: (params: Record<string, any>) => {
          return getServiceProviderList(params)?.then(({ data }) => {
            return {
              data: data?.list,
              total: data?.total,
              success: true,
            };
          });
        },
      },
    },
  },
  {
    title: '账户',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    dataIndex: ['userName'],
  },
  {
    title: '用户名',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    dataIndex: 'nickName',
  },
  {
    title: '电话',
    dataIndex: ['phonenumber'],
  },
  {
    title: '角色',
    dataIndex: 'roleIds',
    convertValue: (value) => {
      if (isEmpty(value)) {
        return [];
      }
      return value;
    },
    hideInTable: true,
    fieldProps: {
      mode: 'multiple',
    },
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
    title: '状态',
    dataIndex: ['status'],
    valueEnum: new Map([
      ['1', '有效'],
      ['0', '无效'],
    ]),
  },
  {
    title: '初始密码',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    valueType: 'password',
    dataIndex: 'password',
  },
  {
    title: '备注',
    dataIndex: ['remark'],
    valueType: 'textarea',
  },
];
