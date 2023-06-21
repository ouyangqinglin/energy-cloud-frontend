/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-02 16:59:12
 * @LastEditTime: 2023-06-21 08:52:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\TableSelect\TableTreeSelect\TableTreeModal.tsx
 */
import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { Modal, Tag, Tree, Row, Col, Empty } from 'antd';
import Dialog from '@/components/Dialog';
import type { TreeDataNode, TreeProps } from 'antd';
import type { SortOrder } from 'antd/lib/table/interface';
import type { BasicDataNode } from 'rc-tree/lib/interface';
import { useRequest } from 'umi';
import type { TableRowSelection } from 'antd/es/table/interface';
import ProTable from '@ant-design/pro-table';
import type { ProTableProps, ActionType } from '@ant-design/pro-table';
import { defaultsDeep } from 'lodash';
import styles from '../index.less';
import { cloneDeep } from 'lodash';
import type { ResponsePromise, ResponsePageData } from '@/utils/request';

export enum SelectTypeEnum {
  Collect = 'collect',
  Device = 'device',
}

export type dealTreeDataType<TreeData = Record<string, any>> = {
  (value: TreeData & BasicDataNode): void;
};

export { BasicDataNode };

export type TableTreeModalProps<V, T, U, TreeData> = {
  model?: string; // screen：大屏样式
  value?: V[]; //
  onChange?: (value: V[]) => void;
  title?: string; // 弹窗标题
  open?: boolean;
  onCancel?: () => void;
  width?: string; // 弹窗宽度
  proTableProps?: Omit<ProTableProps<T, U>, 'actionRef' | 'request'> & {
    // 表格属性
    request?: (
      params: U & {
        pageSize?: number;
        current?: number;
        keyword?: string;
      },
      sort: Record<string, SortOrder>,
      filter: Record<string, React.ReactText[] | null>,
    ) => ResponsePromise<ResponsePageData<T>, T>;
  };
  multiple?: boolean; // 是否多选
  disabled?: boolean; // 是否禁用
  limit?: number; //  表单输入框显示已选项的数量，多余的数字显示
  valueId?: string; // 数据字段id既表格id或者树id
  valueName?: string; // 数据字段name既表格name或者树name
  clearable?: boolean; // 表单输入框是否可清空
  placeholder?: string; // 表单输入框placshoder
  treeProps?: Omit<TreeProps, 'onSelect' | 'treeData' | 'blockNode'> & {
    //  树属性
    request: (params?: any) => Promise<any> | undefined;
  };
  selectType?: SelectTypeEnum; //  数据选择类型：选设备/选设备属性
  dealTreeData?: dealTreeDataType<TreeData>; //  处理树数据
};

const runDealTreeData = <TreeData,>(
  data: TreeProps['treeData'],
  dealTreeData?: dealTreeDataType<TreeData>,
) => {
  if (data && data.length) {
    data.forEach((item) => {
      if (item.children && item.children.length) {
        item.selectable = false;
      }
      dealTreeData?.(item as any);
      if (item.children && item.children.length) {
        runDealTreeData(item.children, dealTreeData);
      }
    });
  }
};

const TableTreeModal = <
  ValueType extends Record<string, any>,
  DataType extends Record<string, any>,
  Params extends Record<string, any>,
  TreeData,
