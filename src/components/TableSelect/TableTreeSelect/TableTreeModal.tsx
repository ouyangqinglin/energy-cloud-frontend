/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-02 16:59:12
 * @LastEditTime: 2023-06-13 10:32:27
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\TableSelect\TableTreeSelect\TableTreeModal.tsx
 */
import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { Modal, Tag, Tree, Row, Col } from 'antd';
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
  model?: string;
  value?: V[];
  onChange?: (value: V[]) => void;
  title?: string;
  open?: boolean;
  onCancel?: () => void;
  width?: string;
  proTableProps?: Omit<ProTableProps<T, U>, 'actionRef' | 'request'> & {
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
  multiple?: boolean;
  disabled?: boolean;
  limit?: number;
  valueId?: string;
  valueName?: string;
  clearable?: boolean;
  placeholder?: string;
  treeName?: string;
  treeProps?: Omit<TreeProps, 'onSelect' | 'treeData' | 'blockNode'> & {
    request: (params?: any) => Promise<any> | undefined;
  };
  onlySelectedLastLevel?: boolean;
  selectType?: SelectTypeEnum;
  dealTreeData?: dealTreeDataType<TreeData>;
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
    title = '选择数据',
    open,
    onCancel,
    width = '1000px',
    multiple = true,
    proTableProps = {},
    valueId = 'id',
    valueName = 'name',
    treeName = 'name',
    value = [],
    onChange,
    onlySelectedLastLevel = true,
    selectType = SelectTypeEnum.Collect,
    dealTreeData,
  } = props;

  const [selectedTags, setSelectedTags] = useState<ValueType[]>([]);
  const [treeData, setTreeData] = useState();
  const [tableParams, setTableParams] = useState<any>({});

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
    [valueId, valueName],
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
          return {
            data: data?.list,
            total: data?.total,
          };
        });
      } else {
        return Promise.resolve({});
      }
    },
    [proTableProps?.request],
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
  }, [open, value, onlySelectedLastLevel, props?.treeProps?.request, selectType, valueId]);

  const tags = useMemo(() => {
    return selectedTags?.map?.((item, index) => {
      return (
        <Tag className="mb4" key={item[valueId]} closable onClose={() => onClose(index)}>
          <div className={styles.tag} title={item[valueName]}>
            {selectType === SelectTypeEnum.Collect
              ? item?.node?.[treeName] + '-' + item[valueName]
              : item[valueName]}
          </div>
        </Tag>
      );
    });
  }, [selectedTags]);

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
      <Modal
        title={title}
        open={open}
        width={width}
        onCancel={onCancel}
        onOk={onOk}
        destroyOnClose
        centered
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
      </Modal>
    </>
  );
};

export default TableTreeModal;
