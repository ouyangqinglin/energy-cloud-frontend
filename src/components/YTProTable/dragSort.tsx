import { MenuOutlined } from '@ant-design/icons';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import type { SortableContainerProps } from 'react-sortable-hoc';
import { formatMessage } from '@/utils';

const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

export const dragcolumns = [
  {
    title: formatMessage({ id: 'common.sort', defaultMessage: '排序' }),
    dataIndex: 'sort',
    width: 80,
    hideInSearch: true,
    render: () => <DragHandle />,
  },
];

export const SortableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr {...props} />
));

export const SortableBody = SortableContainer(
  (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />,
);

export const DraggableContainer = (props: SortableContainerProps) => (
  <SortableBody
    useDragHandle
    disableAutoscroll
    helperClass="row-dragging"
    onSortEnd={props.onSortEnd}
    {...props}
  />
);

export const DraggableBodyRow: React.FC<any> = (props) => {
  const index = props.dataSource.findIndex((x: any) => x.deviceId === props['data-row-key']);
  return <SortableItem index={index} {...props} />;
};

const dragComponents = (onSortEnd: any, dataSource: any) => ({
  body: {
    wrapper: (wrapperProps: any) => DraggableContainer({ ...wrapperProps, onSortEnd }),
    row: (rowProps: any) => DraggableBodyRow({ ...rowProps, dataSource }),
  },
});

export default dragComponents;
