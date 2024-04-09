/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-10 16:33:30
 * @LastEditTime: 2024-02-20 13:52:59
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\workbench\helper.tsx
 */

import moment from 'moment';
import { CollectionDataType, CollectionSearchType, SearchType } from './typing';
import { ProColumns, ProFormColumnsType } from '@ant-design/pro-components';
import { YTCellFourOutlined, YTCellNineOutlined, YTCellSixOutlined } from '@/components/YTIcons';
import { TABLETREESELECT, TABLETREESELECTVALUETYPE } from '@/components/TableSelect';
import { getDeviceCollection, getMultipleDeviceTree } from '@/services/equipment';
import { DeviceTreeDataType } from '@/types/device';
import { formatMessage } from '@/utils';

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
      valueId: 'paramCode',
      valueName: 'paramName',
      multiple: false,
      virtual: true,
      valueFormat: (_: any, item: CollectionDataType) => {
        return `${item?.tree?.siteName}-${item?.tree?.deviceName}-${item.paramName}`;
      },
    },
    colProps: {
      span: 20,
    },
  },
];
