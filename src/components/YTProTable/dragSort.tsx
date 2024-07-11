import { MenuOutlined } from '@ant-design/icons';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import type { SortableContainerProps } from 'react-sortable-hoc';
import { formatMessage } from '@/utils';
import type { SortEnd } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import './index.less';
import { message } from 'antd';

type DragComponentsProps = {
  request: any;
  dataSource: any[];
  rowKey: any;
  baseSort: number;
  getSortData: any;
};

type ContainerProps = SortableContainerProps & DragComponentsProps;

export const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
));

export const dragcolumns = [
  {
    title: '',
    dataIndex: 'sort',
    width: 50,
    hideInSearch: true,
    render: (_, record: any) => {
      if (!record.parentId) {
        // 父节点显示拖拽功能
        return <DragHandle />;
      }
      return '';
    },
  },
];

const SortableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr {...props} />
));

const SortableBody = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props} />
));

const DraggableContainer = (props: ContainerProps) => {
  const sortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (newIndex < 0) {
      message.info(formatMessage({ id: 'common.1007', defaultMessage: '不支持拖拽到子节点' }));
      return;
    }
    if (oldIndex !== newIndex) {
      const queryData = [] as any;
      const sortData = arrayMoveImmutable(props.dataSource.slice(), oldIndex, newIndex)
        .filter((el: any) => !!el)
        .map((item, index) => {
          queryData.push({
            [`${props.rowKey}`]: item[`${props.rowKey}`],
            sort: index + props.baseSort,
          });
          return item;
        });
      props.request(queryData);
      props.getSortData(sortData);
    }
  };
  return (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={sortEnd}
      {...props}
    />
  );
};

const DraggableBodyRow: React.FC<any> = (props) => {
  const index = props.dataSource.findIndex(
    (x: any) => x[`${props.rowKey}`] === props['data-row-key'],
  );
  return <SortableItem index={index} {...props} />;
};

const dragComponents = (props: DragComponentsProps) => ({
  body: {
    wrapper: (wrapperProps: any) => DraggableContainer({ ...wrapperProps, ...props }),
    row: (rowProps: any) => DraggableBodyRow({ ...rowProps, ...props }),
  },
});

export default dragComponents;
export { SortEnd, arrayMoveImmutable };
