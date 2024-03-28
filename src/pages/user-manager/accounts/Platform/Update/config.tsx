import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { TABLESELECT } from '@/components/TableSelect';
import { FormOperations } from '@/components/YTModalForm/typing';
import { effectStatus } from '@/utils/dict';
import type { ProColumns } from '@ant-design/pro-components';
import { Select } from 'antd';
import { omit } from 'lodash';
import { getCustomer } from '../service';
import type { TransformCustomerUpdateInfo } from '../type';
import { getDeptList } from '@/pages/system/dept/service';
import { buildTreeData } from '@/utils/utils';
import { verifyPhone, verifyPassword } from '@/utils/reg';
import { isEmpty } from '@/utils';
import { OptionType } from '@/types';
import { formatMessage } from '@/utils';

export const Columns: (
  operation: FormOperations,
  userId: number,
) => ProColumns<TransformCustomerUpdateInfo, TABLESELECTVALUETYPE>[] = (operation) => {
  return [
    {
      dataIndex: 'userId',
      hideInForm: true,
    },
    {
      title: formatMessage({ id: 'user.accountName', defaultMessage: '账号名' }),
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请填写账号名',
          },
        ],
      },
      dataIndex: ['userName'],
    },
    {
      title: formatMessage({ id: 'common.userName', defaultMessage: '用户名' }),
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请填写用户名',
          },
        ],
      },
      dataIndex: 'nickName',
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
      title: '归属组织',
      dataIndex: 'orgId',
      valueType: 'treeSelect',
      request: () => {
        return getDeptList().then(({ data }) => {
          return buildTreeData(data || [], 'orgId', 'orgName', '', '', '');
        });
      },
      formItemProps: {
        rules: [{ required: true, message: '请选择归属组织' }],
      },
    },
    {
      title: formatMessage({ id: 'user.role', defaultMessage: '角色' }),
      dataIndex: 'roleIds',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择角色',
          },
        ],
      },
      hideInTable: true,
      fieldProps: {
        mode: 'multiple',
      },
      request: async () => {
        const res = await getCustomer();
        if (res && res.data) {
          const result: OptionType[] = [];
          res.data.roles?.forEach(({ roleId, roleName, type }) => {
            if (type) {
              result.push({
                label: roleName,
                value: roleId,
              });
            }
          });
          return result;
        }
        return [];
      },
    },
    {
      title: '状态',
      dataIndex: ['status'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择状态',
          },
        ],
      },
      valueEnum: effectStatus,
    },
    {
      title: operation === FormOperations.CREATE ? '初始密码' : '修改密码',
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
      title: '备注',
      colProps: {
        span: 24,
      },
      dataIndex: ['remark'],
      valueType: 'textarea',
    },
  ];
};
