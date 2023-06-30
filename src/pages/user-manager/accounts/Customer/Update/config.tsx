import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { TABLESELECT } from '@/components/TableSelect';
import { FormOperations } from '@/components/YTModalForm/typing';
import { effectStatus } from '@/utils/dictionary';
import type { ProColumns } from '@ant-design/pro-components';
import { isNil } from 'lodash';
import { useState, useEffect, useRef } from 'react';
import { getRoleListForCurrentUser, getServiceProviderList, getSiteList } from '../service';
import type { TransformCustomerUpdateInfo } from '../type';

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
      title: '服务商',
      valueType: TABLESELECT,
      dataIndex: 'serviceProvider',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
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
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      hideInTable: true,
      fieldProps: {
        mode: 'multiple',
      },
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
            message: '此项为必填项',
          },
        ],
      },
      valueEnum: effectStatus,
    },
    {
      title: '关联站点',
      valueType: TABLESELECT,
      dataIndex: 'sites',
      colProps: {
        span: 16,
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
      title: operation === FormOperations.CREATE ? '初始密码' : '修改密码',
      valueType: 'password',
      colProps: {
        span: 16,
      },
      dataIndex: 'password',
    },
    {
      title: '备注',
      colProps: {
        span: 16,
      },
      dataIndex: ['remark'],
      valueType: 'textarea',
    },
  ];
};
