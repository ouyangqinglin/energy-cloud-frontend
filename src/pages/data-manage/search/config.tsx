import type { ProColumns } from '@ant-design/pro-components';
import { TABLETREESELECT } from '@/components/TableSelect';
import type {
  TABLETREESELECTVALUETYPE,
  TableTreeModalProps,
  dealTreeDataType,
} from '@/components/TableSelect';
import type { TableSearchType, CollectionValueType, TableDataType } from './type';
import { getSiteDeviceTree, getDeviceCollection } from '@/services/equipment';
import moment from 'moment';
import type { Moment } from 'moment';
import { formatMessage, getLocale } from '@/utils';

const tableSelectColumns: ProColumns<TableDataType, TABLETREESELECTVALUETYPE>[] = [
  {
    title: formatMessage({
      id: 'siteManage.set.dataCollectionPoints',
      defaultMessage: '数据采集点',
    }),
    dataIndex: 'modelName',
    width: 200,
    ellipsis: true,
    hideInTable: true,
    fieldProps: {
      onPressEnter: (e) => {
        e.preventDefault();
      },
    },
  },
  {
    title: formatMessage({
      id: 'siteManage.set.dataCollectionPoints',
      defaultMessage: '数据采集点',
    }),
    dataIndex: 'paramName',
    width: 200,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({
      id: 'siteManage.set.dataCollectionPointIdIdentify',
      defaultMessage: '数据采集点标识',
    }),
    dataIndex: 'paramCode',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
];
const dealTreeData: dealTreeDataType = (item) => {
  item.selectable = !!item.productId;
};

export const getDeviceSearchColumns = (deviceId?: string) => {
  const searchColumns: ProColumns<TableDataType, TABLETREESELECTVALUETYPE>[] = [
    {
      title: formatMessage({
        id: 'siteManage.set.dataCollectionPoints',
        defaultMessage: '数据采集点',
      }),
      dataIndex: 'collection',
      valueType: TABLETREESELECT,
      hideInTable: true,
      dependencies: deviceId ? ['siteId'] : [],
      formItemProps: {
        rules: [
          {
            required: true,
            message:
              formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
              formatMessage({
                id: 'siteManage.set.dataCollectionPoints',
                defaultMessage: '数据采集点',
              }),
          },
        ],
      },
      fieldProps: (form) => {
        const value = form?.getFieldValue?.('siteId');
        const tableTreeSelectProps: TableTreeModalProps<
          CollectionValueType,
          TableDataType,
          TableSearchType,
          any
        > = {
          title:
            formatMessage({ id: 'common.select', defaultMessage: '选择' }) +
            formatMessage({
              id: 'siteManage.set.dataCollectionPoints',
              defaultMessage: '数据采集点',
            }),
          treeProps: {
            fieldNames: {
              title: 'deviceName',
              key: 'id',
              children: 'children',
            },
            request: () => getSiteDeviceTree(deviceId ? { deviceId } : { siteId: value }),
            ...(deviceId ? { defaultSelectedKeys: [deviceId] } : {}),
          },
          dealTreeData,
          proTableProps: {
            pagination: false,
            columns: tableSelectColumns as any,
            request: getDeviceCollection,
          },
          valueId: 'selectName',
          valueName: 'paramName',
          limit: 2,
          limitSelect: 250,
          onFocus: () => {
            return deviceId ? undefined : form?.validateFields(['siteId']);
          },
        };
        return tableTreeSelectProps;
      },
    },
  ];
  return searchColumns;
};

export const timeColumns: ProColumns<TableDataType>[] = [
  {
    title: formatMessage({ id: 'common.time', defaultMessage: '时间' }),
    dataIndex: 'time',
    valueType: 'dateRange',
    search: {
      transform: (value) => {
        return {
          startTime: value[0] + ' 00:00:00',
          endTime: value[1] + ' 23:59:59',
        };
      },
    },
    render: (_, record) => record?.time,
    initialValue: [moment().startOf('day'), moment().endOf('day')],
    width: 150,
    formItemProps: {
      rules: [
        {
          required: true,
          message:
            formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
            formatMessage({ id: 'common.time', defaultMessage: '时间' }),
        },
      ],
    },
    fieldProps: (form) => {
      return {
        onOpenChange: (open: boolean) => {
          if (open) {
            window.dataSearchDates = [];
            window.dataSearchSelectDates = form?.getFieldValue?.('time');
            form?.setFieldValue?.('time', []);
          } else {
            if (window.dataSearchDates?.[0] && window.dataSearchDates?.[1]) {
              form?.setFieldValue?.('time', window.dataSearchDates);
            } else {
              form?.setFieldValue?.('time', window.dataSearchSelectDates);
            }
          }
        },
        onCalendarChange: (val: Moment[]) => {
          window.dataSearchDates = [...(val || [])];
        },
        disabledDate: (current: Moment) => {
          if (!window.dataSearchDates) {
            return false;
          }
          const tooLate =
            window.dataSearchDates?.[0] && current.diff(window.dataSearchDates?.[0], 'days') > 7;
          const tooEarly =
            window.dataSearchDates?.[1] && window.dataSearchDates?.[1].diff(current, 'days') > 7;
          return !!tooEarly || !!tooLate;
        },
      };
    },
  },
];
