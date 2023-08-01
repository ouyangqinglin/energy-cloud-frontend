import type { ProColumns } from '@ant-design/pro-components';
import { tableTreeSelectValueTypeMap, TABLETREESELECT } from '@/components/TableSelect';
import type { TABLETREESELECTVALUETYPE, TableTreeModalProps } from '@/components/TableSelect';
import { TableSearchType, CollectionValueType } from './type';
import { getDeviceTree, getDeviceCollection } from '@/services/equipment';
import moment from 'moment';

const tableSelectColumns: ProColumns[] = [
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

export const searchColumns: ProColumns<TableSearchType, TABLETREESELECTVALUETYPE>[] = [
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
        TableSearchType,
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

export const timeColumns: ProColumns<TableSearchType, TABLETREESELECTVALUETYPE>[] = [
  {
    title: '日期时间',
    dataIndex: 'date',
    valueType: 'dateRange',
    render: (_, record) => record.date,
    search: {
      transform: (value) => {
        return {
          startTime: value[0] + '00:00',
          endTime: value[1] + '23:59',
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
