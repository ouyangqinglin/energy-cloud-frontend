import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { TABLESELECT } from '@/components/TableSelect';
import { FormOperations } from '@/components/YTModalForm/typing';
import { effectStatus } from '@/utils/dictionary';
import type { ProColumns } from '@ant-design/pro-components';
import { isNil } from 'lodash';
import { useState, useEffect, useRef } from 'react';
import { getRoleListForCurrentUser, getServiceProviderList, getSiteList } from '../service';
import type { TransformCustomerUpdateInfo } from '../type';
import { isEmpty } from '@/utils';
import { verifyPhone, verifyPassword } from '@/utils/reg';

export const Columns: (
  operation: FormOperations,
  orgId: number,
) => ProColumns<TransformCustomerUpdateInfo, TABLESELECTVALUETYPE>[] = (operation, orgId) => {
  const orgIdRef = useRef<number>();
  // const [currentOrgId, setCurrentOrgId] = useState<number>();
  useEffect(() => {
    orgIdRef.current = orgId;
  }, [orgId]);

  return [
    {
      dataIndex: 'userId',
      hideInForm: true,
    },
    {
      title: '服务商',
      valueType: TABLESELECT,
      dataIndex: 'serviceProvider',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择服务商',
          },
        ],
      },
      name: 'serviceProvider',
      fieldProps: (form) => ({
        tableId: 'orgId',
        tableName: 'orgName',
        valueId: 'orgId',
        valueName: 'orgName',
        multiple: false,
        onChange: (value: { orgId: number }[]) => {
          const preOrgId = orgIdRef.current;
          const curOrgId = value[0]?.orgId;
          if (form && curOrgId !== preOrgId) {
            form.setFieldValue('sites', []);
          }
          if (value.length) {
            orgIdRef.current = curOrgId;
          }
        },
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
      }),
    },
    {
      title: '账号',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请填写账号',
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
      title: '角色',
      dataIndex: 'roleId',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择角色',
          },
        ],
      },
      hideInTable: true,
      valueType: 'select',
      request: async (parms, props) => {
        console.log(parms, props);
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
      title: '关联站点',
      valueType: TABLESELECT,
      dataIndex: 'sites',
      colProps: {
        span: 24,
      },
      fieldProps: (form) => {
        return {
          tableId: 'id',
          tableName: 'name',
          valueId: 'id',
          valueName: 'name',
          proTableProps: {
            rowKey: 'id',
            columns: [
              {
                title: '站点ID',
                dataIndex: 'id',
                width: 150,
                ellipsis: true,
                hideInSearch: true,
              },
              {
                title: '站点名称',
                dataIndex: 'name',
                width: 200,
                ellipsis: true,
              },
            ],
            request: (params: Record<string, any>) => {
              if (isNil(orgIdRef.current)) {
                return;
              }
              return getSiteList({ ...params, ...{ orgId: orgIdRef.current } })?.then(
                ({ data }) => {
                  return {
                    data: data?.list,
                    total: data?.total,
                    success: true,
                  };
                },
              );
            },
          },
        };
      },
    },
    {
      title: '备注',
      dataIndex: ['remark'],
      valueType: 'textarea',
      colProps: {
        span: 24,
      },
    },
  ];
};
