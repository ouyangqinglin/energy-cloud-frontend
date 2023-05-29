import type { ProColumns } from '@ant-design/pro-table';
import { Button, Modal } from 'antd';
import { isFunction, isEmpty } from 'lodash';
import type { ReactNode } from 'react';
import type { YTProTableCustomProps } from './typing';
import styles from './index.less';

const operationsMap = new Map([
  [
    'onEnterChange',
    (onChange: React.MouseEventHandler<HTMLElement>) => (
      <Button type="link" size="small" key="in" onClick={onChange}>
        进入
      </Button>
    ),
  ],
  [
    'onDetailChange',
    (onChange: React.MouseEventHandler<HTMLElement>) => (
      <Button type="link" size="small" key="detail" onClick={onChange}>
        查看详情
      </Button>
    ),
  ],

  [
    'onEditChange',
    (onChange: React.MouseEventHandler<HTMLElement>) => (
      <Button type="link" size="small" key="edit" onClick={onChange}>
        编辑
      </Button>
    ),
  ],

  [
    'onDeleteChange',
    (onChange: React.MouseEventHandler<HTMLElement>, content = '确定要删除吗？') => (
      <Button
        type="link"
        size="small"
        key="delete"
        onClick={() => {
          Modal.confirm({
            title: <strong>删除确认</strong>,
            content,
            okText: '确认',
            cancelText: '取消',
            onOk: onChange,
          });
        }}
      >
        删除
      </Button>
    ),
  ],
]);

export default function genDefaultOperation<
  DataType extends Record<string, any>,
  ValueType = 'text',
>(props: YTProTableCustomProps<DataType, ValueType>) {
  const { option = {} } = props;
  const {
    columnsProp = {},
    modalDeleteText,
    onEditChange,
    onDetailChange,
    onDeleteChange,
    onEnterChange,
    render,
  } = option;

  const operationsCollection = [onEnterChange, onDetailChange, onEditChange, onDeleteChange].filter(
    (fn) => isFunction(fn),
  );
  const widthLength = operationsCollection.length;

  // 设置默认的option
  const defaultOptionConfig: ProColumns<DataType, ValueType> = {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    width: widthLength * 50 + 50,
    fixed: 'right',
    ...columnsProp,
    render: (...renderProp) => {
      const renderButtonGroup: ReactNode[] = [];
      if (render) {
        renderButtonGroup.push(render(...renderProp));
      }
      ['onEnterChange', 'onDetailChange', 'onEditChange', 'onDeleteChange'].forEach((buttonKey) => {
        const fn = option[buttonKey];
        if (buttonKey && isFunction(fn)) {
          const renderButton = operationsMap.get(buttonKey);
          if (!renderButton) {
            return;
          }

          // 插入分割线
          if (renderButtonGroup.length > 0) {
            renderButtonGroup.push(<div key={buttonKey} className={styles.divider} />);
          }

          // 插入需要显示的元素
          renderButtonGroup.push(renderButton(() => fn(...renderProp), modalDeleteText));
        }
      });
      return <div className={styles.operationWrapper}>{renderButtonGroup}</div>;
    },
  };
  return isEmpty(option) ? '' : defaultOptionConfig;
}
