import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { useModel } from 'umi';
import YTProTable from '@/components/YTProTable';
import { timeColumns, getDeviceSearchColumns, dealParams, getModelMap } from './config';
import type { TableDataType, TableSearchType } from './type';
import { tableTreeSelectValueTypeMap, tableSelectValueTypeMap } from '@/components/TableSelect';
import type { TABLETREESELECTVALUETYPE } from '@/components/TableSelect';
import { getList, exportList } from './service';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import moment from 'moment';
import type { DeviceDataType } from '@/services/equipment';
import { formatMessage, formatModelValue } from '@/utils';
import { ProConfigProvider } from '@ant-design/pro-components';
import type { RadioChangeEvent } from 'antd';
import Chart from './chart';
import type { ChartRefType } from './chart';

type RequestRefType = {
  chartPromise?: Promise<any>;
  chartResolve?: (value: any) => void;
  tablePromise?: Promise<any>;
  tableResolve?: (value: any) => void;
};

type SearchProps = {
  isDeviceChild?: boolean;
  deviceData?: DeviceDataType;
};

const Search: React.FC<SearchProps> = (props) => {
  const { isDeviceChild, deviceData } = props;

  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const actionRef = useRef<ActionType>();
  const [tableType, setTableType] = useState(1);
  const requestRef = useRef<RequestRefType>({});
  const [searchData, setSearchData] = useState<any>(null);
  const [tableData, setTableData] = useState<{
    data: TableDataType[];
    total: number;
  }>({ data: [], total: 0 });
  const [allTableData, setAllTableData] = useState<TableDataType[]>([]);
  const chartRef = useRef<ChartRefType>();
  const [collectionColumns, setCollectionColumns] = useState<
    ProColumns<TableDataType, TABLETREESELECTVALUETYPE>[]
  >([]);

  const columns = useMemo(() => {
    return [
      ...getDeviceSearchColumns(isDeviceChild ? deviceData?.deviceId : ''),
      ...timeColumns,
      ...collectionColumns,
    ];
  }, [collectionColumns, deviceData]);

  const onRequest = useCallback(
    async (params: TableSearchType) => {
      if (params?.collection && params?.collection?.length) {
        const cols = dealParams(params);
        const modelMap = getModelMap(params);
        setCollectionColumns(cols);
        const searchDataResult = {
          ...params,
          ...(isDeviceChild ? { siteId } : {}),
        };
        requestRef.current.tablePromise = new Promise((resolve) => {
          requestRef.current.tableResolve = resolve;
        });
        const tableResult = requestRef.current.tablePromise.then(() => {
          return getList(searchDataResult).then((res) => {
            const data = res?.data || {};
            data?.list?.forEach?.((item) => {
              item?.devices?.forEach?.((child) => {
                const dataIndex = child?.key + '-' + child?.deviceId;
                item[dataIndex] = formatModelValue(child?.value, modelMap[dataIndex] || {}, false, {
                  showEnumValue: true,
                });
              });
            });
            setTableData({
              data: data?.list || [],
              total: data?.total,
            });
            return {
              code: '200',
              data: {
                list: [],
                total: 0,
              },
              msg: '',
            };
          });
        });
        requestRef.current.chartPromise = new Promise((resolve) => {
          requestRef.current.chartResolve = resolve;
        });
        const chartResult = requestRef.current.chartPromise.then(() => {
          setSearchData(searchDataResult);
          return getList({
            ...searchDataResult,
          }).then((res) => {
            setAllTableData(res?.data?.reverse?.() || []);
            return {
              code: '200',
              data: {
                list: [],
                total: 0,
              },
              msg: '',
            };
          });
        });
        if (tableType) {
          requestRef.current?.chartResolve?.('');
          return chartResult;
        } else {
          requestRef.current?.tableResolve?.('');
          return tableResult;
        }
      } else {
        setCollectionColumns([]);
        setSearchData(null);
        setAllTableData([]);
        setTableData({
          data: [],
          total: 0,
        });
        return Promise.resolve({
          code: '200',
          data: {
            list: [],
            total: 0,
          },
          msg: '',
        });
      }
    },
    [isDeviceChild, deviceData, siteId, tableType],
  );

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

  const requestExport = useCallback(
    (params: TableSearchType) => {
      dealParams(params);
      const date = params?.time || [];
      return exportList({
        ...params,
        startTime: (date[0] as any)?.format?.('YYYY-MM-DD 00:00:00'),
        endTime: (date[1] as any)?.format?.('YYYY-MM-DD 23:59:59'),
        ...(isDeviceChild ? { siteId } : {}),
      });
    },
    [isDeviceChild, siteId, deviceData],
  );

  const onTypeChange = (e: RadioChangeEvent) => {
    setTableType(e.target.value);
    if (e.target.value) {
      requestRef.current?.chartResolve?.('');
    } else {
      requestRef.current?.tableResolve?.('');
    }
  };

  const chart = useMemo(() => {
    return (
      <Chart ref={chartRef} searchData={searchData} tableType={tableType} data={allTableData} />
    );
  }, [searchData, tableType, allTableData]);

  useEffect(() => {
    if (isDeviceChild) {
      actionRef.current?.reset?.();
    }
  }, [deviceData?.deviceId]);

  return (
    <>
      <ProConfigProvider
        valueTypeMap={{
          ...tableTreeSelectValueTypeMap,
          ...tableSelectValueTypeMap,
        }}
      >
        <YTProTable<TableDataType, TableSearchType, TABLETREESELECTVALUETYPE>
          actionRef={actionRef}
          // headerTitle={
          //   <>
          //     <Radio.Group
          //       optionType="button"
          //       value={tableType}
          //       onChange={onTypeChange}
          //       buttonStyle="solid"
          //     >
          //       <Radio.Button value={0}>
          //         <UnorderedListOutlined />
          //       </Radio.Button>
          //       <Radio.Button value={1}>
          //         <LineChartOutlined />
          //       </Radio.Button>
          //     </Radio.Group>
          //   </>
          // }
          toolBarRenderOptions={{
            add: {
              show: false,
            },
            export: {
              show: true,
              requestExport: requestExport,
              getExportName: getExportName,
            },
          }}
          options={{
            density: false,
            fullScreen: false,
            reload: false,
            setting: !tableType,
          }}
          columns={columns}
          search={{
            collapsed: false,
            collapseRender: false,
          }}
          request={onRequest}
          form={{
            ignoreRules: false,
          }}
          bordered
          scroll={
            isDeviceChild
              ? {
                  y: 530,
                }
              : {}
          }
          tableRender={(_, dom, { toolbar }) => {
            return tableType ? (
              <>
                <div className="px24 pb16">
                  {toolbar}
                  {chart}
                </div>
              </>
            ) : (
              dom
            );
          }}
          dataSource={tableData.data}
          pagination={{
            total: tableData.total,
          }}
        />
      </ProConfigProvider>
    </>
  );
};

export default Search;
