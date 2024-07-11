import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import type { ParamsType } from '@ant-design/pro-provider';
import type { YTProColumns, YTProTableProps } from './typing';

import genDefaultOperation from './operation';
import {
  formatData,
  calculateColumns,
  normalizeRequestOption,
  standardRequestTableData,
} from './helper';
import styles from './index.less';
import useToolBarRender from './useToolBarRender';
import useTableSize from './useTableSize';
import { useBoolean } from 'ahooks';
import { formatMessage } from '@/utils';
import { useAntdColumnResize } from '@yangjianfei/react-antd-column-resize';
import { merge } from 'lodash';
import dragComponents, { dragcolumns, getDragSort, getQueryData } from './dragSort';

const YTProTable = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(
  props: YTProTableProps<DataType, Params, ValueType>,
) => {
  const {
    toolBarRender,
    columns,
    dragSort,
    actionRef,
    components: realityComponents = {},
    formRef,
    toolBarRenderOptions,
    request,
    rowKey = 'id',
    tableRef,
    className,
    resizable = false,
    resizableOptions,
    onEvent,
    extraHeight,
    beforeSearchSubmit,
    onSubmit,
    pagination,
    ...restProps
  } = props;
  const tableFormRef = useRef<ProFormInstance<Params>>();
  const myTableRef = useRef<HTMLDivElement>();
  const [dragConfig, setDragConfig] = useState({});
  const [collapsed, { set: setCollapse }] = useBoolean(false);
  const [dataSource, setDataSource] = useState([]);
  const [baseSort, setBaseSort] = useState<number>(0);

  const [adaptionColumns, setAdaptionColumns] = useState<YTProColumns<DataType, ValueType>[]>(
    columns || [],
  );

  const mergedFormRef = useMemo(() => {
    return formRef || tableFormRef;
  }, [formRef, tableFormRef]);

  const mergedTableRef = useMemo<any>(() => {
    return tableRef || myTableRef;
  }, [tableRef, myTableRef]);

  const mergedOnCollapse = useCallback(
    (value: boolean) => {
      if (restProps?.search) {
        restProps?.search?.onCollapse?.(value);
      }
      setCollapse(value);
    },
    [restProps],
  );

  const toolBarRenderResult = useToolBarRender<DataType, Params, ValueType>(
    toolBarRender,
    toolBarRenderOptions,
    mergedFormRef,
    columns,
  );

  const getDragList = (params: any) => {
    if (dragSort?.visable) {
      setDataSource(params.list);
      const currentBaseSort = (params.pageNum - 1) * params.pageSize;
      setBaseSort(currentBaseSort);
      const query = {
        request: dragSort.request,
        dataSource: params.list,
        rowKey,
        baseSort: currentBaseSort,
        getSortData: (sortData: any) => setDataSource(sortData),
      };
      setDragConfig(dragComponents(query));
    }
  };

  useEffect(() => {
    if (dragSort?.rowIndex) {
      const sortData = getDragSort(dataSource, dragSort?.rowIndex, 0);
      setDataSource(sortData as any);
      const queryData = getQueryData(sortData, rowKey as any, baseSort);
      dragSort?.request?.(queryData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragSort?.rowIndex]);
  // 对request请求方法进行封装，解构表格数据格式
  const standardRequest = standardRequestTableData<DataType, Params>(
    request,
    props.expandable,
    getDragList,
  );

  const mergedBeforeSearchSubmit = useCallback(
    (data) => {
      const result = formatData(data, columns);
      beforeSearchSubmit?.(data);
      return result;
    },
    [columns, beforeSearchSubmit],
  );

  const mergedOnSubmit = useCallback(
    (data) => {
      formatData(data, columns);
      onSubmit?.(data);
    },
    [columns, onSubmit],
  );

  const { scrollX } = useTableSize(mergedTableRef, restProps.scroll, collapsed, extraHeight);

  const { resizableColumns, components, tableWidth } = useAntdColumnResize(() => {
    return { minWidth: 100, ...resizableOptions, columns: resizable ? adaptionColumns : [] };
  }, [resizable, resizableOptions, adaptionColumns]);

  useEffect(() => {
    // TODO: 支持选项式的请求
    const result = normalizeRequestOption<DataType, ValueType>(columns, onEvent);

    // 合并默认的操作(删除，编辑，进入)
    const defaultOperation = genDefaultOperation<DataType, Params, ValueType>(props);
    if (defaultOperation) {
      result?.push(defaultOperation);
    }
    if (dragSort?.visable) {
      result?.unshift(...dragcolumns);
    }
    if (resizable) {
      calculateColumns(result, mergedTableRef);
    }
    setAdaptionColumns(result);
  }, [columns, resizable, onEvent, props.option, props, dragSort?.visable, mergedTableRef]);

  return (
    <div ref={mergedTableRef}>
      <ProTable<DataType, Params, ValueType>
        actionRef={actionRef}
        formRef={mergedFormRef}
        options={{
          density: false,
          fullScreen: false,
          reload: false,
          setting: true,
        }}
        expandIconColumnIndex={dragSort?.visable ? 1 : 0}
        dataSource={dragSort?.visable ? dataSource : restProps.dataSource}
        columns={resizable ? (resizableColumns as any) : adaptionColumns}
        components={merge(components, realityComponents, dragSort?.visable ? dragConfig : {})}
        toolBarRender={toolBarRenderResult}
        pagination={
          pagination == false
            ? false
            : {
                showSizeChanger: true,
                showQuickJumper: true,
                ...pagination,
              }
        }
        request={standardRequest}
        rowKey={rowKey}
        className={styles.ytTable + ' ' + className}
        beforeSearchSubmit={mergedBeforeSearchSubmit}
        onSubmit={mergedOnSubmit}
        {...restProps}
        scroll={{
          x: resizable ? tableWidth : scrollX,
          y: 100,
          ...restProps?.scroll,
        }}
        search={
          restProps?.search === false
            ? false
            : {
                labelWidth: 'auto',
                searchText: formatMessage({ id: 'common.search', defaultMessage: '搜索' }),
                showHiddenNum: true,
                ...(restProps?.search || {}),
                onCollapse: mergedOnCollapse,
              }
        }
      />
    </div>
  );
};

export default YTProTable;
