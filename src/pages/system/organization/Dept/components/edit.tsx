import type { ProFormColumnsType } from '@ant-design/pro-form';
import type { CustomerInfo } from '../data';
import { getCustomerInfo, getProviders, getRoles, saveCustomerInfo } from '../service';
import YTModalForm from '@/components/YTModalForm';
import type { FormOperations } from '@/components/YTModalForm/typing';
import { formatMessage } from '@/utils';
const columns: ProFormColumnsType<CustomerInfo>[] = [
  {
    title: formatMessage({ id: 'taskManage.installManu', defaultMessage: '安装商' }),
    dataIndex: 'provider',
    valueType: 'select',
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
        },
      ],
    },
    request: async () => {
      const {
        data: { provider = [] },
      } = await getProviders();
      const rawSource = provider.map((it) => {
        return {
          label: it.name,
          value: it.id,
        };
      });
      return rawSource;
    },
  },
  {
    title: formatMessage({ id: 'system.account', defaultMessage: '账户'}),
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
        },
      ],
    },
    dataIndex: 'account',
  },
  {
    title: formatMessage({ id: 'system.userName', defaultMessage: '用户名' }),
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
        },
      ],
    },
    dataIndex: 'userName',
  },
  {
    title: formatMessage({ id: 'system.phone', defaultMessage: '电话' }),
    dataIndex: 'phone',
  },
  {
    title: formatMessage({ id: 'system.role', defaultMessage: '角色' }),
    dataIndex: 'roles',
    valueType: 'select',
    fieldProps: {
      mode: 'multiple',
    },
    request: async () => {
      const { data: roles } = await getRoles();
      const rawSource = roles.map((it) => {
        return {
          label: it.role,
          value: it.id,
        };
      });
      return rawSource;
    },
  },
  {
    title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
    dataIndex: 'status',
    valueEnum: new Map([
      [1, formatMessage({ id: 'system.valid', defaultMessage: '有效' })],
      [0, formatMessage({ id: 'system.invalid', defaultMessage: '无效' })],
    ]),
  },
  {
    title: formatMessage({ id: 'system.initialPassword', defaultMessage: '初始密码' }),
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
        },
      ],
    },
    valueType: 'password',
    dataIndex: 'pw',
    colProps: {
      span: 24,
    },
    width: 'xl',
  },
  {
    title: formatMessage({ id: 'common.remark', defaultMessage: '备注' }),
    dataIndex: 'note',
    valueType: 'textarea',
    colProps: {
      span: 24,
    },
    width: 'xl',
  },
];

export const CustomerModal = (props: {
  visible: boolean;
  onVisibleChange: (state: boolean) => void;
  operations: FormOperations;
  initialValues?: CustomerInfo;
}) => {
  return (
    <YTModalForm<CustomerInfo>
      layoutType={'ModalForm'}
      title={formatMessage({ id: 'common.newBuilt', defaultMessage: '新建' })}
      columns={columns}
      onFinish={async (values) => {
        console.log(values);
        await saveCustomerInfo(values);
        return true;
      }}
      request={(param) => {
        return getCustomerInfo(param).then((res) => {
          return res.data;
        });
      }}
      {...props}
    />
  );
};
