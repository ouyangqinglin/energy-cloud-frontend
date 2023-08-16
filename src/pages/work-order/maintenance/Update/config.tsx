import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { TABLESELECT } from '@/components/TableSelect';
import type { FormOperations } from '@/components/YTModalForm/typing';
import type { ProColumns } from '@ant-design/pro-components';
import type { MaintenanceOrderUpdateParam } from '../type';
import { OrderStatus, OrderType } from '../type';
import { isEmpty } from '@/utils';
import { verifyPhone } from '@/utils/reg';
import { orderStatus, orderType } from '../config';
import { getServiceProviderList } from '@/pages/user-manager/accounts/Customer/service';
import { getCustomerList, getInstallerList } from '../service';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export const Columns: (
  operation: FormOperations,
) => ProColumns<MaintenanceOrderUpdateParam, TABLESELECTVALUETYPE>[] = () => {
  return [
    {
      title: '故障标题',
      dataIndex: ['name'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入',
          },
        ],
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: '故障描述',
      dataIndex: ['content'],
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入',
          },
        ],
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: '工单类型',
      dataIndex: 'type',
      valueEnum: orderType,
      hideInSearch: true,
      disable: true,
      fieldProps: {
        disabled: true,
      },
      initialValue: OrderType.MAINTENANCE,
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
      initialValue: OrderStatus.READY,
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
      fieldProps: () => ({
        tableId: 'orgId',
        tableName: 'orgName',
        valueId: 'orgId',
        valueName: 'orgName',
        multiple: false,
        // onChange: (value: { orgId: number }[]) => {
        //   const curOrgId = value[0]?.orgId;
        //   if (value.length) {
        //     orgIdRef.current = curOrgId;
        //   }
        // },
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
      valueType: TABLESELECT,
      dataIndex: 'customer',
      colProps: {
        span: 8,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择客户名称',
          },
        ],
      },
      fieldProps: () => {
        return {
          tableId: 'userId',
          tableName: 'userName',
          valueId: 'userId',
          valueName: 'userName',
          multiple: false,
          proTableProps: {
            rowKey: 'userId',
            columns: [
              {
                title: '用户名',
                dataIndex: 'userId',
                width: 150,
                ellipsis: true,
              },
              {
                title: '账号',
                dataIndex: 'userName',
                width: 200,
                ellipsis: true,
                hideInSearch: true,
              },
            ],
            request: (params: Record<string, any>) => {
              return getCustomerList({ ...params })?.then(({ data }) => {
                return {
                  data: data?.list,
                  total: data?.total,
                  success: true,
                };
              });
            },
          },
        };
      },
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
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
      fieldProps: {
        style: {
          width: '100%',
        },
        showTime: true,
        format: 'YYYY-MM-DD hh:mm:ss',
        disabledDate: (current: Dayjs) => {
          return current && current < dayjs().startOf('day');
        },
      },
      valueType: 'date',
    },
    {
      title: '邮箱',
      dataIndex: ['email'],
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
      title: '维护人',
      valueType: TABLESELECT,
      dataIndex: 'handler',
      colProps: {
        span: 8,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择',
          },
        ],
      },
      fieldProps: () => {
        return {
          tableId: 'handlerBy',
          tableName: 'handlerName',
          valueId: 'handlerBy',
          valueName: 'handlerName',
          multiple: false,
          proTableProps: {
            rowKey: 'handlerBy',
            columns: [
              {
                title: '用户名',
                dataIndex: 'handlerBy',
                width: 150,
                ellipsis: true,
              },
              {
                title: '账号',
                dataIndex: 'handlerName',
                width: 200,
                ellipsis: true,
                hideInSearch: true,
              },
              {
                title: '用户类型',
                dataIndex: 'service',
                width: 200,
                ellipsis: true,
                hideInSearch: true,
              },
            ],
            request: (params: Record<string, any>) => {
              // if (isNil(orgIdRef.current)) {
              //   return;
              // }
              return getInstallerList({ ...params })?.then(({ data }) => {
                return {
                  data: data?.list.map(({ userId, userName, ...rest }) => {
                    return {
                      ...rest,
                      handlerBy: userId,
                      handlerName: userName,
                    };
                  }),
                  total: data?.total,
                  success: true,
                };
              });
            },
          },
        };
      },
    },
  ];
};
