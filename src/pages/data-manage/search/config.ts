import type { ProColumns } from '@ant-design/pro-components';
import { TABLETREESELECT, TABLESELECT } from '@/components/TableSelect';
import type {
  TABLETREESELECTVALUETYPE,
  TABLESELECTVALUETYPE,
  TableTreeModalProps,
} from '@/components/TableSelect';
import { TableSearchType, CollectionValueType, TableDataType } from './type';
import { getDeviceTree, getDeviceCollection } from '@/services/equipment';
import moment from 'moment';
import { formatMessage } from '@/utils';

const tableSelectColumns: ProColumns<TableDataType, TABLETREESELECTVALUETYPE>[] = [
  {
    title: formatMessage({ id: 'siteManage.set.dataCollectionPoints', defaultMessage: '数据采集点' }),
    dataIndex: 'paramName',
    width: 200,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'siteManage.set.dataCollectionPointIdIdentify', defaultMessage: '数据采集点标识' }),
    dataIndex: 'paramCode',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
];

export const searchColumns: ProColumns<TableDataType, TABLETREESELECTVALUETYPE>[] = [
  {
    title: formatMessage({ id: 'siteManage.set.dataCollectionPoints', defaultMessage: '数据采集点' }),
    dataIndex: 'collection',
    valueType: TABLETREESELECT,
    hideInTable: true,
    dependencies: ['siteId'],
    formItemProps: {
      rules: [{ required: true, message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) + formatMessage({ id: 'siteManage.set.dataCollectionPoints', defaultMessage: '数据采集点' }) }],
    },
    fieldProps: (form) => {
      const value = form?.getFieldValue?.('siteId');
      const tableTreeSelectProps: TableTreeModalProps<
        CollectionValueType,
        TableDataType,
        TableSearchType,
        any
      > = {
        title: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) + formatMessage({ id: 'siteManage.set.dataCollectionPoints', defaultMessage: '数据采集点' }),
        treeProps: {
          fieldNames: {
            title: 'deviceName',
            key: 'id',
            children: 'children',
          },
          request: () => getDeviceTree({ siteId: value }),
        },
        proTableProps: {
          pagination: false,
          columns: tableSelectColumns,
          request: getDeviceCollection,
        },
        valueId: 'selectName',
        valueName: 'paramName',
        limit: 2,
        onFocus: () => {
          return form?.validateFields(['siteId']);
        },
      };
      return tableTreeSelectProps;
    },
  },
];
export const getDeviceSearchColumns = (deviceId: string) => {
  const deviceSearchColumns: ProColumns<TableDataType, TABLESELECTVALUETYPE>[] = [
    {
      title: formatMessage({ id: 'siteManage.set.dataCollectionPoints', defaultMessage: '数据采集点' }),
      dataIndex: 'collection',
      valueType: TABLESELECT,
      hideInTable: true,
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) + formatMessage({ id: 'siteManage.set.dataCollectionPoints', defaultMessage: '数据采集点' }) }],
      },
      fieldProps: (form) => {
        return {
          tableId: 'paramCode',
          tableName: 'paramName',
          proTableProps: {
            columns: tableSelectColumns,
            request: (params: any) => getDeviceCollection({ deviceId, ...params }),
            pagination: false,
            scroll: {
              y: 'calc(100vh - 400px)',
            },
          },
        };
      },
    },
  ];
  return deviceSearchColumns;
};

export const timeColumns: ProColumns<TableDataType, TABLETREESELECTVALUETYPE>[] = [
  {
    title: formatMessage({ id: 'common.time', defaultMessage: '时间' }),
    dataIndex: 'date',
    valueType: 'dateRange',
    render: (_, record) => record.time,
    search: {
      transform: (value) => {
        return {
          startTime: value[0] + ' 00:00:00',
          endTime: value[1] + ' 23:59:59',
        };
      },
    },
    initialValue: [moment().startOf('day').subtract(6, 'd'), moment().endOf('day')],
    width: 150,
    formItemProps: {
      rules: [{ required: true, message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) + formatMessage({ id: 'common.time', defaultMessage: '时间' }) }],
    },
  },
];
