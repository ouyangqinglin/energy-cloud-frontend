/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-08 09:26:37
 * @LastEditTime: 2023-06-21 17:15:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\TableSelect\TableTreeSelect\index.tsx
 */
import React, { useState, useMemo, useCallback } from 'react';
import { Tag } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { cloneDeep } from 'lodash';
import styles from '../index.less';
import TableTreeModal from './TableTreeModal';
import type { TableTreeModalProps } from './TableTreeModal';
import type { ProRenderFieldPropsType } from '@ant-design/pro-components';

const TableTreeSelect = <
  ValueType extends Record<string, any>,
  DataType extends Record<string, any>,
  Params extends Record<string, any>,
  TreeData,
>(
  props: Omit<TableTreeModalProps<ValueType, DataType, Params, TreeData>, 'open' | 'onCancel'>,
) => {
  const {
    value = [],
    onChange,
    limit = 3,
    disabled = false,
    valueId = 'id',
    valueName = 'name',
    clearable = true,
    placeholder = '请选择',
    ...restProps
  } = props;

  const [open, setOpen] = useState(false);

  const valueLength = useMemo(() => {
    return value?.length || 0;
  }, [value]);

  const onClose = useCallback(
    (e: React.MouseEvent, index) => {
      e.stopPropagation();
      const result = cloneDeep(value || []);
      result.splice(index, 1);
      onChange?.(result);
    },
    [value],
  );

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
  }, [value, limit, valueId, disabled, valueName, valueLength]);

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
      <TableTreeModal<ValueType, DataType, Params, TreeData>
        open={open}
        valueId={valueId}
        valueName={valueName}
        value={value}
        onChange={onChange}
        onCancel={onSwitchOpen}
        {...restProps}
      />
    </>
  );
};

const valueRender: ProRenderFieldPropsType['render'] = (value, props, dom) => {
  return (
    <>
      {[value]
        .flat(1)
        .map((item) => item?.name)
        .join(',')}
    </>
  );
};

const formRender: ProRenderFieldPropsType['renderFormItem'] = (value, props, dom) => {
  return (
    <>
      <TableTreeSelect {...props.fieldProps} />
    </>
  );
};

export const TABLETREESELECT = 'tabletreeselect';

export type TABLETREESELECTVALUETYPE = typeof TABLETREESELECT;

export const tableTreeSelectValueTypeRender: ProRenderFieldPropsType = {
  render: valueRender,
  renderFormItem: formRender,
};

export const tableTreeSelectValueTypeMap = {
  [TABLETREESELECT]: tableTreeSelectValueTypeRender,
};

export default TableTreeSelect;
