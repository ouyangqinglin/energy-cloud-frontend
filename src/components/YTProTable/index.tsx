import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import type { ParamsType } from '@ant-design/pro-provider';
import type { YTProTableProps } from './typing';
import genDefaultOperation from './operation';
import { normalizeRequestOption, standardRequestTableData } from './helper';
import styles from './index.less';
import classnames from 'classnames';

const YTProTable = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(
  props: YTProTableProps<DataType, Params, ValueType>,
) => {
  const { toolBarRender, columns, actionRef, toolbar, request, ...restProps } = props;

  // 新建按钮的统一模板
  const toolBarNode = () => (
    <Button type="primary" key="add" onClick={toolbar?.onChange}>
      <PlusOutlined />
      {toolbar?.buttonText ?? '新建'}
    </Button>
  );
  const toolBar = toolBarRender ?? toolBarNode;

  // TODO: 支持选项式的请求
  const customColumns = normalizeRequestOption<DataType, ValueType>(columns);

  // 合并默认的操作(删除，编辑，进入)
  const defaultOperation = genDefaultOperation<DataType, Params, ValueType>(props);
  if (defaultOperation) {
    customColumns?.push(defaultOperation);
  }

  // 对request请求方法进行封装，解构表格数据格式
  const standardRequest = standardRequestTableData<DataType, Params>(request);

  return (
    <ProTable<DataType, Params, ValueType>
      options={false}
      actionRef={actionRef}
      columns={customColumns}
      toolBarRender={toolBar}
      search={{
        labelWidth: 'auto',
        searchText: '搜索',
      }}
      pagination={{
        showSizeChanger: true,
      }}
      request={standardRequest}
      rowKey="id"
      {...restProps}
      className={styles.ytTable}
      scroll={{ x: 1366, y: 557 }}
    />
  );
};

export default YTProTable;
