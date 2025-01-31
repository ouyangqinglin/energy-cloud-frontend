/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-26 09:18:55
 * @LastEditTime: 2024-06-14 15:46:12
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\system\UserManage\Account.tsx\config.tsx
 */
import { effectStatus } from '@/utils/dict';
import type { OptionType } from '@/types';
import type { ProColumns } from '@ant-design/pro-components';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import { getDeptList } from '@/pages/system/dept/service';
import { buildTreeData } from '@/utils/utils';
import { arrayToMap, formatMessage, isEmpty } from '@/utils';
import { verifyEmail, verifyPassword, verifyPhone } from '@/utils/reg';
import { OrgTypeEnum } from '@/components/OrgTree/type';
import { TABLESELECT } from '@/components/TableSelect';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { SiteDataType, getOrgByRole, getSiteByOrg, getThreeLevelSiteTree } from './service';
import Detail from '@/components/Detail';
import { getLocale } from '@/utils';
import { YTDATERANGE } from '@/components/YTDateRange';
import type { YTDATERANGEVALUETYPE } from '@/components/YTDateRange';
import { FormTypeEnum } from '@/components/SchemaForm';
import { Checkbox, Space } from 'antd';
import { levelMap } from '@/components/Alarm/AlarmTable';
import { YTAlarmFullOutlined } from '@/components/YTIcons';
import styles from '@/components/Alarm/index.less';
import { YTProColumns } from '@/components/YTProTable/typing';

export type AccountDataType = {
  userId?: string;
  userName?: string;
  orgId?: string;
  orgName?: string;
  nickName?: string;
  phone?: string;
  status?: string;
  createTime?: string;
  createByName?: string;
  orgType?: string;
  roleIds?: string[];
  roleType?: number;
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
  webConfig?: string[] & string;
};

export const getTableColumns = (types: OrgTypeEnum[], roleOptions: OptionType[]) => {
  const tableColumns: ProColumns<AccountDataType, YTDATERANGEVALUETYPE>[] = [
    {
      title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: formatMessage({ id: 'user.accountName', defaultMessage: '账号名' }),
      dataIndex: 'userName',
      width: 150,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'common.userName', defaultMessage: '用户名' }),
      dataIndex: 'nickName',
      width: 150,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'user.role', defaultMessage: '角色' }),
      dataIndex: 'roleId',
      valueType: 'select',
      width: 150,
      ellipsis: true,
      hideInSearch: [OrgTypeEnum.Operator, OrgTypeEnum.Owner].includes(types?.[0]),
      render: (_, record) => {
        return record?.roles?.map?.((item) => item.roleName)?.join('，');
      },
      fieldProps: {
        options: roleOptions,
      },
    },
    {
      title: formatMessage({ id: 'system.organizationName', defaultMessage: '组织名称' }),
      dataIndex: 'orgName',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'user.mobilePhone', defaultMessage: '手机' }),
      dataIndex: 'phone',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
      dataIndex: 'status',
      width: 100,
      valueEnum: effectStatus,
    },
    {
      title: formatMessage({ id: 'common.createTime', defaultMessage: '创建时间' }),
      dataIndex: 'createTime',
      valueType: YTDATERANGE,
      render: (_, record) => record.createTime,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
      fieldProps: {
        dateFormat: getLocale().dateFormat,
        format: 'YYYY-MM-DD',
      },
      width: 150,
    },
    {
      title: formatMessage({ id: 'common.createPerson', defaultMessage: '创建人' }),
      dataIndex: 'createByName',
      hideInSearch: true,
      width: 100,
    },
  ];

  return tableColumns;
};

const tableSelectColumns: ProColumns[] = [
  {
    title: formatMessage({ id: 'siteManage.siteList.siteName', defaultMessage: '站点名称' }),
    dataIndex: 'siteName',
    width: 200,
    ellipsis: true,
    hideInTable: true,
  },
  {
    title: formatMessage({ id: 'siteManage.siteList.siteCode', defaultMessage: '站点编码' }),
    dataIndex: 'id',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'siteManage.siteList.siteName', defaultMessage: '站点名称' }),
    dataIndex: 'name',
    width: 200,
    ellipsis: true,
    hideInSearch: true,
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

