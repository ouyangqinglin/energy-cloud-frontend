import PositionSelect from '@/components/PositionSelect';
import { TABLESELECT, TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { isCreate } from '@/components/YTModalForm/helper';
import { FormOperations } from '@/components/YTModalForm/typing';
import { effectStatus } from '@/utils/dict';
import type { ProColumns } from '@ant-design/pro-components';
import { getServiceProviderList } from '../service';
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
      title: formatMessage({ id: 'system.installer', defaultMessage: '安装商' }),
      valueType: TABLESELECT,
      dataIndex: 'orgEfIds',
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'common.PleaseSelect', defaultMessage: '请选择' })+formatMessage({ id: 'system.installer', defaultMessage: '安装商' }),
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
              title: formatMessage({ id: 'system.installer', defaultMessage: '安装商' })+'ID',
              dataIndex: 'orgId',
              width: 150,
              ellipsis: true,
              hideInSearch: true,
            },
            {
              title: formatMessage({ id: 'system.installerName', defaultMessage: '安装商名称' }),
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
      title: formatMessage({ id: 'system.operatorName', defaultMessage: '运营商名称' }),
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
      title: formatMessage({ id: 'system.operatorId', defaultMessage: '运营商ID' }),
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
      renderFormItem(schema, config, form, action) {
        return <PositionSelect />;
      },
    },
  ];
};
