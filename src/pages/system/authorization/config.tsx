import { Switch } from 'antd';
import type { AuthDataType } from './type';
import { formatMessage } from '@/utils';
import { YTProColumns } from '@/components/YTProTable/typing';
import { ProColumns, ProFormColumnsType } from '@ant-design/pro-components';
import { getProductTypeList } from '@/services/equipment';
import { TABLESELECT, TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { getSitePage } from '@/services/station';

const tableSelectColumns: ProColumns[] = [
  {
    title: formatMessage({ id: 'siteManage.siteList.siteCode', defaultMessage: '站点编码' }),
    dataIndex: 'id',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'siteManage.siteList.siteName', defaultMessage: '站点名称' }),
    dataIndex: 'name',
    width: 200,
    ellipsis: true,
  },
];

export const columns: YTProColumns<AuthDataType>[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: formatMessage({ id: 'system.applyName', defaultMessage: '应用名称' }),
    dataIndex: 'appName',
    width: 120,
    ellipsis: true,
  },
  {
    title: 'accessKeyId',
    dataIndex: 'appId',
    width: 120,
    ellipsis: true,
  },
  {
    title: 'accessKey',
    dataIndex: 'secret',
    valueType: 'password',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: 'encryptionKey',
    dataIndex: 'encryptKey',
    valueType: 'password',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
    dataIndex: 'status',
    renderWithEmit(_, { status, id, emit }) {
      return (
        <Switch
          checkedChildren={formatMessage({ id: 'common.enable', defaultMessage: '启用' })}
          unCheckedChildren={formatMessage({ id: 'common.disable', defaultMessage: '禁用' })}
          checked={!!status}
          onChange={(value) => emit?.('enable', { id, status: Number(value) })}
        />
      );
    },
    width: 100,
  },
  {
    title: formatMessage({ id: 'common.description', defaultMessage: '描述' }),
    dataIndex: 'description',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'common.createTime', defaultMessage: '创建时间' }),
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 120,
  },
];

export const formColumns: ProFormColumnsType<AuthDataType, TABLESELECTVALUETYPE>[] = [
  {
    title: formatMessage({ id: 'system.applyName', defaultMessage: '应用名称' }),
    dataIndex: 'appName',
    formItemProps: {
      rules: [
        {
          required: true,
        },
      ],
    },
  },
  {
    title: 'accessKeyId',
    dataIndex: 'appId',
    formItemProps: {
      rules: [
        {
          required: true,
        },
      ],
    },
  },
  {
    title: formatMessage({ id: 'system.1020', defaultMessage: '选择产品' }),
    dataIndex: 'productTypeIds',
    valueType: 'treeSelect',
    colProps: {
      span: 24,
    },
    fieldProps: {
      multiple: true,
      treeCheckable: true,
      treeDefaultExpandAll: true,
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
        },
      ],
    },
    request: () => {
      return getProductTypeList({}).then(({ data }) => {
        const children = data?.map?.((item) => {
          return {
            title: item?.name || '',
            value: item?.id || '',
          };
        });
        return [
          {
            title: formatMessage({ id: 'system.1008', defaultMessage: '全选' }),
            value: '',
            children,
          },
        ];
      });
    },
  },
  {
    title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
    dataIndex: 'status',
    valueType: 'switch',
    fieldProps: {
      checkedChildren: formatMessage({ id: 'common.enable', defaultMessage: '启用' }),
      unCheckedChildren: formatMessage({ id: 'common.disable', defaultMessage: '禁用' }),
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
        },
      ],
    },
    initialValue: true,
  },
  {
    valueType: 'group',
    columns: [
      {
        title: formatMessage({ id: 'system.1021', defaultMessage: '采样频率' }),
        dataIndex: 'timeWindow',
        valueType: 'digit',
        fieldProps: {
          addonAfter: formatMessage({ id: 'common.minute', defaultMessage: '分钟' }),
          min: 1,
          max: 10,
          step: 1,
        },
        formItemProps: {
          rules: [
            {
              required: true,
            },
          ],
        },
        initialValue: 1,
      },
      {
        title: ' ',
        dataIndex: 'limitNum',
        valueType: 'digit',
        fieldProps: {
          addonAfter: formatMessage({ id: 'common.1006', defaultMessage: '次' }),
          min: 1,
          max: 10,
          step: 1,
        },
        formItemProps: {
          required: false,
          rules: [
            {
              required: true,
            },
          ],
        },
        initialValue: 1,
      },
    ],
  },
  {
    title: formatMessage({ id: 'user.associatedSite', defaultMessage: '关联站点' }),
    dataIndex: 'siteIds',
    valueType: TABLESELECT,
    colProps: {
      span: 24,
    },
    fieldProps: (form) => {
      return {
        proTableProps: {
          columns: tableSelectColumns,
          request: (params: any) =>
            getSitePage(params).then(({ data }) => {
              return {
                data: data?.list || [],
                total: data?.total || 0,
                success: true,
              };
            }),
        },
      };
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
        },
      ],
    },
  },
  {
    title: formatMessage({ id: 'common.description', defaultMessage: '描述' }),
    dataIndex: 'description',
    valueType: 'textarea',
    colProps: {
      span: 24,
    },
  },
];
