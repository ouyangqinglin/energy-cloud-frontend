import { MenuOutlined } from '@ant-design/icons';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import type { SortableContainerProps } from 'react-sortable-hoc';
import { formatMessage } from '@/utils';
import type { SortEnd } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import type { ProColumns } from '@ant-design/pro-components';

export const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
));

export const dragcolumns: ProColumns[] = [
  {
    title: formatMessage({ id: 'common.sort', defaultMessage: '排序' }),
    dataIndex: 'sort',
    width: 80,
    hideInSearch: true,
    render: () => <DragHandle />,
  },
];

const SortableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr {...props} />
));

const SortableBody = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props} />
));

const DraggableContainer = (props: SortableContainerProps) => (
  <SortableBody
    useDragHandle
    disableAutoscroll
    helperClass="row-dragging"
    onSortEnd={props.onSortEnd}
    {...props}
  />
);

const DraggableBodyRow: React.FC<any> = (props) => {
  const index = props.dataSource.findIndex(
    (x: any) => x[`${props.rowKey}`] === props['data-row-key'],
  );
  return <SortableItem index={index} {...props} />;
};

const dragComponents = (onSortEnd: any, dataSource: any, rowKey: string) => ({
  body: {
    wrapper: (wrapperProps: any) => DraggableContainer({ ...wrapperProps, onSortEnd }),
    row: (rowProps: any) => DraggableBodyRow({ ...rowProps, dataSource, rowKey }),
  },
});

export default dragComponents;
export { SortEnd, arrayMoveImmutable };
