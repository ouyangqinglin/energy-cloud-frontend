import { formatMessage } from '@/utils';
import { effectStatus } from '@/utils/dict';
import type { ProFormColumnsType } from '@ant-design/pro-form';

export const columns: ProFormColumnsType[] = [
  {
    title: formatMessage({ id: 'system.Role.role_name', defaultMessage: '角色名称' }),
    fieldProps: {
      placeholder:
        formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
        formatMessage({ id: 'system.Role.role_name', defaultMessage: '角色名称' }),
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
            formatMessage({ id: 'system.Role.role_name', defaultMessage: '角色名称' }),
        },
      ],
    },
    dataIndex: 'roleName',
  },
  {
    title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),

    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
            formatMessage({ id: 'common.status', defaultMessage: '状态' }),
        },
      ],
    },
    valueEnum: effectStatus,
    fieldProps: {
      placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
    },
    dataIndex: 'status',
  },
  {
    title: formatMessage({ id: 'common.remark', defaultMessage: '备注' }),
    dataIndex: 'remark',
    valueType: 'textarea',
    fieldProps: {
      placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
      className: 'w-full',
    },
    colProps: {
      span: 24,
    },
  },
];
