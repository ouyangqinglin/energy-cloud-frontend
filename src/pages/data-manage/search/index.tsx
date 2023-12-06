import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { useModel, useRequest } from 'umi';
import YTProTable from '@/components/YTProTable';
import { ProConfigProvider } from '@ant-design/pro-components';
import { searchColumns, timeColumns, getDeviceSearchColumns } from './config';
import { TableDataType, TableSearchType } from './type';
import { useSiteColumn } from '@/hooks';
import { tableTreeSelectValueTypeMap, tableSelectValueTypeMap } from '@/components/TableSelect';
import type { TABLETREESELECTVALUETYPE } from '@/components/TableSelect';
import { getList, exportList } from './service';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import moment from 'moment';
import { DeviceDataType } from '@/services/equipment';
import { formatMessage } from '@/utils';

type DeviceMapDataType = {
  sn: string;
  deviceName: string;
  collection: {
    name: string;
    id: string;
  }[];
};

type SearchProps = {
  isDeviceChild?: boolean;
  deviceData?: DeviceDataType;
};

const dealParams = (
  params: TableSearchType,
  isDeviceChild?: boolean,
  paramsDeviceData?: DeviceDataType,
) => {
  const cols: ProColumns<TableDataType, TABLETREESELECTVALUETYPE>[] = [];
  const deviceData: TableSearchType['keyValue'] = [];
  if (isDeviceChild) {
    const deviceChildren: ProColumns<TableDataType, TABLETREESELECTVALUETYPE>[] = [];
    params?.collection?.forEach((item) => {
      deviceData.push({
        key: item.id,
        name: item.name,
        deviceId: paramsDeviceData?.deviceId,
        deviceName: paramsDeviceData?.name,
      });
      deviceChildren.push({
        title: item.name,
        dataIndex: item.id + '-' + paramsDeviceData?.deviceId,
        width: 120,
        ellipsis: true,
      });
    });
    cols.push({
      title: `${paramsDeviceData?.name}(${paramsDeviceData?.sn})`,
      hideInSearch: true,
      children: deviceChildren,
    });
    params.keyValue = deviceData;
    return cols;
  } else {
    const deviceDataMap = new Map<string, DeviceMapDataType>();
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
        deviceData.push({
          key: item.id,
          name: item.name,
          deviceId: key,
          deviceName: value.deviceName,
          sn: value.sn,
        });
        arr.push({
          title: item.name,
          dataIndex: item.id + '-' + key,
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
    return cols;
  }
};

const Search: React.FC<SearchProps> = (props) => {
  const { isDeviceChild, deviceData } = props;

  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const actionRef = useRef<ActionType>();
  const [collectionColumns, setCollectionColumns] = useState<
    ProColumns<TableDataType, TABLETREESELECTVALUETYPE>[]
  >([]);
  const [siteSearchColumn] = useSiteColumn<TableDataType, TABLETREESELECTVALUETYPE>({
    hideInTable: true,
    formItemProps: {
      rules: [{ required: true }],
      name: 'siteId',
    },
  });

  const columns = useMemo(() => {
    const siteSearch = isDeviceChild ? [] : [siteSearchColumn];
    return [
      ...siteSearch,
      ...(isDeviceChild ? getDeviceSearchColumns(deviceData?.deviceId || '') : searchColumns),
      ...timeColumns,
      ...collectionColumns,
    ];
  }, [siteSearchColumn, collectionColumns, deviceData]);

  const onRequest = useCallback(
    (params: TableSearchType) => {
      if (params?.collection && params?.collection?.length) {
        const cols = dealParams(params, isDeviceChild, deviceData);
        setCollectionColumns(cols);
        const result = getList({
          ...params,
          ...(isDeviceChild ? { siteId } : {}),
        }).then(({ data }) => {
          data?.list?.forEach?.((item) => {
            item?.devices?.forEach?.((child) => {
              item[child?.key + '-' + child?.deviceId] = child?.value;
            });
          });
          return {
            code: '200',
            data,
            msg: '',
          };
        });
        return result;
      } else {
        return Promise.resolve({
          code: '200',
          data: {
            list: [],
            total: 0,
          },
          msg: '',
        });
      }
    },
    [isDeviceChild, deviceData, siteId],
  );

  const requestExport = useCallback(
    (params: TableSearchType) => {
      dealParams(params, isDeviceChild, deviceData);
      const date = params?.date || [];
      return exportList({
        ...params,
        startTime: moment(date[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(date[1]).format('YYYY-MM-DD HH:mm:ss'),
        ...(isDeviceChild ? { siteId } : {}),
      });
    },
    [isDeviceChild, siteId, deviceData],
  );

  const getExportName = useCallback((params: TableSearchType) => {
    const date = params?.date || [];
    return (
      formatMessage({ id: 'dataManage.samplingDetail', defaultMessage: '采样明细' }) +
      '-' +
      moment(date[0]).format('YYYY-MM-DD') +
      '~' +
      moment(date[1]).format('YYYY-MM-DD')
    );
  }, []);

  useEffect(() => {
    actionRef?.current?.reloadAndRest?.();
  }, [deviceData]);

  return (
    <>
      <ProConfigProvider
        valueTypeMap={{ ...tableTreeSelectValueTypeMap, ...tableSelectValueTypeMap }}
      >
        <YTProTable<TableDataType, TableSearchType, TABLETREESELECTVALUETYPE>
          actionRef={actionRef}
          headerTitle={formatMessage({
            id: 'dataManage.samplingDetail',
            defaultMessage: '采样明细',
          })}
          toolBarRenderOptions={{
            add: {
              show: false,
            },
            export: {
              show: true,
              requestExport: requestExport,
              getExportName: getExportName,
            },
          }}
          columns={columns}
          request={onRequest}
          search={{
            collapsed: false,
            collapseRender: false,
          }}
          form={{
            ignoreRules: false,
          }}
          bordered
        />
      </ProConfigProvider>
    </>
  );
};

export default Search;
