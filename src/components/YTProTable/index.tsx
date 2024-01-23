import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ProTable, ProFormInstance } from '@ant-design/pro-components';
import type { ParamsType } from '@ant-design/pro-provider';
import type { YTProColumns, YTProTableProps } from './typing';
import genDefaultOperation from './operation';
import { calculateColumns, normalizeRequestOption, standardRequestTableData } from './helper';
import styles from './index.less';
import useToolBarRender from './useToolBarRender';
import useTableSize from './useTableSize';
import { useBoolean } from 'ahooks';
import { formatMessage } from '@/utils';
import { useAntdColumnResize } from 'react-antd-column-resize';

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
    actionRef,
    formRef,
    toolBarRenderOptions,
    request,
    tableRef,
    className,
    resizable = false,
    resizableOptions,
    ...restProps
  } = props;

  const tableFormRef = useRef<ProFormInstance<Params>>();
  const myTableRef = useRef<HTMLDivElement>();
  const [collapsed, { set: setCollapse }] = useBoolean(false);
  const [adaptionColumns, setAdaptionColumns] = useState<YTProColumns<DataType, ValueType>[]>([]);

  const mergedFormRef = useMemo(() => {
    return formRef || tableFormRef;
  }, [formRef, tableFormRef]);

  const mergedTableRef = useMemo<any>(() => {
    return tableRef || myTableRef;
  }, [formRef, myTableRef]);

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
  );

  // 对request请求方法进行封装，解构表格数据格式
  const standardRequest = standardRequestTableData<DataType, Params>(request);

  const { scrollX } = useTableSize(mergedTableRef, restProps.scroll, collapsed);

  const { resizableColumns, components, tableWidth } = useAntdColumnResize(() => {
    return { minWidth: 100, ...resizableOptions, columns: resizable ? adaptionColumns : [] };
  }, [resizable, resizableOptions, adaptionColumns]);

  useEffect(() => {
    // TODO: 支持选项式的请求
    const result = normalizeRequestOption<DataType, ValueType>(columns);

    // 合并默认的操作(删除，编辑，进入)
    const defaultOperation = genDefaultOperation<DataType, Params, ValueType>(props);
    if (defaultOperation) {
      result?.push(defaultOperation);
    }
    if (resizable && scrollX) {
      calculateColumns(result, mergedTableRef);
    }
    setAdaptionColumns(result);
  }, [columns, resizable, scrollX]);

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
        columns={resizable ? (resizableColumns as any) : adaptionColumns}
        components={components}
        toolBarRender={toolBarRenderResult}
        pagination={{
          showSizeChanger: true,
        }}
        request={standardRequest}
        rowKey="id"
        className={styles.ytTable + ' ' + className}
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
