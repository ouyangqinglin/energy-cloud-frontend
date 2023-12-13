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
import { formatMessage } from '@/utils';

export const Columns: (orgId?: number) => ProColumns<ServiceUpdateInfo, TABLESELECTVALUETYPE>[] = (
  orgId,
) => {
  return [
    {
      title: '',
      renderFormItem: () => {
        return <Detail.DotLabel title={formatMessage({ id: 'siteMonitor.statusInformation', defaultMessage: '状态信息' })} className="mb0" />;
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
        return <Detail.DotLabel title={formatMessage({ id: 'taskManage.basicInformation', defaultMessage: '基础信息' })} className="mb0" />;
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
      valueType: 'input',
      fieldProps: {
        value: orgId,
        disabled: true,
      },
    },
    {
      title: formatMessage({ id: 'system.supOrganization', defaultMessage: '上级组织' }),
      valueType: 'treeSelect',
      fieldProps: {
        placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请选择' })+formatMessage({ id: 'system.supOrganization', defaultMessage: '上级组织' }),
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
          },
        ],
      },
      request: async () => {
        const res = await getServiceList();
        let depts = buildTreeData(res?.data as any[], 'orgId', 'orgName', '', '', '');
        if (depts.length === 0) {
          depts = [{ id: 0, title: formatMessage({ id: 'system.noSuperior', defaultMessage: '无上级' }), children: undefined, key: 0, value: 0 }];
        }
        return depts;
      },
      dataIndex: ['parentId'],
    },
    {
      title: formatMessage({ id: 'system.displayOrder', defaultMessage: '显示顺序' }),
      dataIndex: ['orderNum'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
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
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
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
