import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { isCreate } from '@/components/YTModalForm/helper';
import { FormOperations } from '@/components/YTModalForm/typing';
import { effectStatus } from '@/utils/dictionary';
import type { ProColumns } from '@ant-design/pro-components';
import type { ServiceUpdateInfo } from '../type';
import PositionSelect from '@/components/PositionSelect';

export const Columns: (
  operation: FormOperations,
  orgId: number,
) => ProColumns<ServiceUpdateInfo, TABLESELECTVALUETYPE>[] = (operation, orgId) => {
  return [
    {
      title: '安装商名称',
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
      title: '安装商ID',
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       message: '此项为必填项',
      //     },
      //   ],
      // },
      valueType: 'input',
      fieldProps: {
        value: orgId,
        disabled: isCreate(operation),
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
      title: '手机',
      dataIndex: ['phone'],
    },
    {
      title: '座机',
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
