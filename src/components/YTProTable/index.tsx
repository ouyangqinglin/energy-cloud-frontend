import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ParamsType } from '@ant-design/pro-provider';
import type { ProTableProps } from '@ant-design/pro-table';

import type { CustomTableProps } from './typing';
import genDefaultOperation from './operation';

const YTProTable = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(
  props: ProTableProps<DataType, Params, ValueType> & CustomTableProps<DataType, ValueType>,
) => {
  const { toolBarRender, columns, request, actionRef, toolbar } = props;

  // 新建按钮的统一模板
  const toolBarNode = () => [
    <Button type="primary" key="add" onClick={toolbar?.onChange}>
      <PlusOutlined />
      {toolbar?.buttonText ?? '新建'}
    </Button>,
  ];
  const toolBar = toolBarRender ? toolBarRender : toolBarNode;

  // 合并默认的操作(删除，编辑，进入)
  const defaultOperation = genDefaultOperation<DataType, ValueType>(props);
  const shouldMergeOperation = columns?.find((column) => {
    return column.valueType !== 'option';
  });
  const columnsWithOption = [...(columns ?? [])];
  if (shouldMergeOperation) {
    columnsWithOption?.push(defaultOperation);
  }

  return (
    <ProTable<DataType, Params, ValueType>
      options={false}
      actionRef={actionRef}
      columns={columnsWithOption}
      toolBarRender={toolBar}
      search={{
        labelWidth: 'auto',
      }}
      rowKey="id"
      request={request}
      scroll={{ x: 1366 }}
      pagination={{
        showSizeChanger: true,
      }}
    />
  );
};

export default YTProTable;
