import PositionSelect from '@/components/PositionSelect';
import { TABLESELECT, TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { isCreate } from '@/components/YTModalForm/helper';
import { FormOperations } from '@/components/YTModalForm/typing';
import { getServiceProviderList } from '@/pages/user-manager/accounts/Platform/service';
import { effectStatus } from '@/utils/dictionary';
import type { ProColumns } from '@ant-design/pro-components';
import { useEffect, useRef } from 'react';
import type { ServiceUpdateInfo } from '../type';

export const Columns: (
  operation: FormOperations,
  orgId: number,
) => ProColumns<ServiceUpdateInfo, TABLESELECTVALUETYPE>[] = (orgId) => {
  const orgIdRef = useRef<number>();
  useEffect(() => {
    orgIdRef.current = orgId;
  }, [orgId]);

  return [
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
      title: '业主名称',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      dataIndex: ['orgName'],
    },
    {
      title: '业主ID',
      valueType: 'input',
      fieldProps: {
        value: orgId,
        disabled: true,
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
      title: '联系人',
      dataIndex: ['linkman'],
    },
    {
      title: '联系电话',
      dataIndex: ['phone'],
    },
    {
      title: '联系座机',
      dataIndex: ['landlineNumber'],
    },
    {
      title: '备注',
      colProps: {
        span: 24,
      },
      dataIndex: ['remark'],
      valueType: 'textarea',
    },
    {
      title: '位置',
      colProps: {
        span: 24,
      },
      dataIndex: ['remark'],
      renderFormItem(schema, config, form, action) {
        return <PositionSelect />;
      },
    },
  ];
};
