/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-18 08:51:28
 * @LastEditTime: 2024-08-20 08:59:45
 * @LastEditors: YangJianFei
 * @FilePath: /energy-cloud-frontend/src/pages/data-manage/search/workbench/chart.tsx
 */

import SchemaForm from '@/components/SchemaForm';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getSearchColumns } from './helper';
import TableChart from '../chart';
import type { TableDataType, TableSearchType } from '../type';
import { exportList, getList } from '../service';
import { dealParams } from '../config';
import { useRequest } from 'umi';
import { Button } from 'antd';
import styles from './index.less';
import { DownloadOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { formatMessage, saveFile } from '@/utils';
import moment from 'moment';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Resizable } from 'react-resizable';
import FullScreen from '@/components/FullScreen';
import FilterSave from '@/components/FilterSave';
import { DeviceDataType } from '@/services/equipment';

export type ChartType = {
  isDeviceChild?: boolean;
  deviceData?: DeviceDataType;
  width: number;
  height: number;
};

const Chart: React.FC<ChartType> = (props) => {
  const { width, height: initHeight, isDeviceChild, deviceData } = props;
  const contentRef = useRef(null);
  const formRef = useRef<ProFormInstance<TableSearchType>>();
  const [searchData, setSearchData] = useState<TableSearchType>({});
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [loadingExport, { setFalse, setTrue }] = useBoolean(false);
  const { loading, run } = useRequest(getList, {
    manual: true,
  });

  const columns = useMemo(() => {
    return getSearchColumns(isDeviceChild ? deviceData?.deviceId : '');
  }, [isDeviceChild, deviceData]);

  const [height, setHeight] = useState(initHeight);

  const onResize = useCallback((event, { size }) => {
    setHeight(size.height);
  }, []);

  const onValuesChange = useCallback((_, params) => {
    dealParams(params);
    setSearchData(params);
  }, []);

  const onFilterValuesChange = useCallback((params: any) => {
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

  const getExportName = useCallback(
    (params: TableSearchType) => {
      return (
        (isDeviceChild ? deviceData?.deviceName + '-' : '') +
        formatMessage({ id: 'dataManage.samplingDetail', defaultMessage: '采样明细' }) +
        '-' +
        moment(params.startTime).format('YYYY-MM-DD') +
        '~' +
        moment(params.endTime).format('YYYY-MM-DD')
      );
    },
    [isDeviceChild, deviceData],
  );

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
  }, [searchData, getExportName]);

  useEffect(() => {
    setHeight(initHeight);
  }, [initHeight]);

  useEffect(() => {
    if (isDeviceChild) {
      const initData = {
        collection: [],
        startTime: moment().startOf('day').format('YYYY-MM-DD 00:00:00'),
        endTime: moment().endOf('day').format('YYYY-MM-DD 23:59:59'),
        timeBucket: '1',
        polymerizationType: '0',
      };
      formRef?.current?.setFieldsValue?.(initData);
      dealParams(initData);
      setSearchData(initData);
      setTableData([]);
    }
  }, [deviceData?.deviceId]);

  return (
    <>
      <Resizable width={width} height={height} onResize={onResize} className={styles.resizable}>
        <div
          ref={contentRef}
          className={styles.content}
          style={{ width: width + 'px', height: height + 'px' }}
        >
          <SchemaForm
            formRef={formRef}
            className={styles.form}
            columns={columns}
            layoutType="QueryFilter"
            onValuesChange={onValuesChange}
            submitter={{
              render: () => [
                <FilterSave
                  filterForm={formRef}
                  key="filter"
                  onClick={onSearch}
                  loading={loading}
                  type="primary"
                  filterKey={`search`}
                  onFilterValuesChange={onFilterValuesChange}
                >
                  {formatMessage({ id: 'common.search', defaultMessage: '搜索' })}
                </FilterSave>,
                <Button
                  key="export"
                  style={{ padding: '6px' }}
                  icon={<DownloadOutlined />}
                  onClick={exportData}
                  loading={loadingExport}
                />,
                <FullScreen key="fullScreen" target={contentRef} />,
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
