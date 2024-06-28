/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-18 08:51:28
 * @LastEditTime: 2024-06-27 15:40:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\workbench\chart.tsx
 */

import SchemaForm from '@/components/SchemaForm';
import React, { useCallback, useRef, useState } from 'react';
import { searchColumns } from './helper';
import TableChart from '../chart';
import { TableDataType, TableSearchType } from '../type';
import { exportList, getList } from '../service';
import { dealParams } from '../config';
import { useRequest } from 'umi';
import { Button } from 'antd';
import styles from './index.less';
import { DownloadOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { formatMessage, saveFile } from '@/utils';
import moment from 'moment';
import { ProFormInstance } from '@ant-design/pro-components';

export type ChartType = {};

const Chart: React.FC<ChartType> = (props) => {
  const {} = props;

  const formRef = useRef<ProFormInstance<TableSearchType>>();
  const [searchData, setSearchData] = useState<TableSearchType>({});
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [loadingExport, { setFalse, setTrue }] = useBoolean(false);
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

  const getExportName = useCallback((params: TableSearchType) => {
    const date = params?.time || [];
    return (
      formatMessage({ id: 'dataManage.samplingDetail', defaultMessage: '采样明细' }) +
      '-' +
      moment(date[0]).format('YYYY-MM-DD') +
      '~' +
      moment(date[1]).format('YYYY-MM-DD')
    );
  }, []);

  const exportData = useCallback(() => {
    formRef?.current?.validateFields?.()?.then(() => {
      setTrue();
      exportList(searchData)
        .then((res) => {
          saveFile(res, getExportName?.(searchData) || '导出文件');
        })
        .finally(() => {
          setFalse();
        });
    });
  }, [searchData]);

  return (
    <>
      <SchemaForm
        formRef={formRef}
        className={styles.form}
        columns={searchColumns}
        layout="inline"
        layoutType="QueryFilter"
        onValuesChange={onValuesChange}
        submitter={{
          render: () => [
            <Button
              icon={<DownloadOutlined />}
              onClick={exportData}
              loading={loading || loadingExport}
            />,
          ],
        }}
      />
      <TableChart tableType={1} searchData={searchData} data={tableData} height={'100%'} />
    </>
  );
};

export default Chart;
