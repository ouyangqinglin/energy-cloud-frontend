import PositionSelect from '@/components/PositionSelect';
import { effectStatus } from '@/utils/dict';
import type { ProColumns } from '@ant-design/pro-components';
import type { ServiceUpdateInfo } from '../type';
import Detail from '@/components/Detail';
import { formatMessage } from '@/utils';

export const Columns: (orgId?: number) => ProColumns<ServiceUpdateInfo, 'text'>[] = (orgId) => {
  return [
    {
      title: '',
      renderFormItem: () => {
        return (
          <Detail.DotLabel
            title={formatMessage({
              id: 'siteMonitor.statusInformation',
              defaultMessage: '状态信息',
            })}
            className="mb0"
          />
        );
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
      dataIndex: ['status'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
          },
        ],
      },
      valueEnum: effectStatus,
    },
    {
      title: '',
      renderFormItem: () => {
        return (
          <Detail.DotLabel
            title={formatMessage({ id: 'taskManage.basicInformation', defaultMessage: '基础信息' })}
            className="mb0"
          />
        );
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'system.organizationName', defaultMessage: '组织名称' }),
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
          },
        ],
      },
      dataIndex: ['orgName'],
    },
    {
      title: formatMessage({ id: 'system.organizationId', defaultMessage: '组织ID' }),
      dataIndex: ['orgId'],
      fieldProps: {
        value: orgId,
        disabled: true,
      },
    },
    {
      title: formatMessage({ id: 'system.contacts', defaultMessage: '联系人' }),
      dataIndex: ['linkman'],
    },
    {
      title: formatMessage({ id: 'common.telephone', defaultMessage: '联系电话' }),
      dataIndex: ['phone'],
    },
    {
      title: formatMessage({ id: 'system.contactLandline', defaultMessage: '联系座机' }),
      dataIndex: ['landlineNumber'],
    },
    {
      title: formatMessage({ id: 'common.remark', defaultMessage: '备注' }),
      colProps: {
        span: 24,
      },
      dataIndex: ['remark'],
      valueType: 'textarea',
    },
    {
      title: formatMessage({ id: 'system.position', defaultMessage: '位置' }),
      colProps: {
        span: 24,
      },
      dataIndex: ['addressInfo'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
          },
        ],
      },
      renderFormItem(schema, config, form, action) {
        return <PositionSelect />;
      },
    },
  ];
};
