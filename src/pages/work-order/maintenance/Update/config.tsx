import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { TABLESELECT } from '@/components/TableSelect';
import type { FormOperations } from '@/components/YTModalForm/typing';
import type { ProColumns } from '@ant-design/pro-components';
import type { MaintenanceOrderUpdateParam } from '../type';
import { OrderStatus, OrderType } from '../type';
import { formatMessage, isEmpty } from '@/utils';
import { verifyPhone } from '@/utils/reg';
import { orderStatus, orderType } from '../config';
import { getServiceProviderList } from '@/pages/user-manager/accounts/Customer/service';
import { getCustomerList, getInstallerList } from '../service';
import type { Dayjs } from 'dayjs';
import { UserType } from '../type';
import dayjs from 'dayjs';
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
  siteId: number,
) => ProColumns<MaintenanceOrderUpdateParam, TABLESELECTVALUETYPE>[] = (operation, siteId) => {
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
        // onChange: (value: { orgId: number }[]) => {
        //   const curOrgId = value[0]?.orgId;
        //   if (value.length) {
        //     orgIdRef.current = curOrgId;
        //   }
        // },
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
            return getServiceProviderList({ siteId: siteId, ...params })?.then(({ data }) => {
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
      valueType: TABLESELECT,
      dataIndex: 'handler',
      colProps: {
        span: 8,
      },
      dependencies: ['serviceProvider'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
          },
        ],
      },
      fieldProps: (form) => {
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
                dataIndex: 'nickName',
                width: 150,
                ellipsis: true,
              },
              {
                title: formatMessage({ id: 'common.account', defaultMessage: '账号' }),
                dataIndex: 'userName',
                width: 200,
                ellipsis: true,
                hideInSearch: true,
              },
              {
                title: formatMessage({ id: 'taskManage.userType', defaultMessage: '用户类型' }),
                dataIndex: 'orgType',
                valueEnum: userType,
                width: 200,
                ellipsis: true,
                hideInSearch: true,
              },
            ],
            request: (params: Record<string, any>) => {
              // if (isNil(orgIdRef.current)) {
              //   return;
              // }
              const orgId = form?.getFieldValue?.('serviceProvider')?.[0]?.orgId;
              return orgId
                ? getInstallerList({ ...params, orgId })?.then(({ data }) => {
                    return {
                      data: data?.list.map(({ userId, userName, ...rest }) => {
                        return {
                          userName,
                          ...rest,
                          handlerBy: userId,
                          handlerName: userName,
                        };
                      }),
                      total: data?.total,
                      success: true,
                    };
                  })
                : Promise.resolve({
                    success: true,
                    data: [],
                    total: 0,
                  });
            },
          },
        };
      },
    },
  ];
};
