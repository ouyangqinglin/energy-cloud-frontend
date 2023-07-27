/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-03 14:02:30
 * @LastEditTime: 2023-07-03 18:02:05
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\Account\config.ts
 */
import type { ProColumns } from '@ant-design/pro-table';
import { ProFormColumnsType } from '@ant-design/pro-components';
import { AccountType, RoleType } from './type';
import { api } from '@/services';
import { effectStatus } from '@/utils/dictionary';
import { verifyPhone, verifyPassword } from '@/utils/reg';
import { isEmpty } from '@/utils';

export const columns: ProColumns<AccountType>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
  },
  {
    title: '用户账号',
    dataIndex: 'userName',
    width: 120,
    ellipsis: true,
  },
  {
    title: '用户名称',
    dataIndex: 'nickName',
    width: 120,
    ellipsis: true,
  },
  {
    title: '电话',
    dataIndex: 'phonenumber',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '角色',
    dataIndex: 'roles',
    valueType: 'select',
    render: (_, record) => record?.roles?.map?.((item) => item?.roleName)?.join?.(','),
    request: () => {
      return api.getRoles().then(({ data }) => {
        return data?.map?.((item: RoleType) => {
          return {
            label: item?.roleName,
            value: item?.roleId,
          };
        });
      });
    },
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: effectStatus,
    width: 120,
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
    width: 150,
    hideInSearch: true,
  },
  {
    title: '创建人',
    dataIndex: 'createByName',
    width: 200,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '最后更新时间',
    dataIndex: 'updateTime',
    width: 150,
    hideInSearch: true,
  },
  {
    title: '更新人',
    dataIndex: 'updateByName',
    width: 200,
    ellipsis: true,
    hideInSearch: true,
  },
];

export const formColumns: ProFormColumnsType<AccountType>[] = [
  {
    dataIndex: 'userId',
    hideInForm: true,
  },
  {
    title: '用户账号',
    dataIndex: 'userName',
    formItemProps: {
      rules: [{ required: true, message: '请填写用户账号' }],
    },
    fieldProps: {
      autoComplete: 'off',
    },
  },
  {
    title: '用户名',
    dataIndex: 'nickName',
    formItemProps: {
      rules: [{ required: true, message: '请填写用户名' }],
    },
  },
  {
    title: '角色',
    dataIndex: 'roleId',
    valueType: 'select',
    request: () => {
      return api.getRoles().then(({ data }) => {
        return data?.map?.((item: RoleType) => {
          return {
            label: item?.roleName,
            value: item?.roleId,
          };
        });
      });
    },
    formItemProps: {
      rules: [{ required: true, message: '请选择角色' }],
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: effectStatus,
    formItemProps: {
      rules: [{ required: true, message: '请选择状态' }],
    },
  },
  {
    title: '初始密码',
    dataIndex: 'password',
    valueType: 'password',
    dependencies: ['userId'],
    formItemProps: (form) => {
      const userId = form?.getFieldValue?.('userId');
      return {
        required: isEmpty(userId),
        rules: [
          () => {
            return {
              validator: (_: any, value: string) => {
                if (isEmpty(value)) {
                  if (isEmpty(userId)) {
                    return Promise.reject(`请填写初始密码`);
                  }
                } else if (!verifyPassword(value)) {
                  return Promise.reject(`格式错误：8-16个数字单词，至少其中两种:字母/数字/符号`);
                }
                return Promise.resolve();
              },
            };
          },
        ],
      };
    },
    fieldProps: {
      autoComplete: 'new-password',
      placeholder: '8-16个数字单词，至少其中两种：字母/数字/符号',
    },
  },
  {
    title: '确认密码',
    dataIndex: 'confirmPassword',
    valueType: 'password',
    dependencies: ['userId'],
    formItemProps: (form) => {
      const userId = form?.getFieldValue?.('userId');
      return {
        required: isEmpty(userId),
        rules: [
          ({ getFieldValue }) => {
            const password = getFieldValue('password');
            return {
              validator: (_: any, value: string) => {
                if (isEmpty(value)) {
                  if (isEmpty(userId)) {
                    return Promise.reject(`请填写确认密码`);
                  }
                } else if (password !== value) {
                  return Promise.reject(`初始密码和确认密码不一致`);
                } else if (!verifyPassword(value)) {
                  return Promise.reject(`格式错误：8-16个数字单词，至少其中两种:字母/数字/符号`);
                }
                return Promise.resolve();
              },
            };
          },
        ],
      };
    },
    fieldProps: {
      autoComplete: 'new-password',
      placeholder: '8-16个数字单词，至少其中两种：字母/数字/符号',
    },
  },
  {
    title: '电话',
    dataIndex: 'phonenumber',
    formItemProps: {
      rules: [
        () => {
          return {
            validator: (_: any, value: string) => {
              if (isEmpty(value)) {
                return Promise.resolve();
              } else if (verifyPhone(value)) {
                return Promise.resolve();
              } else {
                return Promise.reject(`电话格式错误`);
              }
            },
          };
        },
      ],
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    valueType: 'textarea',
    colProps: {
      span: 24,
    },
  },
];
