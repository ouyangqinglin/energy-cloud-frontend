import PositionSelect from '@/components/PositionSelect';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { isCreate } from '@/components/YTModalForm/helper';
import { FormOperations } from '@/components/YTModalForm/typing';
import { effectStatus } from '@/utils/dict';
import { verifyPhone } from '@/utils/reg';
import { buildTreeData } from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { getServiceList } from '../service';
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
      title: '组织名称',
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
      title: '组织ID',
      valueType: 'input',
      fieldProps: {
        value: orgId,
        disabled: true,
      },
    },
    {
      title: '上级组织',
      valueType: 'treeSelect',
      fieldProps: {
        placeholder: '请选择上级组织',
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      request: async () => {
        const res = await getServiceList();
        let depts = buildTreeData(res?.data as any[], 'orgId', 'orgName', '', '', '');
        if (depts.length === 0) {
          depts = [{ id: 0, title: '无上级', children: undefined, key: 0, value: 0 }];
        }
        return depts;
      },
      dataIndex: ['parentId'],
    },
    {
      title: '显示顺序',
      dataIndex: ['orderNum'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      colProps: {
        span: 8,
      },
      fieldProps: {
        style: {
          width: '100%',
        },
      },
      valueType: 'digit',
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
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      dataIndex: ['addressInfo'],
      renderFormItem(schema, config, form, action) {
        return <PositionSelect />;
      },
    },
  ];
};
