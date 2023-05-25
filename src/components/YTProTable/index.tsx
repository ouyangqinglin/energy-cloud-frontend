import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
// import ProTable from '@ant-design/pro-table';
import type { ParamsType } from '@ant-design/pro-provider';
import type { ProTableProps } from '@ant-design/pro-components';

import type { CustomTableProps } from './typing';
import genDefaultOperation from './operation';
import { normalizeRequestOption } from './helper';

const YTProTable = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(
  props: ProTableProps<DataType, Params, ValueType> & CustomTableProps<DataType, ValueType>,
) => {
  const { toolBarRender, columns, actionRef, toolbar, ...restProps } = props;

  // 新建按钮的统一模板
  const toolBarNode = () => [
    <Button type="primary" key="add" onClick={toolbar?.onChange}>
      <PlusOutlined />
      {toolbar?.buttonText ?? '新建'}
    </Button>,
  ];
  const toolBar = toolBarRender ? toolBarRender : toolBarNode;

  // TODO: 支持选项式的请求
  const customColumns = normalizeRequestOption<DataType, ValueType>(columns);

  // 合并默认的操作(删除，编辑，进入)
  const defaultOperation = genDefaultOperation<DataType, ValueType>(props);
  const shouldMergeOperation = columns?.find((column) => {
    return column.valueType !== 'option';
  });
  if (shouldMergeOperation) {
    customColumns?.push(defaultOperation);
  }

  return (
    <ProTable<DataType, Params, ValueType>
      options={false}
      actionRef={actionRef}
      columns={customColumns}
      toolBarRender={toolBar}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        showSizeChanger: true,
      }}
      {...restProps}
    />
  );
};

export default YTProTable;
