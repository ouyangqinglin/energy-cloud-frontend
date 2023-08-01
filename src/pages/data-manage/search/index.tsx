import React, { useMemo, useCallback, useState } from 'react';
import { useModel, useRequest } from 'umi';
import YTProTable from '@/components/YTProTable';
import { ProConfigProvider } from '@ant-design/pro-components';
import { searchColumns, timeColumns } from './config';
import { TableSearchType } from './type';
import { useSiteColumn } from '@/hooks';
import { tableTreeSelectValueTypeMap } from '@/components/TableSelect';
import type { TABLETREESELECTVALUETYPE } from '@/components/TableSelect';
import { getList } from './service';
import type { ProColumns } from '@ant-design/pro-components';
import { CollectionSearchType, getCollectionData } from '@/services/data';

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

const Search: React.FC<SearchProps> = (props) => {
  const { isStationChild } = props;

  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const [collectionColumns, setCollectionColumns] = useState<
    ProColumns<TableSearchType, TABLETREESELECTVALUETYPE>[]
  >([]);
  const { run } = useRequest(getCollectionData, {
    manual: true,
  });
  const [siteSearchColumn] = useSiteColumn<TableSearchType, TABLETREESELECTVALUETYPE>({
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

  const onSubmit = useCallback((params: TableSearchType) => {
    if (isStationChild) {
      params.siteId = siteId;
    }
    setCollectionColumns(
      params?.collection?.map?.((item) => {
        return {
          title: item.paramName,
          dataIndex: item.selectName,
          width: 120,
          hideInSearch: true,
        } as ProColumns<TableSearchType, TABLETREESELECTVALUETYPE>;
      }) || [],
    );
  }, []);

  const onRequest = useCallback(
    (params: TableSearchType & CollectionSearchType) => {
      if (isStationChild) {
        params.siteId = siteId;
      }
      if (params.siteId && params?.collection && params?.collection?.length) {
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
        const deviceData: CollectionSearchType['devices'] = [];
        const cols: ProColumns<TableSearchType, TABLETREESELECTVALUETYPE>[] = [];
        deviceDataMap.forEach((value, key) => {
          deviceData.push({ deviceId: key, keys: value.collection.map((item) => item.id) });
          const arr: ProColumns<TableSearchType, TABLETREESELECTVALUETYPE>[] = [];
          value.collection.map((item) => {
            arr.push({
              title: item.name,
              dataIndex: item.id,
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
        setCollectionColumns(cols);
        params.devices = deviceData;
        const result = getCollectionData(params).then(({ data }) => {});
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

  return (
    <>
      <ProConfigProvider valueTypeMap={tableTreeSelectValueTypeMap}>
        <YTProTable<TableSearchType, TableSearchType, TABLETREESELECTVALUETYPE>
          headerTitle="采样明细"
          toolBarRenderOptions={{
            add: {
              show: false,
            },
            export: {
              show: true,
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
