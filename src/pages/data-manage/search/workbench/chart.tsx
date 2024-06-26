/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-18 08:51:28
 * @LastEditTime: 2024-06-25 17:51:03
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\workbench\chart.tsx
 */

import SchemaForm from '@/components/SchemaForm';
import React, { useCallback, useRef, useState } from 'react';
import { searchColumns } from './helper';
import TableChart from '../chart';
import { TableDataType, TableSearchType } from '../type';
import { getList } from '../service';
import { dealParams } from '../config';
import { useRequest } from 'umi';
import { Spin } from 'antd';
import styles from './index.less';

export type ChartType = {};

const Chart: React.FC<ChartType> = (props) => {
  const {} = props;

  const [searchData, setSearchData] = useState<TableSearchType>({});
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const { loading, run } = useRequest(getList, {
    manual: true,
  });

  const onValuesChange = useCallback((_, params) => {
    dealParams(params);
    setSearchData(params);
    if (params?.collection && params?.collection?.length && params?.startTime && params?.endTime) {
      run({
        ...params,
        current: 1,
        pageSize: 2147483647,
      }).then((data) => {
        setTableData(data?.list?.reverse?.() || []);
        return {
          code: '200',
          data: {
            list: [],
            total: 0,
          },
          msg: '',
        };
      });
    }
  }, []);

  return (
    <>
      <SchemaForm
        className={styles.form}
        columns={searchColumns}
        layout="inline"
        layoutType="QueryFilter"
        onValuesChange={onValuesChange}
        submitter={{
          render: () => [loading && <Spin />],
        }}
      />
      <TableChart tableType={1} searchData={searchData} data={tableData} height={'100%'} />
    </>
  );
};

export default Chart;