>(
  props: TableTreeModalProps<ValueType, DataType, Params, TreeData>,
) => {
  const {
    model,
    title = '选择数据',
    open,
    onCancel,
    width = '1000px',
    multiple = true,
    proTableProps = {},
    valueId = 'id',
    valueName = 'name',
    value,
    onChange,
    selectType = SelectTypeEnum.Collect,
    dealTreeData,
  } = props;

  const [selectedTags, setSelectedTags] = useState<ValueType[]>([]);
  const [treeData, setTreeData] = useState<any[]>();
  const [tableParams, setTableParams] = useState<any>({});
  const [tableIdSet, setTableIdSet] = useState<Set<string>>();

  const treeSelectAndCheckData = useMemo(() => {
    if (selectType === SelectTypeEnum.Device) {
      if (multiple) {
        return {
          checkedKeys: selectedTags?.map?.((item) => item[valueId]),
        };
      } else {
        return {
          selectedKeys: selectedTags?.map?.((item) => item[valueId]),
        };
      }
    }
    return {};
  }, [selectType, multiple, selectedTags, valueId]);

  const onSelectedChange: TableRowSelection<DataType>['onChange'] = useCallback(
    (selectedRowKeys, selectedRows: DataType[]) => {
      setSelectedTags((prevData) => {
        const map = prevData.reduce((result, item) => {
          result.set(item[valueId], item);
          return result;
        }, new Map());
        tableIdSet?.forEach((item) => {
          map.delete(item);
        });
        selectedRows.forEach((item) => {
          map.set(item[valueId], {
            [valueId]: item[valueId],
            [valueName]: item[valueName],
            node: item,
          });
        });
        return [...map.values()];
      });
    },
    [valueId, valueName, tableIdSet],
  );

  const onCleanSelected = useCallback(() => {
    setSelectedTags([]);
  }, []);

  const onClose = useCallback(
    (index) => {
      const result = cloneDeep(selectedTags || []);
      result.splice(index, 1);
      setSelectedTags(result);
    },
    [selectedTags],
  );

  const onOk = useCallback(() => {
    onChange?.(selectedTags);
    onCancel?.();
  }, [selectedTags]);

  const onTreeSelect = useCallback(
    (selectedKeys, { selectedNodes }) => {
      if (selectedKeys && selectedKeys.length) {
        setTableParams({ deviceId: selectedKeys[0] });
      }
      if (selectType === SelectTypeEnum.Device && !multiple) {
        const result = selectedNodes.map(
          (item: TreeData) =>
            ({
              [valueId]: item[valueId],
              [valueName]: item[valueName],
              ['node' as string]: item,
            } as ValueType),
        );
        setSelectedTags(result);
      }
    },
    [valueId, valueName],
  );

  const onTreeCheck = useCallback(
    (_, { checkedNodes }) => {
      const result = checkedNodes.map(
        (item: TreeData) =>
          ({
            [valueId]: item[valueId],
            [valueName]: item[valueName],
            ['node' as string]: item,
          } as ValueType),
      );
      setSelectedTags(result);
    },
    [valueId, valueName],
  );

  const requestTable = useCallback(
    (params, sort, filter) => {
      if (proTableProps?.request && params.deviceId) {
        return proTableProps.request(params, sort, filter).then(({ data = {} }) => {
          setTableIdSet(new Set(data?.list?.map?.((item) => item[valueId])));
          return {
            data: data?.list,
            total: data?.total,
          };
        });
      } else {
        return Promise.resolve({});
      }
    },
    [proTableProps?.request, valueId],
  );

  useEffect(() => {
    if (open) {
      setSelectedTags(value || []);
      if (selectType === SelectTypeEnum.Device && value && value.length) {
        setTableParams({ deviceId: value[0][valueId] });
      }
      props?.treeProps?.request?.()?.then?.(({ data }) => {
        runDealTreeData(data, dealTreeData);
        setTreeData(data);
      });
    }
  }, [open, value, props?.treeProps?.request, selectType, valueId]);

  const tags = useMemo(() => {
    return selectedTags?.map?.((item, index) => {
      return (
        <Tag className="mb4" key={item[valueId]} closable onClose={() => onClose(index)}>
          <div className={styles.tag} title={item[valueName]}>
            {selectType === SelectTypeEnum.Collect
              ? item?.node?.[props.treeProps?.fieldNames?.title || 'name'] + '-' + item[valueName]
              : item[valueName]}
          </div>
        </Tag>
      );
    });
  }, [selectedTags, valueId, valueName, selectType, props.treeProps]);

  const defaultTableProps: ProTableProps<DataType, Params> = {
    ...(selectType === SelectTypeEnum.Collect
      ? {
          rowSelection: {
            type: multiple ? 'checkbox' : 'radio',
            selectedRowKeys: selectedTags?.map?.((item) => item[valueId]),
            onChange: onSelectedChange,
          },
        }
      : {}),
    search: false,
    rowKey: valueId,
    pagination: {
      pageSize: 10,
      showSizeChanger: true,
    },
    toolBarRender: false,
    tableAlertRender: false,
    tableAlertOptionRender: false,
    size: 'small',
  };

  const tableProps: ProTableProps<DataType, Params> = defaultsDeep(
    defaultTableProps,
    proTableProps,
  );

  return (
    <>
      <Dialog
        model={model}
        title={title}
        open={open}
        width={width}
        onCancel={onCancel}
        onOk={onOk}
        destroyOnClose
      >
        <div className={`ant-alert ant-alert-info ant-alert-no-icon mb12 ${styles.alert}`}>
          <div className="flex mb8">
            <span className="flex1">已选择{selectedTags?.length || 0}项</span>
            <a onClick={onCleanSelected}>清空</a>
          </div>
          <div>
            <div className={`flex1 ${styles.tagContain}`}>{tags}</div>
          </div>
        </div>
        <Row gutter={20}>
          <Col className={styles.treeCol} flex="250px">
            <Tree
              treeData={treeData}
              onSelect={onTreeSelect}
              onCheck={onTreeCheck}
              blockNode
              checkable={selectType === SelectTypeEnum.Device && multiple}
              {...treeSelectAndCheckData}
              checkStrictly
              defaultExpandAll={true}
              {...props?.treeProps}
            />
          </Col>
          <Col className={styles.treeCol} flex="1">
            <ProTable<DataType, Params>
              className={styles.proTable}
              {...tableProps}
              params={tableParams}
              request={requestTable}
            />
          </Col>
        </Row>
      </Dialog>
    </>
  );
};

export default TableTreeModal;
