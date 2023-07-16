/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-29 10:36:01
 * @LastEditTime: 2023-07-10 14:27:53
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\hooks\useSiteColumn.ts
 */
import { useState, useMemo, useEffect, useCallback } from 'react';
import { getStations } from '@/services/station';
import type { OptionType } from '@/utils/dictionary';
import { debounce, merge } from 'lodash';
import type { ProColumns } from '@ant-design/pro-table';

const useSiteColumn = <TableData = Record<string, any>, ValueType = 'text'>(
  props: ProColumns<TableData, ValueType> = {},
): [siteColumn: ProColumns<TableData, ValueType>, siteOptions: OptionType[] | undefined] => {
  const [stationOptions, setStationOptions] = useState<OptionType[]>();

  const requestStation = useCallback(
    debounce((searchText) => {
      getStations({ ...(props?.params ?? {}), name: searchText }).then(({ data }) => {
        setStationOptions(
          data?.map?.((item: any) => {
            return {
              label: item.name,
              value: item.id,
            };
          }) || [],
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
      formItemProps: (form, config) => {
        const defaultConfig = {
          name: 'siteId',
        };
        if (typeof props?.formItemProps === 'function') {
          const result = props.formItemProps(form, config);
          return { ...defaultConfig, ...(result || {}) };
        } else {
          return {
            ...defaultConfig,
            ...(props?.formItemProps || {}),
          };
        }
      },
      fieldProps: (form, config) => {
        const defaultConfig = {
          showSearch: true,
          filterOption: false,
          onSearch: requestStation,
          options: stationOptions,
          placeholder: '请选择',
        };
        if (typeof props?.fieldProps === 'function') {
          const result = props.fieldProps(form, config);
          return { ...defaultConfig, ...(result || {}) };
        } else {
          return {
            ...defaultConfig,
            ...(props?.fieldProps || {}),
          };
        }
      },
    };
  }, [requestStation, stationOptions, props]);

  return [siteColumn, stationOptions];
};

export default useSiteColumn;