const HanderTreeData = (data: any[]) => {
  return data.map((i) => {
    i.key = i.id;
    i.title = i.label;
    i.value = i.id;
    if (i.children && i.children.length > 0) {
      i.children = HanderTreeData(i.children);
    }
    return i;
  });
};

export const getFormColumns = (
  types: OrgTypeEnum[],
  roleOptions: OptionType[],
  type: FormTypeEnum,
) => {
  const formColumns: ProFormColumnsType<AccountDataType, TABLESELECTVALUETYPE>[] = [
    {
      title: '',
      renderFormItem: () => {
        return (
          <Detail.DotLabel
            title={formatMessage({
              id: 'siteMonitor.statusInformation',
              defaultMessage: '状态信息',
            })}
            className="mb0"
          />
        );
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: effectStatus,
      formItemProps: {
        rules: [
          {
            required: true,
            message:
              formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
              formatMessage({ id: 'common.status', defaultMessage: '状态' }),
          },
        ],
      },
    },
    {
      title: '',
      renderFormItem: () => {
        return (
          <Detail.DotLabel
            title={formatMessage({ id: 'taskManage.basicInformation', defaultMessage: '基础信息' })}
            className="mb0"
          />
        );
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'user.accountName', defaultMessage: '账号名' }),
      dataIndex: 'userName',
      formItemProps: {
        rules: [
          {
            required: true,
            message:
              formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请填写' }) +
              formatMessage({ id: 'user.accountName', defaultMessage: '账号名' }),
          },
        ],
      },
      fieldProps: {
        autoComplete: 'off',
        disabled: type === FormTypeEnum.Edit,
      },
    },
    {
      title: formatMessage({ id: 'common.userName', defaultMessage: '用户名' }),
      dataIndex: 'nickName',
      formItemProps: {
        rules: [
          {
            required: true,
            message:
              formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请填写' }) +
              formatMessage({ id: 'common.userName', defaultMessage: '用户名' }),
          },
        ],
      },
    },
    {
      title: formatMessage({ id: 'system.User.user_id', defaultMessage: '用户ID' }),
      dataIndex: 'userId',
      fieldProps: {
        disabled: true,
      },
    },
    {
      title: formatMessage({ id: 'user.role', defaultMessage: '角色' }),
      dataIndex: 'roleId',
      valueType: 'select',
      fieldProps: (form) => {
        return {
          options: roleOptions,
          onChange: () => {
            types?.[0] !== OrgTypeEnum.System && form?.setFieldValue?.('orgId', null);
            form?.setFieldValue?.('webConfig', undefined);
          },
        };
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message:
              formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
              formatMessage({ id: 'user.role', defaultMessage: '角色' }),
          },
        ],
      },
    },
    types?.[0] === OrgTypeEnum.System
      ? {
          title: formatMessage({ id: 'user.organization', defaultMessage: '组织' }),
          dataIndex: 'orgId',
          valueType: 'treeSelect',
          request: () => {
            return getDeptList({ excludeRootId: 1 }).then(({ data }) => {
              return buildTreeData(data || [], 'orgId', 'orgName', '', '', '');
            });
          },
          formItemProps: {
            rules: [
              {
                required: true,
                message:
                  formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
                  formatMessage({ id: 'user.organization', defaultMessage: '组织' }),
              },
            ],
          },
        }
      : {
          title: formatMessage({ id: 'user.organization', defaultMessage: '组织' }),
          dataIndex: 'orgId',
          valueType: 'select',
          dependencies: ['roleId'],
          request: (params) => {
            const roleOrgTypeMap = arrayToMap(roleOptions, 'roleId', 'orgType');
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
            rules: [
              {
                required: true,
                message:
                  formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
                  formatMessage({ id: 'user.organization', defaultMessage: '组织' }),
              },
            ],
          },
        },
    {
      title: formatMessage({ id: 'user.mobilePhone', defaultMessage: '手机' }),
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
                  return Promise.reject(
                    formatMessage({ id: 'user.phoneFormatError', defaultMessage: '电话格式错误' }),
                  );
                }
              },
            };
          },
        ],
      },
      fieldProps: {
        onCompositionEnd: (e) => {
          console.log(e);
        },
      },
    },
    // {
    //   title: formatMessage({ id: 'common.mailbox', defaultMessage: '邮箱' }),
    //   dataIndex: 'email',
    //   formItemProps: {
    //     rules: [
    //       () => {
    //         return {
    //           validator: (_: any, value: string) => {
    //             if (isEmpty(value)) {
    //               return Promise.resolve();
    //             } else if (verifyEmail(value)) {
    //               return Promise.resolve();
    //             } else {
    //               return Promise.reject(
    //                 formatMessage({ id: 'user.emailFormatError', defaultMessage: '邮箱格式错误!' }),
    //               );
    //             }
    //           },
    //         };
    //       },
    //     ],
    //   },
    //   fieldProps: {
    //     onCompositionEnd: (e) => {
    //       console.log(e);
    //     },
    //   },
    // },
    {
      title: formatMessage({ id: 'system.initialPassword', defaultMessage: '初始密码' }),
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
                      return Promise.reject(
                        formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请填写' }) +
                          formatMessage({
                            id: 'system.initialPassword',
                            defaultMessage: '初始密码',
                          }),
                      );
                    }
                  } else if (!verifyPassword(value)) {
                    return Promise.reject(
                      formatMessage({
                        id: 'user.phoneFormatErrorHint',
                        defaultMessage: '格式错误：8-16个数字单词，至少其中两种:字母/数字/符号',
                      }),
                    );
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
        placeholder: formatMessage({
          id: 'user.phoneFormatHint',
          defaultMessage: '8-16个数字单词，至少其中两种:字母/数字/符号',
        }),
      },
    },
    {
      title: formatMessage({ id: 'user.confirmPassword', defaultMessage: '确认密码' }),
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
                      return Promise.reject(
                        formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请填写' }) +
                          formatMessage({
                            id: 'user.confirmPassword',
                            defaultMessage: '确认密码',
                          }),
                      );
                    }
                  } else if (password !== value) {
                    return Promise.reject(
                      formatMessage({
                        id: 'user.initialPasswordDifferentConfirmPassword',
                        defaultMessage: '初始密码和确认密码不一致',
                      }),
                    );
                  } else if (!verifyPassword(value)) {
                    return Promise.reject(
                      formatMessage({
                        id: 'user.phoneFormatErrorHint',
                        defaultMessage: '格式错误：8-16个数字单词，至少其中两种:字母/数字/符号',
                      }),
                    );
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
        placeholder: formatMessage({
          id: 'user.phoneFormatHint',
          defaultMessage: '8-16个数字单词，至少其中两种:字母/数字/符号',
        }),
      },
    },
    // TODO: 未联调，暂时注释
    // {
    //   title: '',
    //   renderFormItem: () => {
    //     return (
    //       <Detail.DotLabel
    //         title={formatMessage({
    //           id: 'alarmManage.1012',
    //           defaultMessage: '告警配置',
    //         })}
    //         className="mb0"
    //       />
    //     );
    //   },
    //   colProps: {
    //     span: 24,
    //   },
    // },
    // {
    //   title: formatMessage({ id: 'alarmManage.1013', defaultMessage: '推送方式' }),
    //   dataIndex: 'sendWay',
    //   formItemProps: {
    //     rules: [
    //       {
    //         required: true,
    //         message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
    //       },
    //     ],
    //   },
    //   renderFormItem: () => {
    //     return (
    //       <Checkbox.Group>
    //         <Checkbox value="1" defaultChecked style={{ lineHeight: '32px', marginLeft: '8px' }}>
    //           APP消息推送
    //         </Checkbox>
    //         <Checkbox value="2" defaultChecked style={{ lineHeight: '32px' }}>
    //           邮箱
    //         </Checkbox>
    //       </Checkbox.Group>
    //     );
    //   },
    //   colProps: {
    //     span: 24,
    //   },
    // },
    // {
    //   title: formatMessage({ id: 'alarmManage.1014', defaultMessage: '推送级别' }),
    //   dataIndex: 'sendLevel',
    //   formItemProps: {
    //     rules: [
    //       {
    //         required: true,
    //         message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
    //       },
    //     ],
    //   },
    //   renderFormItem: () => {
    //     const alarmLevelSpans: React.ReactNode[] = [];
    //     levelMap.forEach((_: any, key: string) => {
    //       alarmLevelSpans.push(
    //         <span className={`${styles.alarmWrap} ${styles[key]}`}>
    //           <Checkbox className="py2" value={key}>
    //             <YTAlarmFullOutlined />
    //             {levelMap.get(key)}
    //           </Checkbox>
    //         </span>,
    //       );
    //     });

    //     return (
    //       <>
    //         <Checkbox.Group
    //           className="mr24"
    //           onChange={(value) => {
    //             console.log('value', value);
    //           }}
    //           defaultValue={[]}
    //         >
    //           <Space>{alarmLevelSpans}</Space>
    //         </Checkbox.Group>
    //       </>
    //     );
    //   },
    //   colProps: {
    //     span: 24,
    //   },
    // },
    {
      valueType: 'dependency',
      name: ['roleId'],
      columns: ({ roleId }) => {
        const roleInfo = roleOptions.filter((i) => i.roleId == roleId)[0] || {};
        const roleType = roleInfo.type || 0;
        const orgType = roleInfo.orgType;
        return roleType == 0
          ? [
              {
                title: formatMessage({ id: 'user.associatedSite', defaultMessage: '关联站点' }),
                dataIndex: 'sites',
                valueType: TABLESELECT,
                hideInForm: types?.[0] === OrgTypeEnum.System || orgType == OrgTypeEnum.Install,
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
            ]
          : [
              {
                title: formatMessage({ id: 'user.associatedSite', defaultMessage: '关联站点' }),
                dataIndex: 'webConfig',
                valueType: 'treeSelect',
                dependencies: ['roleId'],
                formItemProps: {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'common.pleaseSelect',
                        defaultMessage: '请选择',
                      }),
                    },
                  ],
                },
                colProps: {
                  span: 24,
                },
                fieldProps: (form) => {
                  return {
                    multiple: true,
                    treeCheckable: true,
                    treeDefaultExpandAll: true,
                    onSelect: (id: string) => {
                      if (id === '0') form.setFieldValue('webConfig', ['0']);
                    },
                    filterTreeNode: (searchValue: string, treeNode: SiteDataType) => {
                      return !!treeNode?.title && treeNode?.title?.indexOf?.(searchValue) > -1;
                    },
                  };
                },
                request: (params) => {
                  return getThreeLevelSiteTree({ roleId: params.roleId }).then(({ data }) => {
                    return HanderTreeData([data]);
                  });
                },
              },
            ];
      },
    },
    {
      title: formatMessage({ id: 'common.remark', defaultMessage: '备注' }),
      dataIndex: 'remark',
      valueType: 'textarea',
      colProps: {
        span: 24,
      },
    },
  ];
  return formColumns;
};

export const getStationColumns: YTProColumns<any, any>[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
  },
  {
    title: formatMessage({ id: 'siteManage.siteList.siteCode', defaultMessage: '站点编码' }),
    dataIndex: 'siteId',
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'siteManage.siteList.siteName', defaultMessage: '站点名称' }),
    dataIndex: 'siteName',
    ellipsis: true,
    hideInSearch: true,
  },
];
