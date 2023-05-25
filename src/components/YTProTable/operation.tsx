import type { ProColumns } from '@ant-design/pro-table';
import { Button, Modal } from 'antd';
import type { CustomTableProps } from './typing';

export default function genDefaultOperation<
  DataType extends Record<string, any>,
  ValueType = 'text',
>(props: CustomTableProps<DataType, ValueType>) {
  const {
    option: { modalDeleteText, onEditChange, onDeleteChange, onEnterChange, onDetailChange } = {},
  } = props;

  // 设置默认的option
  const defaultOptionConfig: ProColumns<DataType, ValueType> = {
    title: '操作',
    valueType: 'option',
    width: 'auto',
    fixed: 'right',
    render: (...renderProp) => (
      <>
        {onDetailChange && (
          <Button type="link" size="small" key="in" onClick={() => onDetailChange?.(...renderProp)}>
            查看详情
          </Button>
        )}
        {onEnterChange && (
          <Button type="link" size="small" key="in" onClick={() => onEnterChange?.(...renderProp)}>
            进入
          </Button>
        )}
        {onEditChange && (
          <Button type="link" size="small" key="edit" onClick={() => onEditChange?.(...renderProp)}>
            编辑
          </Button>
        )}
        {onDeleteChange && (
          <Button
            type="link"
            size="small"
            key="delete"
            onClick={() => {
              Modal.confirm({
                title: '删除',
                content: modalDeleteText ? modalDeleteText : '确定要删除吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                  onDeleteChange?.(...renderProp);
                },
              });
            }}
          >
            删除
          </Button>
        )}
      </>
    ),
  };

  return defaultOptionConfig;
}
