import PositionSelect from '@/components/PositionSelect';
import { effectStatus } from '@/utils/dictionary';
import type { ProColumns } from '@ant-design/pro-components';
import type { ServiceUpdateInfo } from '../type';
import Detail from '@/components/Detail';

export const Columns: (orgId?: number) => ProColumns<ServiceUpdateInfo, 'text'>[] = (orgId) => {
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
      dataIndex: ['orgId'],
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
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      renderFormItem(schema, config, form, action) {
        return <PositionSelect />;
      },
    },
  ];
};
