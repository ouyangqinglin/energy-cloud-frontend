import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { useModel, useRequest } from 'umi';
import YTProTable from '@/components/YTProTable';
import { timeColumns, getDeviceSearchColumns } from './config';
import { TableDataType, TableSearchType } from './type';
import { useSiteColumn } from '@/hooks';
import { tableTreeSelectValueTypeMap, tableSelectValueTypeMap } from '@/components/TableSelect';
import type { TABLETREESELECTVALUETYPE } from '@/components/TableSelect';
import { getList, exportList } from './service';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import moment, { Moment } from 'moment';
import { DeviceDataType } from '@/services/equipment';
import { formatMessage } from '@/utils';

import { ProConfigProvider } from '@ant-design/pro-components';
import { YTDateRangeValueTypeMap } from '@/components/YTDateRange';
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
      ...getDeviceSearchColumns(isDeviceChild ? deviceData?.deviceId : ''),
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
      const date = params?.time || [];
      return exportList({
        ...params,
        startTime: (date[0] as any)?.format?.('YYYY-MM-DD 00:00:00'),
        endTime: (date[1] as any)?.format?.('YYYY-MM-DD 23:59:59'),
        ...(isDeviceChild ? { siteId } : {}),
      });
    },
    [isDeviceChild, siteId, deviceData],
  );

  const getExportName = useCallback((params: TableSearchType) => {
    const date = params?.time || [];
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
        valueTypeMap={{
          ...tableTreeSelectValueTypeMap,
          ...tableSelectValueTypeMap,
          ...YTDateRangeValueTypeMap,
        }}
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
          scroll={
            isDeviceChild
              ? {
                  y: 530,
                }
              : {}
          }
        />
      </ProConfigProvider>
    </>
  );
};

export default Search;
