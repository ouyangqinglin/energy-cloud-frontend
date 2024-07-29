import type { ProColumns } from '@ant-design/pro-components';
import { TABLETREESELECT } from '@/components/TableSelect';
import type {
  TABLETREESELECTVALUETYPE,
  TableTreeModalProps,
  dealTreeDataType,
} from '@/components/TableSelect';
import type { TableSearchType, CollectionValueType, TableDataType } from './type';
import {
  getSiteDeviceTree,
  getDeviceCollection,
  getMultipleDeviceTree,
} from '@/services/equipment';
import moment from 'moment';
import type { Moment } from 'moment';
import { formatMessage, getLocale, parseToObj } from '@/utils';
import { DeviceModelType, DeviceTreeDataType } from '@/types/device';
import { getSitesList } from '@/services/station';
import { TreeNodeProps } from 'antd';

type DeviceMapDataType = {
  sn: string;
  deviceName: string;
  collection: {
    name: string;
    id: string;
  }[];
};

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

const requestTree = (node: DeviceTreeDataType) => {
  if (node.children) {
    return Promise.resolve();
  } else {
    return getSiteDeviceTree({ siteId: node.siteId }).then((res) => {
      return res?.data?.[0]?.children || [];
    });
  }
};

const requestSiteList = () => {
  return getSitesList().then((res) => {
    res?.data?.map?.((item: DeviceTreeDataType) => {
      item.deviceName = item.name;
      item.isLeaf = false;
      item.siteId = item.id;
    });
    return res;
  });
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
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
          },
        ],
      },
      fieldProps: {
        title: formatMessage({ id: 'common.select', defaultMessage: '请选择' }),
        treeProps: {
          fieldNames: {
            title: 'deviceName',
            key: 'id',
            children: 'children',
          },
          ...(deviceId
            ? {
                request: () => getSiteDeviceTree({ deviceId }),
                defaultSelectedKeys: [deviceId],
              }
            : {
                request: requestSiteList,
                loadData: requestTree,
                defaultExpandAll: false,
              }),
        },
        treeSearch: {
          filterData: (data: DeviceTreeDataType[], searchValue: string) => {
            const result: DeviceTreeDataType[] = [];
            data?.forEach?.((item) => {
              if (item?.deviceName?.indexOf && item?.deviceName?.indexOf?.(searchValue) > -1) {
                result.push(item);
              }
            });
            return result;
          },
          placeholder: formatMessage({ id: 'dataManage.1060', defaultMessage: '筛选站点' }),
        },
        proTableProps: {
          pagination: false,
          columns: tableSelectColumns as any,
          request: getDeviceCollection,
        },
        valueId: 'selectName',
        valueName: 'paramName',
        limit: 2,
        limitSelect: 10,
        virtual: true,
        dealTreeData: (data: DeviceTreeDataType) => {
          if (typeof data.component != 'undefined' && [0, 1].includes(data.component)) {
            data.selectable = true;
          } else {
            data.selectable = false;
            data.id = (data?.id ?? '') + Math.random().toFixed(8);
          }
          if (typeof data.isLeaf !== 'boolean' && !data?.children?.length) {
            data.isLeaf = true;
          }
        },
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

export const getModelMap = (params: TableSearchType) => {
  const modelMap: Record<string, DeviceModelType | undefined> = {};
  params?.collection?.forEach?.((item) => {
    modelMap[(item?.node?.paramCode ?? '') + '-' + (item?.node?.deviceId ?? '')] = parseToObj(
      item.node?.dataType,
    );
  });
  return modelMap;
};

export const dealParams = (params: TableSearchType) => {
  const cols: ProColumns<TableDataType, TABLETREESELECTVALUETYPE>[] = [];
  const deviceData: TableSearchType['keyValue'] = [];
  const deviceDataMap = new Map<string, DeviceMapDataType>();
  const modelMap = getModelMap(params);
  params?.collection?.forEach?.((item) => {
    const collection = deviceDataMap.get(item?.node?.deviceId || '');
    if (collection) {
      collection.collection.push({ id: item?.node?.paramCode || '', name: item?.paramName });
      deviceDataMap.set(item?.node?.deviceId || '', collection);
    } else {
      deviceDataMap.set(item?.node?.deviceId || '', {
        deviceName: item?.node?.deviceName || '',
        sn: item?.node?.deviceSN || '',
        collection: [{ id: item?.node?.paramCode || '', name: item?.paramName }],
      });
    }
  });
  deviceDataMap.forEach((value, key) => {
    const arr: ProColumns<TableDataType, TABLETREESELECTVALUETYPE>[] = [];
    value.collection.forEach((item) => {
      const dataIndex = item.id + '-' + key;
      deviceData.push({
        key: item.id,
        name: item.name,
        deviceId: key,
        deviceName: value.deviceName,
        sn: value.sn,
        type: modelMap[dataIndex]?.type,
      });
      arr.push({
        title: `${item.name}${
          modelMap[dataIndex]?.specs?.unit ? '(' + modelMap[dataIndex]?.specs?.unit + ')' : ''
        }`,
        dataIndex,
        width: 120,
        ellipsis: true,
      });
    });
    cols.push({
      title: `${value.deviceName}(${value.sn})`,
      hideInSearch: true,
      children: arr,
    });
  });
  params.keyValue = deviceData;
  params.timeBucket = params.extralData?.timeBucket;
  params.polymerizationType = params.extralData?.polymerizationType;
  params.breakConnect = params.extralData?.breakConnect;
  return cols;
};
