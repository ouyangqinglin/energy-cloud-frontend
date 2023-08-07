/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-26 09:18:55
 * @LastEditTime: 2023-07-31 16:13:40
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\system\UserManage\Account.tsx\config.ts
 */
import { OptionType, effectStatus } from '@/utils/dictionary';
import type { ProColumns } from '@ant-design/pro-components';
import { ProFormColumnsType } from '@ant-design/pro-components';
import { getDeptList } from '@/pages/system/dept/service';
import { buildTreeData } from '@/utils/utils';
import { arrayToMap, isEmpty } from '@/utils';
import { verifyPassword, verifyPhone } from '@/utils/reg';
import { api } from '@/services';
import { OrgTypeEnum } from '@/components/OrgTree/type';
import { TABLESELECT } from '@/components/TableSelect';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { getOrgByRole, getSiteByOrg } from './service';

export type AccountDataType = {
  userId?: string;
  userName?: string;
  orgId?: string;
  orgName?: string;
  nickName?: string;
  phone?: string;
  status?: string;
  createTime?: string;
  orgType?: string;
  roleIds?: string[];
  roleId?: string;
  remark?: string;
  roles?: {
    roleId?: string;
    roleName?: string;
  }[];
  user?: AccountDataType;
  siteIds?: string[];
  sites?: {
    id: string;
    name: string;
  }[];
};

export const getTableColumns = (types: OrgTypeEnum[]) => {
  const tableColumns: ProColumns<AccountDataType>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: '账号名',
      dataIndex: 'userName',
      width: 150,
      ellipsis: true,
    },
    {
      title: '用户名',
      dataIndex: 'nickName',
      width: 150,
      ellipsis: true,
    },
    {
      title: '角色',
      dataIndex: 'roleId',
      valueType: 'select',
      width: 150,
      ellipsis: true,
      hideInSearch: [OrgTypeEnum.Operator, OrgTypeEnum.Owner].includes(types[0]),
      render: (_, record) => {
        return record?.roles?.map?.((item) => item.roleName)?.join('，');
      },
      request: () => {
        return api
          .getRoles({ builtInRole: types[0] === OrgTypeEnum.System ? 0 : 1 })
          .then(({ data }) => {
            return data?.map?.((item: any) => {
              return {
                label: item?.roleName,
                value: item?.roleId,
              };
            });
          });
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
      title: '手机',
      dataIndex: 'phone',
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
      render: (_, record) => record.createTime,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
      width: 150,
    },
  ];

  return tableColumns;
};

const tableSelectColumns: ProColumns[] = [
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
];

const requestTable = (params: Record<string, any>) => {
  return getSiteByOrg(params).then(({ data }) => {
    return {
      data: data?.list,
      total: data?.total,
      success: true,
    };
  });
};

export const getFormColumns = (
  types: OrgTypeEnum[],
  systemRoleOptions: OptionType[],
  partnerRoleOptions: OptionType[],
) => {
  const formColumns: ProFormColumnsType<AccountDataType, TABLESELECTVALUETYPE>[] = [
    {
      title: '账号名',
      dataIndex: 'userName',
      formItemProps: {
        rules: [{ required: true, message: '请填写账号名' }],
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
      title: '用户ID',
      dataIndex: 'userId',
      fieldProps: {
        disabled: true,
      },
    },
    {
      title: '角色',
      dataIndex: 'roleId',
      valueType: 'select',
      request: () => {
        return Promise.resolve(
          types[0] === OrgTypeEnum.System ? systemRoleOptions : partnerRoleOptions,
        );
      },
      formItemProps: {
        rules: [{ required: true, message: '请选择角色' }],
      },
    },
    types[0] === OrgTypeEnum.System
      ? {
          title: '组织',
          dataIndex: 'orgId',
          valueType: 'treeSelect',
          request: () => {
            return getDeptList().then(({ data }) => {
              return buildTreeData(data || [], 'orgId', 'orgName', '', '', '');
            });
          },
          formItemProps: {
            rules: [{ required: true, message: '请选择组织' }],
          },
        }
      : {
          title: '组织',
          dataIndex: 'orgId',
          valueType: 'select',
          dependencies: ['roleId'],
          request: (params) => {
            const roleOrgTypeMap = arrayToMap(partnerRoleOptions, 'roleId', 'orgType');
            return getOrgByRole({ type: roleOrgTypeMap[params.roleId] }).then(({ data }) => {
              return data?.map?.((item) => {
                return {
                  label: item?.orgName,
                  value: item?.orgId,
                };
              });
            });
          },
          formItemProps: {
            rules: [{ required: true, message: '请选择组织' }],
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
      title: '手机',
      dataIndex: 'phone',
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
      title: '关联站点',
      dataIndex: 'sites',
      valueType: TABLESELECT,
      hideInForm: types[0] === OrgTypeEnum.System,
      colProps: {
        span: 24,
      },
      dependencies: ['orgId'],
      fieldProps: (form) => {
        return {
          proTableProps: {
            columns: tableSelectColumns,
            request: (params: any) =>
              requestTable({ ...params, orgId: form?.getFieldValue?.('orgId') }),
          },
        };
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
  return formColumns;
};
