/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-11 10:21:19
 * @LastEditTime: 2023-07-11 19:32:47
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\TreeSelect\index.tsx
 */
import React, { useCallback, useState, useMemo } from 'react';
import { Tree, TreeProps, Space, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import styles from './index.less';
import { merge } from 'lodash';

export type TreeSelectProps = Omit<TreeProps, 'checkedKeys' | 'onCheck' | 'checkStrictly'> & {
  value?: React.Key[];
  onChange?: (value: React.Key[]) => void;
};

const TreeSelect: React.FC<TreeSelectProps> = (props) => {
  const { value, onChange, treeData } = props;

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>();
  const [checkStrictly, setCheckStrictly] = useState<boolean>(false);

  const options = useMemo<TreeSelectProps>(() => {
    const defaultOptions: TreeSelectProps = {
      fieldNames: {
        key: 'id',
        title: 'label',
      },
    };
    return merge(defaultOptions, props);
  }, [props]);

  const treeKeys = useMemo<React.Key[]>(() => {
    return treeData?.map((item) => item[options.fieldNames?.key || ''] as React.Key) || [];
  }, [treeData, options]);

  const onOpenChange = useCallback(
    (e: CheckboxChangeEvent) => {
      if (e?.target?.checked) {
        setExpandedKeys(treeKeys);
      } else {
        setExpandedKeys([]);
      }
    },
    [treeKeys],
  );

  const onAllSelectChange = useCallback(
    (e: CheckboxChangeEvent) => {
      if (e?.target?.checked) {
        onChange?.(treeKeys);
      } else {
        onChange?.([]);
      }
    },
    [treeKeys],
  );

  const onLinkChange = useCallback((e: CheckboxChangeEvent) => {
    if (e?.target?.checked) {
      setCheckStrictly(false);
    } else {
      setCheckStrictly(true);
    }
  }, []);

  const onExpand = useCallback((keys: React.Key[]) => {
    setExpandedKeys(keys);
  }, []);

  const onCheck = useCallback<Required<Pick<TreeProps, 'onCheck'>>['onCheck']>((keys) => {
    if (Array.isArray(keys)) {
      onChange?.(keys);
    } else {
      onChange?.(keys?.checked);
    }
  }, []);

  return (
    <>
      <Space>
        <Checkbox onChange={onOpenChange}>展开/折叠</Checkbox>
        <Checkbox onChange={onAllSelectChange}>全选/全不选</Checkbox>
        <Checkbox defaultChecked onChange={onLinkChange}>
          父子联动
        </Checkbox>
      </Space>
      <div className={'ant-input mt4 ' + styles.tree}>
        <Tree
          checkedKeys={value}
          checkable={true}
          defaultExpandAll={false}
          multiple={true}
          expandedKeys={expandedKeys}
          onExpand={onExpand}
          onCheck={onCheck}
          treeData={treeData}
          checkStrictly={checkStrictly}
          {...options}
        />
      </div>
    </>
  );
};

export default TreeSelect;
