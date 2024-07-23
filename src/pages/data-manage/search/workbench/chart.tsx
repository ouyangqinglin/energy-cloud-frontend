/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-18 08:51:28
 * @LastEditTime: 2024-07-23 16:55:16
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\workbench\chart.tsx
 */

import SchemaForm from '@/components/SchemaForm';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { Resizable } from 'react-resizable';

export type ChartType = {
  width: number;
  height: number;
};

const Chart: React.FC<ChartType> = (props) => {
  const { width, height: initHeight } = props;

  const formRef = useRef<ProFormInstance<TableSearchType>>();
  const [searchData, setSearchData] = useState<TableSearchType>({});
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [loadingExport, { setFalse, setTrue }] = useBoolean(false);
  const { loading, run } = useRequest(getList, {
    manual: true,
  });

  const [height, setHeight] = useState(initHeight);

  const onResize = useCallback((event, { size }) => {
    setHeight(size.height);
  }, []);

  const onValuesChange = useCallback((_, params) => {
    dealParams(params);
    setSearchData(params);
  }, []);

  const onSearch = useCallback(() => {
    setTimeout(() => {
      formRef?.current?.validateFields?.()?.then((params) => {
        if (
          searchData?.collection &&
          searchData?.collection?.length &&
          searchData?.startTime &&
          searchData?.endTime
        ) {
          run({
            ...searchData,
          }).then((data) => {
            setTableData(data?.reverse?.() || []);
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
      });
    }, 10);
  }, [searchData]);

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

  useEffect(() => {
    setHeight(initHeight);
  }, [initHeight]);

  return (
    <>
      <Resizable width={width} height={height} onResize={onResize} className={styles.resizable}>
        <div className={styles.content} style={{ width: width + 'px', height: height + 'px' }}>
          <SchemaForm
            formRef={formRef}
            className={styles.form}
            columns={searchColumns}
            layoutType="QueryFilter"
            onValuesChange={onValuesChange}
            submitter={{
              render: () => [
                <Button
                  key="search"
                  type="primary"
                  onClick={onSearch}
                  loading={loading || loadingExport}
                >
                  {formatMessage({ id: 'common.search', defaultMessage: '搜索' })}
                </Button>,
                <Button
                  key="export"
                  icon={<DownloadOutlined />}
                  onClick={exportData}
                  loading={loading || loadingExport}
                />,
              ],
            }}
          />
          <TableChart tableType={1} searchData={searchData} data={tableData} height={'100%'} />
        </div>
      </Resizable>
    </>
  );
};

export default Chart;
