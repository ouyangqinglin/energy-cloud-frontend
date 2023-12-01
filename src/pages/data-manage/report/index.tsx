import React, { useMemo, useCallback, useState } from 'react';
import { useRequest, useModel } from 'umi';
import YTProTable from '@/components/YTProTable';
import { useSiteColumn } from '@/hooks';
import {
  searchColumns,
  siteColumns,
  electricColumns,
  pvInverterColumns,
  energyColumns,
  chargeOrderColumns,
  chargeOrderStatColumns,
  chargeBaseColumns,
} from './config';
import { getList, exportList } from './service';
import type { TableDataType, TableSearchType } from './type';
import { reportTypeEnum, timeDimensionEnum } from '@/utils/dictionary';
import { reportType, timeDimension } from '@/utils/dict'

import { cloneDeep } from 'lodash';
import moment from 'moment';
import { formatMessage } from '@/utils';

type ReportProps = {
  isStationChild?: boolean;
};

const columnsMap = new Map([
  [reportTypeEnum.Site, siteColumns],
  [reportTypeEnum.Electric, electricColumns],
  [reportTypeEnum.PvInverter, pvInverterColumns],
  [reportTypeEnum.Energy, energyColumns],
  [reportTypeEnum.ChargeOrder, chargeOrderColumns],
  [reportTypeEnum.ChargeBase, chargeBaseColumns],
  [reportTypeEnum.Else, electricColumns],
]);

const Report: React.FC<ReportProps> = (props) => {
  const { isStationChild } = props;

  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const [searchParams, setSearchParams] = useState<TableSearchType>({
    reportType: reportTypeEnum.Site,
  });
  const [siteSearchColumn] = useSiteColumn({
    hideInTable: true,
    formItemProps: {
      name: 'siteId',
      rules: [{ required: true }],
    },
    fieldProps: (form) => {
      return {
        onChange: () => {
          form?.setFieldValue?.('deviceId', '');
        },
      };
    },
  });

  const {
    data: tableData,
    loading,
    run,
  } = useRequest(getList, {
    manual: true,
    formatResult: ({ data }) => {
      const result: TableDataType[] = [];
      data?.forEach((item, itemIndex) => {
        if ('chargeDetails' in item) {
          let details = [];
          try {
            details = JSON.parse(item?.chargeDetails || '');
            if (!Array.isArray(details)) {
              details = [];
            }
          } catch {
            details = [];
          }
          if (details.length) {
            details.forEach((detail, index) => {
              result.push({
                index: itemIndex + 1,
                ...item,
                ...(detail || {}),
                rowSpan: index ? 0 : details.length,
              });
            });
          } else {
            result.push({ index: itemIndex + 1, ...item });
          }
        } else {
          result.push({ index: itemIndex + 1, ...item });
        }
      });
      return result;
    },
  });

  const onSubmit = useCallback(
    (params: TableSearchType) => {
      setSearchParams(params);
      run({
        ...params,
        dimensionTime: params?.dimensionTime
          ? moment(params?.dimensionTime).format('YYYY-MM-DD')
          : '',
        ...(isStationChild ? { siteId } : {}),
      });
    },
    [isStationChild, siteId],
  );

  const requestExport = useCallback(
    (params) => {
      const dimensionTime = params?.dimensionTime
        ? moment(params?.dimensionTime).format('YYYY-MM-DD')
        : '';
      return exportList({
        ...params,
        dimensionTime,
        ...(isStationChild ? { siteId } : {}),
      });
    },
    [isStationChild, siteId],
  );

  const getExportName = useCallback((params) => {
    const dimensionTime = params?.dimensionTime
      ? moment(params?.dimensionTime).format('YYYY-MM-DD')
      : '';
    return `${reportType.get(params?.reportType || reportTypeEnum.Site) || formatMessage({ id: 'dataManage.siteReport', defaultMessage: '站点报表' })}${
      dimensionTime
        ? '_' +
          moment(params?.dimensionTime).format(
            timeDimension.get(params?.timeDimension || timeDimensionEnum.Day)?.format,
          )
        : ''
    }`;
  }, []);

  const columns = useMemo(() => {
    const siteSearch = isStationChild ? [] : [siteSearchColumn];
    let fieldColumns = cloneDeep(
      columnsMap.get(searchParams?.reportType || reportTypeEnum.Site) || siteColumns,
    );
    if (searchParams?.reportType === reportTypeEnum.PvInverter && searchParams?.deviceId) {
      fieldColumns.splice(2, 1);
    }
    if (
      searchParams?.reportType === reportTypeEnum.ChargeOrder &&
      searchParams?.timeDimension !== timeDimensionEnum.Day
    ) {
      fieldColumns = cloneDeep(chargeOrderStatColumns);
    }
    return [...siteSearch, ...searchColumns, ...fieldColumns];
  }, [siteSearchColumn, searchParams, isStationChild]);

  return (
    <>
      <YTProTable
        columns={columns}
        toolBarRenderOptions={{
          add: { show: false },
          export: {
            show: true,
            requestExport: requestExport,
            getExportName: getExportName,
          },
        }}
        pagination={false}
        loading={loading}
        dataSource={tableData}
        onSubmit={onSubmit}
        bordered
        search={{
          collapsed: false,
          collapseRender: false,
        }}
        form={{
          ignoreRules: false,
        }}
      />
    </>
  );
};

export default Report;
