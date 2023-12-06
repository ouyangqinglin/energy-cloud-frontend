import PositionSelect from '@/components/PositionSelect';
import { TABLESELECT, TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { isCreate } from '@/components/YTModalForm/helper';
import { FormOperations } from '@/components/YTModalForm/typing';
import { effectStatus } from '@/utils/dict';
import type { ProColumns } from '@ant-design/pro-components';
import { getServiceProviderList } from '../service';
import type { ServiceUpdateInfo } from '../type';
import Detail from '@/components/Detail';

export const Columns: (orgId?: number) => ProColumns<ServiceUpdateInfo, TABLESELECTVALUETYPE>[] = (
  orgId,
) => {
  return [
    {
      title: '',
      renderFormItem: () => {
        return <Detail.DotLabel title="状态信息" className="mb0" />;
      },
      colProps: {
        span: 24,
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
      title: '',
      renderFormItem: () => {
        return <Detail.DotLabel title="基础信息" className="mb0" />;
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: '安装商',
      valueType: TABLESELECT,
      dataIndex: 'orgEfIds',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择安装商',
          },
        ],
      },
      colProps: {
        span: 24,
      },
      name: 'orgEfs',
      fieldProps: (form) => ({
        tableId: 'orgId',
        tableName: 'orgName',
        valueId: 'orgId',
        valueName: 'orgName',
        multiple: false,
        inputStyle: {
          width: '33.33%',
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
      title: '运营商名称',
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
      title: '运营商ID',
      fieldProps: {
        value: orgId,
        disabled: true,
      },
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
      dataIndex: ['addressInfo'],
      renderFormItem(schema, config, form, action) {
        return <PositionSelect />;
      },
    },
  ];
};
