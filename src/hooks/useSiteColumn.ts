/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-29 10:36:01
 * @LastEditTime: 2023-07-07 10:22:53
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\hooks\useSiteColumn.ts
 */
import { useState, useMemo, useEffect, useCallback } from 'react';
import { getStations } from '@/services/station';
import type { OptionType } from '@/utils/dictionary';
import { debounce } from 'lodash';
import type { ProColumns } from '@ant-design/pro-table';

const useSiteColumn = <TableData = Record<string, any>, ValueType = 'text'>(
  props?: ProColumns<TableData, ValueType>,
): [siteColumn: ProColumns<TableData, ValueType>] => {
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

  const siteColumn: ProColumns<TableData, ValueType> = useMemo(() => {
    return {
      title: '站点名称',
      dataIndex: 'siteName',
      valueType: 'select',
      width: 150,
      ellipsis: true,
      ...(props || {}),
      formItemProps: {
        name: 'siteId',
        ...(props?.formItemProps || {}),
      },
      fieldProps: {
        showSearch: true,
        filterOption: false,
        onSearch: requestStation,
        options: stationOptions,
        placeholder: '请选择',
        ...(props?.fieldProps || {}),
      },
    };
  }, [stationOptions, props]);

  return [siteColumn];
};

export default useSiteColumn;
