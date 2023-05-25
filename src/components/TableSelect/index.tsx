/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-23 09:51:58
 * @LastEditTime: 2023-05-24 19:32:54
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\TableSelect\index.tsx
 */
import React, { useState, useMemo, useCallback } from 'react';
import { Tag, Modal } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { cloneDeep } from 'lodash';
import styles from './index.less';
import TableModal from './TableModal';
import type { ProTableProps } from '@ant-design/pro-table';
import type { ProRenderFieldPropsType } from '@ant-design/pro-components';

type TableSelectProps<V, T, P> = {
  value?: V[];
  onChange?: (value: V[]) => void;
  title?: string;
  width?: string;
  multiple?: boolean;
  limit?: number;
  disabled?: boolean;
  valueId?: string;
  valueName?: string;
  tableId?: string;
  tableName?: string;
  clearable?: boolean;
  proTableProps?: ProTableProps<T, P>;
  placeholder?: string;
};

const TableSelect = <
  ValueType extends Record<string, any>,
  DataType extends Record<string, any>,
  Params extends Record<string, any>,
>(
  props: TableSelectProps<ValueType, DataType, Params>,
) => {
  const {
    value = [],
    onChange,
    multiple = true,
    limit = 3,
    disabled = false,
    valueId = 'id',
    valueName = 'name',
    tableId = 'id',
    tableName = 'name',
    clearable = true,
    proTableProps,
    title,
    width,
    placeholder = '请选择',
  } = props;

  const [open, setOpen] = useState(false);
  const valueLength = value?.length || 0;

  const onClose = useCallback((e: React.MouseEvent, index) => {
    e.stopPropagation();
    const result = cloneDeep(value || []);
    result.splice(index, 1);
    onChange?.(result);
  }, []);

  const onClearClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.([]);
  }, []);

  const onSwitchOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const tags = useMemo(() => {
    const result: React.ReactNode[] = [];
    if (value && valueLength) {
      for (let i = 0; i < valueLength; i++) {
        if (i < limit) {
          result.push(
            <Tag key={value[i][valueId]} closable={!disabled} onClose={(e) => onClose(e, i)}>
              <div className={styles.tag} title={value[i][valueName]}>
                {value[i][valueName]}
              </div>
            </Tag>,
          );
        } else {
          break;
        }
      }
    }
    return result;
  }, [value]);

  return (
    <>
      <div className={`ant-input-affix-wrapper ${styles.input}`} onClick={onSwitchOpen}>
        {tags.length ? tags : <span className={styles.placeholder}>{placeholder}</span>}
        {valueLength > limit ? '+' + (valueLength - limit) : ''}
        {clearable && (
          <CloseCircleFilled
            className={styles.clearable}
            style={{ display: valueLength ? 'block' : 'none' }}
            onClick={onClearClick}
          />
        )}
      </div>
      <TableModal<ValueType, DataType, Params>
        open={open}
        proTableProps={proTableProps}
        multiple={multiple}
        title={title}
        width={width}
        valueId={valueId}
        valueName={valueName}
        tableId={tableId}
        tableName={tableName}
        value={value || []}
        onChange={onChange}
        onCancel={onSwitchOpen}
      />
    </>
  );
};

const valueRender: ProRenderFieldPropsType['render'] = (value, props, dom) => {
  return <>{[value].flat(1).join(',')}</>;
};

const formRender: ProRenderFieldPropsType['renderFormItem'] = (value, props, dom) => {
  return (
    <>
      <TableSelect {...props.fieldProps} />
    </>
  );
};

export const TABLESELECT = 'tableselect';

export type TABLESELECTVALUETYPE = typeof TABLESELECT;

export const tableSelectValueTypeRender: ProRenderFieldPropsType = {
  render: valueRender,
  renderFormItem: formRender,
};

export const tableSelectValueTypeMap = {
  [TABLESELECT]: tableSelectValueTypeRender,
};

export default TableSelect;
