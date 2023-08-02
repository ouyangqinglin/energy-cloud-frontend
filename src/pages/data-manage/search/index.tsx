import React, { useMemo, useCallback, useState } from 'react';
import { useModel, useRequest } from 'umi';
import YTProTable from '@/components/YTProTable';
import { ProConfigProvider } from '@ant-design/pro-components';
import { searchColumns, timeColumns } from './config';
import { TableDataType, TableSearchType } from './type';
import { useSiteColumn } from '@/hooks';
import { tableTreeSelectValueTypeMap } from '@/components/TableSelect';
import type { TABLETREESELECTVALUETYPE } from '@/components/TableSelect';
import { getList, exportList } from './service';
import type { ProColumns } from '@ant-design/pro-components';
import moment from 'moment';

type DeviceMapDataType = {
  deviceName: string;
  collection: {
    name: string;
    id: string;
  }[];
};

type SearchProps = {
  isStationChild?: boolean;
};

const dealParams = (params: TableSearchType) => {
  const deviceDataMap = new Map<string, DeviceMapDataType>();
  params?.collection?.map?.((item) => {
    const collection = deviceDataMap.get(item?.node?.deviceId || '');
    if (collection) {
      collection.collection.push({ id: item?.node?.paramCode || '', name: item?.paramName });
      deviceDataMap.set(item?.node?.deviceId || '', collection);
    } else {
      deviceDataMap.set(item?.node?.deviceId || '', {
        deviceName: item?.node?.deviceName || '',
        collection: [{ id: item?.node?.paramCode || '', name: item?.paramName }],
      });
    }
  });
  const deviceData: TableSearchType['keyValue'] = [];
  const cols: ProColumns<TableDataType, TABLETREESELECTVALUETYPE>[] = [];
  deviceDataMap.forEach((value, key) => {
    const arr: ProColumns<TableDataType, TABLETREESELECTVALUETYPE>[] = [];
    value.collection.forEach((item) => {
      deviceData.push({
        key: item.id,
        name: item.name,
        deviceId: key,
        deviceName: value.deviceName,
      });
      arr.push({
        title: item.name,
        dataIndex: item.id + '-' + key,
        width: 120,
        ellipsis: true,
      });
    });
    cols.push({
      title: value.deviceName,
      hideInSearch: true,
      children: arr,
    });
  });
  params.keyValue = deviceData;
  return cols;
};

const Search: React.FC<SearchProps> = (props) => {
  const { isStationChild } = props;

  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
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
    const siteSearch = isStationChild ? [] : [siteSearchColumn];
    return [...siteSearch, ...searchColumns, ...timeColumns, ...collectionColumns];
  }, [siteSearchColumn, collectionColumns]);

  const onRequest = useCallback(
    (params: TableSearchType) => {
      if (params.siteId && params?.collection && params?.collection?.length) {
        const cols = dealParams(params);
        setCollectionColumns(cols);
        const result = getList({
          ...params,
          ...(isStationChild ? { siteId } : {}),
        }).then(({ data }) => {
          data?.list?.forEach?.((item) => {
            item.date = item.time;
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
    [isStationChild, siteId],
  );

  const requestExport = useCallback(
    (params: TableSearchType) => {
      dealParams(params);
      const date = params?.date || [];
      return exportList({
        ...params,
        startTime: moment(date[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(date[1]).format('YYYY-MM-DD HH:mm:ss'),
        ...(isStationChild ? { siteId } : {}),
      });
    },
    [isStationChild, siteId],
  );

  const getExportName = useCallback((params: TableSearchType) => {
    const date = params?.date || [];
    return (
      '采样明细-' +
      moment(date[0]).format('YYYY-MM-DD') +
      '~' +
      moment(date[1]).format('YYYY-MM-DD')
    );
  }, []);

  return (
    <>
      <ProConfigProvider valueTypeMap={tableTreeSelectValueTypeMap}>
        <YTProTable<TableDataType, TableSearchType, TABLETREESELECTVALUETYPE>
          headerTitle="采样明细"
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
