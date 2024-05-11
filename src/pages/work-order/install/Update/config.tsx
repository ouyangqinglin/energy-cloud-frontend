import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { TABLESELECT } from '@/components/TableSelect';
import type { FormOperations } from '@/components/YTModalForm/typing';
import type { ProColumns } from '@ant-design/pro-components';
import type { InstallOrderUpdateParam } from '../type';
import { OrderStatus, OrderType, UserType } from '../type';
import { isEmpty } from '@/utils';
import { verifyPhone } from '@/utils/reg';
import { orderStatus, orderType } from '../config';
import {
  getServiceProviderList,
  maintainerOrInstaller,
} from '@/pages/user-manager/accounts/Customer/service';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { formatMessage, getLocale } from '@/utils';
const isUS = getLocale().isEnUS;

// 工单类型 0：安装工单 1：维护工单 2修复工单
const userType = new Map([
  [
    UserType.SYSTEM,
    formatMessage({ id: 'taskManage.systemAdministrator', defaultMessage: '系统管理员' }),
  ],
  [UserType.INSTALL, formatMessage({ id: 'taskManage.installioner', defaultMessage: '安装商' })],
  [UserType.YUNYING, formatMessage({ id: 'taskManage.operator', defaultMessage: '运营商' })],
  [UserType.OWNER, formatMessage({ id: 'taskManage.owner', defaultMessage: '业主' })],
]);
export const Columns: (
  operation: FormOperations,
) => ProColumns<InstallOrderUpdateParam, TABLESELECTVALUETYPE>[] = (operation) => {
  return [
    {
      title: formatMessage({ id: 'common.site.siteName', defaultMessage: '站点名称' }),
      dataIndex: 'siteName',
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
      title: formatMessage({ id: 'taskManage.installTitle', defaultMessage: '安装标题' }),
      dataIndex: 'name',
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
      title: formatMessage({ id: 'taskManage.installDesc', defaultMessage: '安装描述' }),
      dataIndex: 'content',
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
            message: formatMessage({
              id: 'taskManage.installManuTips',
              defaultMessage: '请选择安装商',
            }),
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
              title: formatMessage({
                id: 'taskManage.installerName',
                defaultMessage: '安装商名称',
              }),
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
            message: formatMessage({
              id: 'taskManage.customerNameTips',
              defaultMessage: '请输入客户名称',
            }),
          },
        ],
      },
    },
    {
      title: formatMessage({ id: 'common.telephone', defaultMessage: '联系电话' }),
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
                    formatMessage({ id: 'taskManage.phoneError', defaultMessage: '电话格式错误' }) +
                      formatMessage({
                        id: 'taskManage.example',
                        defaultMessage: '示例',
                      }) +
                      `: ${isUS ? '222-333-4444' : '131123456789'}`,
                  );
                }
              },
            };
          },
          {
            required: true,
            message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
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
      title: formatMessage({ id: 'common.remark', defaultMessage: '备注' }),
      dataIndex: ['remark'],
      valueType: 'textarea',
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'taskManage.installer', defaultMessage: '安装人' }),
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
        if (!params.serviceProvider.length) return [];
        return maintainerOrInstaller({ orgId: params.serviceProvider[0]?.orgId })?.then(
          ({ data }) => {
            return data;
          },
        );
      },
    },
  ];
};
