import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { TABLESELECT } from '@/components/TableSelect';
import type { FormOperations } from '@/components/YTModalForm/typing';
import type { ProColumns } from '@ant-design/pro-components';
import type { InstallOrderUpdateParam } from '../type';
import { OrderStatus, OrderType } from '../type';
import { isEmpty } from '@/utils';
import { verifyPhone } from '@/utils/reg';
import { orderStatus, orderType } from '../config';
import { getServiceProviderList } from '@/pages/user-manager/accounts/Customer/service';
import { getCustomerList, getInstallerList } from '../service';
import { isNil } from 'lodash';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { formatMessage } from '@/utils'

export const Columns: (
  operation: FormOperations,
) => ProColumns<InstallOrderUpdateParam, TABLESELECTVALUETYPE>[] = (operation) => {
  return [
    {
      title: formatMessage({ id: 'common.site.siteName', defaultMessage: '站点名称' }),
      dataIndex: 'siteName',
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' })}], 
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'taskManage.installTitle', defaultMessage: '安装标题' }),
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) }],
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'taskManage.installDesc', defaultMessage: '安装描述' }),
      dataIndex: 'content',
      valueType: 'textarea',
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) }],
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'taskManage.workOrderType', defaultMessage: '工单类型' }),
      dataIndex: 'type',
      valueEnum: orderType,
      hideInSearch: true,
      disable: true,
      fieldProps: {
        disabled: true,
      },
      initialValue: OrderType.INSTALL,
    },
    {
      title: formatMessage({ id: 'taskManage.workOrderId', defaultMessage: '工单ID' }),
      dataIndex: 'id',
      ellipsis: true,
      fieldProps: {
        disabled: true,
      },
      hideInSearch: true,
      disable: true,
    },
    {
      title: formatMessage({ id: 'taskManage.workOrderStatus', defaultMessage: '工单状态' }),
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
      title: formatMessage({ id: 'taskManage.installManu', defaultMessage: '安装商' }),
      valueType: TABLESELECT,
      dataIndex: 'serviceProvider',
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'taskManage.installManuTips', defaultMessage: '请选择安装商' }),
          },
        ],
      },
      fieldProps: () => ({
        tableId: 'orgId',
        tableName: 'orgName',
        valueId: 'orgId',
        valueName: 'orgName',
        multiple: false,
        proTableProps: {
          columns: [
            {
              title: formatMessage({ id: 'taskManage.installerId', defaultMessage: '安装商ID' }),
              dataIndex: 'orgId',
              width: 150,
              ellipsis: true,
              hideInSearch: true,
            },
            {
              title: formatMessage({ id: 'taskManage.installerName', defaultMessage: '安装商名称' }),
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
      title: formatMessage({ id: 'taskManage.customerName', defaultMessage: '客户名称' }),
      dataIndex: 'userName',
      colProps: {
        span: 8,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'taskManage. customerNameTips', defaultMessage: '请输入客户名称' }),
          },
        ],
      },
    },
    {
      title: formatMessage({ id: 'common.telephone', defaultMessage: '联系电话' }),
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
                  return Promise.reject(formatMessage({ id: 'taskManage.phoneError', defaultMessage: '电话格式错误' }));
                }
              },
            };
          },
        ],
      },
    },
    {
      title: formatMessage({ id: 'common.appointTime', defaultMessage: '预约时间' }),
      dataIndex: ['timeOfAppointment'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'taskManage.selectAppointTime', defaultMessage: '请选择预约时间' }),
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
      title: formatMessage({ id: 'common.mailbox', defaultMessage: '邮箱' }),
      dataIndex: ['email'],
    },
    {
      title: formatMessage({ id: 'common.customerAddress', defaultMessage: '客户地址' }),
      dataIndex: ['address'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'taskManage.customerAddressTips', defaultMessage: '请输入客户地址' }),
          },
        ],
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'common.remark', defaultMessage: '备注' }),
      dataIndex: ['remark'],
      valueType: 'textarea',
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'taskManage.installer', defaultMessage: '安装人' }),
      valueType: TABLESELECT,
      dataIndex: 'handler',
      colProps: {
        span: 8,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
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
                title: formatMessage({ id: 'common.userName', defaultMessage: '用户名' }),
                dataIndex: 'userName',
                width: 150,
                ellipsis: true,
              },
              {
                title: formatMessage({ id: 'common.account', defaultMessage: '账号' }),
                dataIndex: 'handlerName',
                width: 200,
                ellipsis: true,
                hideInSearch: true,
              },
              {
                title: formatMessage({ id: 'taskManage.userType', defaultMessage: '用户类型' }),
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
