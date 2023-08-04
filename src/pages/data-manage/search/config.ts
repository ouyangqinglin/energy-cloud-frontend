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

const tableSelectColumns: ProColumns<TableDataType, TABLETREESELECTVALUETYPE>[] = [
  {
    title: '采集点ID',
    dataIndex: 'paramCode',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '采集点',
    dataIndex: 'paramName',
    width: 200,
    ellipsis: true,
  },
];

export const searchColumns: ProColumns<TableDataType, TABLETREESELECTVALUETYPE>[] = [
  {
    title: '采集点',
    dataIndex: 'collection',
    valueType: TABLETREESELECT,
    hideInTable: true,
    dependencies: ['siteId'],
    formItemProps: {
      rules: [{ required: true, message: '请选择采集点' }],
    },
    fieldProps: (form) => {
      const value = form?.getFieldValue?.('siteId');
      const tableTreeSelectProps: TableTreeModalProps<
        CollectionValueType,
        TableDataType,
        TableSearchType,
        any
      > = {
        title: '选择采集点',
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
      title: '采集点',
      dataIndex: 'collection',
      valueType: TABLESELECT,
      hideInTable: true,
      formItemProps: {
        rules: [{ required: true, message: '请选择采集点' }],
      },
      fieldProps: (form) => {
        return {
          tableId: 'paramCode',
          tableName: 'paramName',
          proTableProps: {
            columns: tableSelectColumns,
            request: (params: any) => getDeviceCollection({ deviceId }),
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
    title: '日期时间',
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
    initialValue: [moment().startOf('W'), moment().endOf('w')],
    width: 150,
    formItemProps: {
      rules: [{ required: true, message: '请选择时间' }],
    },
  },
];
