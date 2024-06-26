/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-10 16:33:30
 * @LastEditTime: 2024-06-25 17:26:27
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\workbench\helper.tsx
 */

import moment, { Moment } from 'moment';
import { CollectionDataType, CollectionSearchType, SearchType } from './typing';
import { ProColumns, ProFormColumnsType } from '@ant-design/pro-components';
import { YTCellFourOutlined, YTCellNineOutlined, YTCellSixOutlined } from '@/components/YTIcons';
import { TABLETREESELECT, TABLETREESELECTVALUETYPE } from '@/components/TableSelect';
import { getDeviceCollection, getMultipleDeviceTree } from '@/services/equipment';
import { DeviceTreeDataType } from '@/types/device';
import { formatMessage, isEmpty } from '@/utils';

export const column: ProFormColumnsType<SearchType>[] = [
  {
    dataIndex: 'date',
    valueType: 'dateRange',
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({
            id: 'common.pleaseSelect',
            defaultMessage: '请选择',
          }),
        },
      ],
    },
    initialValue: [moment(), moment()],
  },
];

export const layoutConfig = [
  {
    title: formatMessage({ id: 'siteManage.4grid', defaultMessage: '四宫格' }),
    value: 4,
    icon: <YTCellFourOutlined />,
  },
  {
    title: formatMessage({ id: 'siteManage.6grid', defaultMessage: '六宫格' }),
    value: 6,
    icon: <YTCellSixOutlined />,
  },
  {
    title: formatMessage({ id: 'siteManage.9grid', defaultMessage: '九宫格' }),
    value: 9,
    icon: <YTCellNineOutlined />,
  },
];

const tableSelectColumns: ProColumns[] = [
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

const dealTreeData = (data: DeviceTreeDataType[], siteName = '', parentId = '') => {
  data?.forEach?.((item, index) => {
    item.siteName = siteName || item.deviceName;
    if (!item.productId) {
      item.id = `${parentId}${index}`;
    }
    if (item.children && item.children.length) {
      dealTreeData(item.children, item.siteName, item.id);
    }
  });
};

const requestTree = () => {
  return getMultipleDeviceTree().then((res) => {
    dealTreeData(res?.data);
    return res;
  });
};

export const searchColumns: ProFormColumnsType<CollectionSearchType, TABLETREESELECTVALUETYPE>[] = [
  {
    title: formatMessage({
      id: 'siteManage.set.dataCollectionPoints',
      defaultMessage: '数据采集点',
    }),
    dataIndex: 'collection',
    valueType: TABLETREESELECT,
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({
            id: 'common.pleaseSelect',
            defaultMessage: '请选择',
          }),
        },
      ],
    },
    fieldProps: {
      title: formatMessage({
        id: 'common.pleaseSelect',
        defaultMessage: '请选择',
      }),
      treeProps: {
        fieldNames: {
          title: 'deviceName',
          key: 'id',
          children: 'children',
        },
        request: requestTree,
      },
      proTableProps: {
        pagination: false,
        columns: tableSelectColumns,
        request: getDeviceCollection,
      },
      valueId: 'selectName',
      valueName: 'paramName',
      limit: 2,
      limitSelect: 250,
      virtual: true,
      dealTreeData: (data: DeviceTreeDataType) => {
        if (typeof data.component != 'undefined' && [0, 1].includes(data.component)) {
          data.selectable = true;
        } else {
          data.id = (data?.id ?? '') + Math.random().toFixed(8);
        }
      },
    },
  },
  {
    title: formatMessage({ id: 'common.time', defaultMessage: '时间' }),
    dataIndex: 'time',
    valueType: 'dateRange',
    transform: (value) => {
      return {
        startTime: value[0] + ' 00:00:00',
        endTime: value[1] + ' 23:59:59',
      };
    },
    initialValue: [moment().startOf('day'), moment().endOf('day')],
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
        },
      ],
    },
    fieldProps: (form) => {
      return {
        onOpenChange: (open: boolean) => {
          if (open) {
            window.workbenchDates = [];
            window.workbenchSelectDates = form?.getFieldValue?.('time');
            form?.setFieldValue?.('time', []);
          } else {
            if (window.workbenchDates?.[0] && window.workbenchDates?.[1]) {
              form?.setFieldValue?.('time', window.workbenchDates);
            } else {
              form?.setFieldValue?.('time', window.workbenchSelectDates);
            }
          }
        },
        onCalendarChange: (val: Moment[]) => {
          window.workbenchDates = [...(val || [])];
        },
        disabledDate: (current: Moment) => {
          if (!window.workbenchDates) {
            return false;
          }
          const tooLate =
            window.workbenchDates?.[0] && current.diff(window.workbenchDates?.[0], 'days') > 7;
          const tooEarly =
            window.workbenchDates?.[1] && window.workbenchDates?.[1].diff(current, 'days') > 7;
          return !!tooEarly || !!tooLate;
        },
      };
    },
  },
];
