import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { TABLESELECT } from '@/components/TableSelect';
import type { FormOperations } from '@/components/YTModalForm/typing';
import type { ProColumns } from '@ant-design/pro-components';
import { useEffect, useRef } from 'react';
import type { InstallOrderUpdateParam } from '../type';
import { OrderStatus, OrderType } from '../type';
import { isEmpty } from '@/utils';
import { verifyPhone } from '@/utils/reg';
import { orderStatus, orderType } from '../config';
import { getServiceProviderList } from '@/pages/user-manager/accounts/Customer/service';

export const Columns: (
  operation: FormOperations,
  orgId: number,
) => ProColumns<InstallOrderUpdateParam, TABLESELECTVALUETYPE>[] = (operation, orgId) => {
  const orgIdRef = useRef<number>();
  useEffect(() => {
    orgIdRef.current = orgId;
  }, [orgId]);

  return [
    {
      title: '工单类型',
      dataIndex: 'type',
      valueEnum: orderType,
      hideInSearch: true,
      disable: true,
      fieldProps: {
        disabled: true,
      },
      initialValue: orderType.get(OrderType.INSTALL),
    },
    {
      title: '工单ID',
      dataIndex: 'id',
      ellipsis: true,
      fieldProps: {
        disabled: true,
      },
      hideInSearch: true,
      disable: true,
    },
    {
      title: '工单状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: {
        disabled: true,
      },
      valueEnum: orderStatus,
      disable: true,
      initialValue: orderStatus.get(OrderStatus.READY),
    },
    {
      title: '安装商',
      valueType: TABLESELECT,
      dataIndex: 'serviceProvider',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择安装商',
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
              title: '安装商ID',
              dataIndex: 'orgId',
              width: 150,
              ellipsis: true,
              hideInSearch: true,
            },
            {
              title: '安装商名称',
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
      title: '客户名称',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请填写客户名称',
          },
        ],
      },
      dataIndex: 'nickName',
    },
    {
      title: '联系电话',
      dataIndex: 'telephone',
      formItemProps: {
        required: true,
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
      title: '预约时间',
      dataIndex: ['timeOfAppointment'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择预约时间',
          },
        ],
      },
      valueType: 'date',
    },
    {
      title: '邮箱',
      dataIndex: ['email'],
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       message: '请输入邮箱',
      //     },
      //   ],
      // },
    },
    {
      title: '客户地址',
      dataIndex: ['address'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入客户地址',
          },
        ],
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: '备注（选填）',
      dataIndex: ['remark'],
      valueType: 'textarea',
      colProps: {
        span: 24,
      },
    },
    {
      title: '安装人',
      valueType: TABLESELECT,
      dataIndex: 'handlerBy',
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
                title: '用户名',
                dataIndex: 'id',
                width: 150,
                ellipsis: true,
              },
              {
                title: '账号',
                dataIndex: 'account',
                width: 200,
                ellipsis: true,
                hideInSearch: true,
              },
              {
                title: '用户类型',
                dataIndex: 'account',
                width: 200,
                ellipsis: true,
                hideInSearch: true,
              },
            ],
            // request: (params: Record<string, any>) => {
            //   if (isNil(orgIdRef.current)) {
            //     return;
            //   }
            //   return getSiteList({ ...params, ...{ orgId: orgIdRef.current } })?.then(
            //     ({ data }) => {
            //       return {
            //         data: data?.list,
            //         total: data?.total,
            //         success: true,
            //       };
            //     },
            //   );
            // },
          },
        };
      },
    },
  ];
};
