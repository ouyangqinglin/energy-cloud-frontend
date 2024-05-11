import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { TABLESELECT } from '@/components/TableSelect';
import type { ProColumns } from '@ant-design/pro-components';
import type { MaintenanceOrderUpdateParam } from '../../maintenance/type';
import { OrderStatus, OrderType } from '../../maintenance/type';
import { formatMessage, getLocale, isEmpty } from '@/utils';
import { verifyPhone } from '@/utils/reg';
import { orderStatus, orderType } from '../config';
import { getCustomerList } from '../../maintenance/service';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { maintainerOrInstaller } from '@/pages/user-manager/accounts/Customer/service';

export const Columns: (
  serviceProviderOptions: any[],
) => ProColumns<MaintenanceOrderUpdateParam, TABLESELECTVALUETYPE>[] = (serviceProviderOptions) => {
  return [
    {
      title: formatMessage({ id: 'siteManage.siteList.siteName', defaultMessage: '站点名称' }),
      dataIndex: ['siteName'],
      disable: true,
      fieldProps: {
        disabled: true,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
          },
        ],
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'taskManage.faultHeading', defaultMessage: '故障标题' }),
      dataIndex: ['name'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
          },
        ],
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'taskManage.faultDescription', defaultMessage: '故障描述' }),
      dataIndex: ['content'],
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
          },
        ],
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
      initialValue: OrderType.MAINTENANCE,
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
      valueType: 'select',
      dataIndex: 'serviceProvider',
      fieldProps: (form) => {
        const defaultValue =
          serviceProviderOptions.length == 1 ? serviceProviderOptions[0].orgId : '';
        defaultValue && form.setFieldValue('serviceProvider', defaultValue);
        return {
          fieldNames: { label: 'orgName', value: 'orgId' },
          options: serviceProviderOptions,
        };
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({
              id: 'taskManage.installManuTips',
              defaultMessage: '请选择安装商',
            }),
          },
        ],
      },
    },
    {
      title: formatMessage({ id: 'taskManage.customerName', defaultMessage: '客户名称' }),
      valueType: TABLESELECT,
      dataIndex: 'customer',
      colProps: {
        span: 8,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({
              id: 'taskManage.selectCustomerName',
              defaultMessage: '请选择客户名称',
            }),
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
                title: formatMessage({ id: 'common.account', defaultMessage: '账号' }),
                dataIndex: 'userId',
                width: 150,
                ellipsis: true,
                hideInSearch: true,
                hideInTable: true,
              },
              {
                title: formatMessage({ id: 'common.userName', defaultMessage: '用户名' }),
                dataIndex: 'userName',
                width: 200,
                ellipsis: true,
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
      title: formatMessage({ id: 'taskManage.contactNumber', defaultMessage: '联系电话' }),
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
                  return Promise.reject(
                    formatMessage({ id: 'taskManage.phoneError', defaultMessage: '电话格式错误' }),
                  );
                }
              },
            };
          },
        ],
      },
    },
    {
      title: formatMessage({ id: 'taskManage.appointmentTime', defaultMessage: '预约时间' }),
      dataIndex: ['timeOfAppointment'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({
              id: 'taskManage.selectAppointTime',
              defaultMessage: '请选择预约时间',
            }),
          },
        ],
      },
      fieldProps: {
        style: {
          width: '100%',
        },
        format: getLocale().dateTimeNoSecondFormat,
        disabledDate: (current: Dayjs) => {
          return current && current < dayjs().startOf('day');
        },
      },
      valueType: 'dateTime',
    },
    {
      title: formatMessage({ id: 'common.mailbox', defaultMessage: '邮箱' }),
      dataIndex: ['email'],
    },
    {
      title: formatMessage({ id: 'taskManage.customerAddress', defaultMessage: '客户地址' }),
      dataIndex: ['address'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({
              id: 'taskManage.customerAddressTips',
              defaultMessage: '请输入客户地址',
            }),
          },
        ],
      },
      colProps: {
        span: 24,
      },
    },
    {
      title:
        formatMessage({ id: 'taskManage.remark', defaultMessage: '备注' }) +
        formatMessage({ id: 'taskManage.optional', defaultMessage: '(选填)' }),
      dataIndex: ['remark'],
      valueType: 'textarea',
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'taskManage.maintainer', defaultMessage: '维护人员' }),
      valueType: 'select',
      dataIndex: 'handler',
      colProps: {
        span: 8,
      },
      dependencies: ['serviceProvider'],
      fieldProps: {
        fieldNames: { label: 'userName', value: 'userId' },
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
          },
        ],
      },
      request: (params: Record<string, any>) => {
        if (!params.serviceProvider) return [];
        return maintainerOrInstaller({ orgId: params.serviceProvider })?.then(({ data }) => {
          return data;
        });
      },
    },
  ];
};
