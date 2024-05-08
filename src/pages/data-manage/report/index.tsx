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
import { reportType, timeDimension } from '@/utils/dict';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { formatMessage } from '@/utils';
import './index.less';

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
  const [currentSearchColumns, setCurrentSearchColumns] = useState(searchColumns(reportType));
  const [currentSiteColumns, setCurrentSiteColumns] = useState(siteColumns);

  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const [searchParams, setSearchParams] = useState<TableSearchType>({
    reportType: reportTypeEnum.Site,
  });
  const reportTypeHandle = (energyOptions: string) => {
    const cloneSiteColumns = cloneDeep(siteColumns);
    const currentReportType = cloneDeep(reportType);
    setCurrentSiteColumns(cloneSiteColumns);
    if (energyOptions.indexOf('1') < 0) {
      //不包含光伏
      currentReportType.delete(reportTypeEnum.PvInverter);
      const index = cloneSiteColumns.findIndex((item) => item.dataIndex === 'pv');
      index > -1 && cloneSiteColumns.splice(index, 1);
    }
    if (energyOptions.indexOf('2') < 0) {
      //不包含储能
      currentReportType.delete(reportTypeEnum.Energy);
      const index = cloneSiteColumns.findIndex((item) => item.dataIndex === 'storage');
      index > -1 && cloneSiteColumns.splice(index, 1);
    }
    if (energyOptions.indexOf('3') < 0) {
      //不包含充电桩
      currentReportType.delete(reportTypeEnum.ChargeOrder);
      currentReportType.delete(reportTypeEnum.ChargeBase);
      const index = cloneSiteColumns.findIndex((item) => item.dataIndex === 'chargingPile');
      index > -1 && cloneSiteColumns.splice(index, 1);
    }
    setCurrentSiteColumns(cloneSiteColumns);
    setCurrentSearchColumns(() => searchColumns(currentReportType));
  };
  const [siteSearchColumn] = useSiteColumn({
    hideInTable: true,
    formItemProps: {
      name: 'siteId',
      rules: [{ required: true }],
    },
    fieldProps: (form) => {
      return {
        onChange: (_value: any, params: any) => {
          form?.setFieldValue?.('deviceId', '');
          reportTypeHandle(params?.energyOptions || '');
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
      console.log('params>>', params);
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
    return `${
      reportType.get(params?.reportType || reportTypeEnum.Site) ||
      formatMessage({ id: 'dataManage.siteReport', defaultMessage: '站点报表' })
    }${
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
    let fieldColumns = currentSiteColumns;
    if (searchParams.reportType) {
      fieldColumns = cloneDeep(columnsMap.get(searchParams.reportType)) || [];
      if (searchParams?.reportType === reportTypeEnum.PvInverter && searchParams?.deviceId) {
        fieldColumns.splice(2, 1);
      }
      if (
        searchParams?.reportType === reportTypeEnum.ChargeOrder &&
        searchParams?.timeDimension !== timeDimensionEnum.Day
      ) {
        fieldColumns = cloneDeep(chargeOrderStatColumns);
      }
    }
    return [...siteSearch, ...currentSearchColumns, ...fieldColumns];
  }, [siteSearchColumn, searchParams, isStationChild, currentSearchColumns, currentSiteColumns]);

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
          className: 'data-report-search',
        }}
        form={{
          ignoreRules: false,
        }}
      />
    </>
  );
};

export default Report;
