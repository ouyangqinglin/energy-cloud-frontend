import React, { useMemo, useCallback, useState } from 'react';
import { Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import YTProTable from '@/components/YTProTable';
import { useSiteColumn } from '@/hooks';
import {
  searchColumns,
  siteColumns,
  electricColumns,
  pvInverterColumns,
  energyColumns,
  chargeOrderColumns,
  chargeBaseColumns,
} from './config';
import { getList } from './service';
import type { TableDataType, TableSearchType } from './type';
import { reportTypeEnum } from '@/utils/dictionary';

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

  const [siteSearchColumn] = useSiteColumn();
  const [reportType, setReportType] = useState<reportTypeEnum>(reportTypeEnum.Site);

  const {
    data: tableData,
    loading,
    run,
  } = useRequest(getList, {
    manual: true,
    formatResult: ({ data }) => {
      return data;
    },
  });

  const onSubmit = useCallback((params: TableSearchType) => {
    setReportType(params.type || reportTypeEnum.Site);
    run(params);
  }, []);

  const columns = useMemo(() => {
    const siteSearch = isStationChild ? [] : [siteSearchColumn];
    return [...siteSearch, ...searchColumns, ...(columnsMap.get(reportType) || siteColumns)];
  }, [siteSearchColumn]);

  return (
    <>
      <YTProTable<TableDataType, TableSearchType>
        columns={columns}
        toolBarRender={() => [
          <Button key="export" type="primary">
            <ExportOutlined />
            导出
          </Button>,
        ]}
        pagination={false}
        loading={loading}
        dataSource={tableData}
        onSubmit={onSubmit}
        bordered
      />
    </>
  );
};

export default Report;
