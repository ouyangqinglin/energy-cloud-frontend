import { useMemo, useRef } from 'react';
import { ProTable, ProFormInstance } from '@ant-design/pro-components';
import type { ParamsType } from '@ant-design/pro-provider';
import type { YTProTableProps } from './typing';
import genDefaultOperation from './operation';
import { normalizeRequestOption, standardRequestTableData } from './helper';
import styles from './index.less';
import useToolBarRender from './useToolBarRender';
import useTableSize from './useTableSize';

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
    ...restProps
  } = props;

  const tableFormRef = useRef<ProFormInstance<Params>>();
  const myTableRef = useRef<HTMLDivElement>();

  const mergedFormRef = useMemo(() => {
    return formRef || tableFormRef;
  }, [formRef, tableFormRef]);

  const mergedTableRef = useMemo<any>(() => {
    return tableRef || myTableRef;
  }, [formRef, myTableRef]);

  const toolBarRenderResult = useToolBarRender<DataType, Params, ValueType>(
    toolBarRender,
    toolBarRenderOptions,
    mergedFormRef,
  );

  // TODO: 支持选项式的请求
  const customColumns = normalizeRequestOption<DataType, ValueType>(columns);

  // 合并默认的操作(删除，编辑，进入)
  const defaultOperation = genDefaultOperation<DataType, Params, ValueType>(props);
  if (defaultOperation) {
    customColumns?.push(defaultOperation);
  }

  // 对request请求方法进行封装，解构表格数据格式
  const standardRequest = standardRequestTableData<DataType, Params>(request);

  const { scrollX } = useTableSize(mergedTableRef, restProps.scroll);

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
        columns={customColumns}
        toolBarRender={toolBarRenderResult}
        pagination={{
          showSizeChanger: true,
        }}
        request={standardRequest}
        rowKey="id"
        className={styles.ytTable}
        {...restProps}
        scroll={{
          x: scrollX,
          y: 100,
          ...restProps?.scroll,
        }}
        search={
          restProps?.search === false
            ? false
            : {
                labelWidth: 'auto',
                searchText: '搜索',
                ...(restProps?.search || {}),
              }
        }
      />
    </div>
  );
};

export default YTProTable;
