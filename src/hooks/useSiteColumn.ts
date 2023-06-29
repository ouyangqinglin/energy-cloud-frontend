/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-29 10:36:01
 * @LastEditTime: 2023-06-29 10:36:05
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\hooks\useSiteColumn.ts
 */
import { useState, useMemo, useEffect, useCallback } from 'react';
import { getStations } from '@/services/station';
import type { OptionType } from '@/utils/dictionary';
import { debounce } from 'lodash';
import type { ProColumns } from '@ant-design/pro-table';

export type UseSiteColumn = {
  (props?: ProColumns): [siteColumn: ProColumns];
};

const useSiteColumn: UseSiteColumn = (props = {}) => {
  const [stationOptions, setStationOptions] = useState<OptionType[]>();

  const requestStation = useCallback(
    debounce((searchText) => {
      getStations({ name: searchText }).then(({ data }) => {
        setStationOptions(
          data?.map?.((item: any) => {
            return {
              label: item.name,
              value: item.id,
            };
          }),
        );
      });
    }, 700),
    [],
  );

  useEffect(() => {
    requestStation('');
  }, []);

  const siteColumn: ProColumns = useMemo(() => {
    return {
      title: '站点名称',
      dataIndex: 'siteName',
      valueType: 'select',
      render: (_, record) => record.siteName,
      formItemProps: {
        name: 'siteId',
      },
      fieldProps: {
        showSearch: true,
        filterOption: false,
        onSearch: requestStation,
        options: stationOptions,
      },
      width: 150,
      ellipsis: true,
      ...props,
    };
  }, [stationOptions, props]);

  return [siteColumn];
};

export default useSiteColumn;
