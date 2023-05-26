import type { ProColumns } from '@ant-design/pro-table';
import { Button, Modal } from 'antd';
import { isFunction } from 'lodash';
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
  const {
    option: { modalDeleteText, onEditChange, onDetailChange, onDeleteChange, onEnterChange } = {},
  } = props;

  const operationsCollection = [onEnterChange, onDetailChange, onEditChange, onDeleteChange].filter(
    (fn) => isFunction(fn),
  );
  const widthLength = operationsCollection.length;
  console.log(widthLength);

  // 设置默认的option
  const defaultOptionConfig: ProColumns<DataType, ValueType> = {
    title: '操作',
    valueType: 'option',
    width: widthLength * 50 + 50,
    fixed: 'right',
    render: (...renderProp) => {
      const renderButtonGroup: ReactNode[] = [];
      [onEnterChange, onDetailChange, onEditChange, onDeleteChange].forEach((fn) => {
        if (fn && isFunction(fn)) {
          const key = fn.name;
          const renderButton = operationsMap.get(key);
          if (!renderButton) {
            return;
          }

          renderButtonGroup.push(renderButton(() => fn(...renderProp), modalDeleteText));

          if (renderButtonGroup.length > 0) {
            renderButtonGroup.push(<div key={key} className={styles.divider} />);
          }
        }
      });

      if (renderButtonGroup.length) {
        renderButtonGroup.pop();
      }
      return <div className={styles.operationWrapper}>{renderButtonGroup}</div>;
    },
  };

  return defaultOptionConfig;
}
