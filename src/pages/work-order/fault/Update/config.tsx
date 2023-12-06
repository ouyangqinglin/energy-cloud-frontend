import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { isCreate } from '@/components/YTModalForm/helper';
import { FormOperations } from '@/components/YTModalForm/typing';
import { effectStatus } from '@/utils/dict';
import type { ProColumns } from '@ant-design/pro-components';
import type { ServiceUpdateInfo } from '../type';
import { formatMessage } from '@/utils';

export const Columns: (
  operation: FormOperations,
  orgId: number,
) => ProColumns<ServiceUpdateInfo, TABLESELECTVALUETYPE>[] = (operation, orgId) => {
  return [
    {
      title: formatMessage({ id: 'taskManage.installerName', defaultMessage: '安装商名称' }),
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'taskManage.fieldRequired', defaultMessage: '此项为必填项' }),
          },
        ],
      },
      dataIndex: ['orgName'],
    },
    {
      title: formatMessage({ id: 'installerId', defaultMessage: '安装商ID' }),
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
        disabled: true,
      },
    },
    {
      title: formatMessage({ id: 'taskManage.state', defaultMessage: '状态' }),
      dataIndex: ['status'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'taskManage.fieldRequired', defaultMessage: '此项为必填项' }),
          },
        ],
      },
      valueEnum: effectStatus,
    },
    {
      title: formatMessage({ id: 'taskManage.phone', defaultMessage: '电话' }),
      dataIndex: ['phonenumber'],
    },
    {
      title: formatMessage({ id: 'taskManage.remark', defaultMessage: '备注' }),
      colProps: {
        span: 16,
      },
      dataIndex: ['remark'],
      valueType: 'textarea',
    },
  ];
};
