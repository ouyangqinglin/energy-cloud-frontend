/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-23 16:33:24
 * @LastEditTime: 2023-08-04 17:01:11
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\TableSelect\TableSelect\TableModal.tsx
 */
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { Modal, Tag } from 'antd';
import type { TableProps } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import ProTable from '@ant-design/pro-table';
import type { ProTableProps } from '@ant-design/pro-table';
import { defaultsDeep, mergeWith } from 'lodash';
import styles from '../index.less';
import { cloneDeep } from 'lodash';

export type TableModalProps<V, T, U> = {
  title?: string;
  open?: boolean;
  onCancel?: () => void;
  width?: string;
  proTableProps?: ProTableProps<T, U>;
  multiple?: boolean;
  valueId?: string;
  valueName?: string;
  tableId?: string;
  tableName?: string;
  value?: V[];
  onChange?: (value: V[]) => void;
};

const TableModal = <
  ValueType extends Record<string, any>,
  DataType extends Record<string, any>,
  Params extends Record<string, any>,
>(
  props: TableModalProps<ValueType, DataType, Params>,
) => {
  const {
    title = '选择数据',
    open,
    onCancel,
    width = '1000px',
    multiple = true,
    proTableProps,
    valueId = 'id',
    valueName = 'name',
    tableId = 'id',
    tableName = 'name',
    value = [],
    onChange,
  } = props;

  const [selectedTags, setSelectedTags] = useState<ValueType[]>([]);

  const onSelectedChange: TableRowSelection<DataType>['onChange'] = useCallback(
    (selectedRowKeys, selectedRows: DataType[]) => {
      const result = selectedRows.map(
        (item) => ({ [valueId]: item[tableId], [valueName]: item[tableName] } as ValueType),
      );
      setSelectedTags(result);
    },
    [],
  );

  const onClose = useCallback(
    (index) => {
      const result = cloneDeep(selectedTags || []);
      result.splice(index, 1);
      setSelectedTags(result);
    },
    [selectedTags],
  );

  const onOk = () => {
    onChange?.(selectedTags);
    onCancel?.();
  };

  useEffect(() => {
    if (open) {
      setSelectedTags(value);
    }
  }, [open]);

  const tableAlertRender: ProTableProps<DataType, Params>['tableAlertRender'] = useCallback(
    ({ selectedRowKeys, selectedRows, onCleanSelected }) => {
      const tags = selectedTags?.map?.((item, index) => {
        return (
          <Tag className="mb4" key={item[valueId]} closable onClose={() => onClose(index)}>
            <div className={styles.tag} title={item[valueName]}>
              {item[valueName]}
            </div>
          </Tag>
        );
      });
      return (
        <>
          <div className="flex mb8">
            <span className="flex1">已选择{selectedTags?.length || 0}项</span>
            <a onClick={onCleanSelected}>清空</a>
          </div>
          <div>
            <div className={`flex1 ${styles.tagContain}`}>{tags}</div>
          </div>
        </>
      );
    },
    [selectedTags],
  );

  const defaultTableProps = useMemo<ProTableProps<DataType, Params>>(() => {
    return {
      rowSelection: {
        type: multiple ? 'checkbox' : 'radio',
        alwaysShowAlert: true,
        selectedRowKeys: selectedTags?.map?.((item) => item[valueId]),
        onChange: onSelectedChange,
      },
      search: { labelWidth: 'auto' },
      rowKey: tableId,
      pagination: {
        pageSize: 10,
        showSizeChanger: true,
      },
      toolBarRender: false,
      tableAlertRender,
      tableAlertOptionRender: false,
      size: 'small',
    };
  }, [multiple, selectedTags, valueId, onSelectedChange, tableId, tableAlertRender]);

  const tableProps = useMemo<ProTableProps<DataType, Params>>(() => {
    return mergeWith(defaultTableProps, proTableProps, (objValue, srcValue) => {
      if (srcValue === false) {
        return false;
      }
    });
  }, [defaultTableProps, proTableProps]);

  return (
    <>
      <Modal title={title} open={open} width={width} onCancel={onCancel} onOk={onOk} destroyOnClose>
        <ProTable className={styles.proTable} {...tableProps} />
      </Modal>
    </>
  );
};

export default TableModal;
