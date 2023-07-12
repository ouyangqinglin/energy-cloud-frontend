import React, { useMemo, useCallback, useState } from 'react';
import { useModel } from 'umi';
import YTProTable from '@/components/YTProTable';
import { ProConfigProvider } from '@ant-design/pro-components';
import { searchColumns, timeColumns } from './config';
import { TableSearchType } from './type';
import { useSiteColumn } from '@/hooks';
import { tableTreeSelectValueTypeMap } from '@/components/TableSelect';
import type { TABLETREESELECTVALUETYPE } from '@/components/TableSelect';
import { getList } from './service';
import type { ProColumns } from '@ant-design/pro-table';

type SearchProps = {
  isStationChild?: boolean;
};

const Search: React.FC<SearchProps> = (props) => {
  const { isStationChild } = props;

  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const [collectionColumns, setCollectionColumns] = useState<
    ProColumns<TableSearchType, TABLETREESELECTVALUETYPE>[]
  >([]);
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
          onSubmit={onSubmit}
          request={getList}
          search={{
            collapsed: false,
            collapseRender: false,
          }}
          form={{
            ignoreRules: false,
          }}
        />
      </ProConfigProvider>
    </>
  );
};

export default Search;
