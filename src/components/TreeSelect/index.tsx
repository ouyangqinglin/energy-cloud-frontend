/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-11 10:21:19
 * @LastEditTime: 2023-11-21 16:15:12
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\TreeSelect\index.tsx
 */
import React, { useCallback, useState, useMemo } from 'react';
import { Tree, TreeProps, Space, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import styles from './index.less';
import { merge } from 'lodash';
import { formatMessage } from '@/utils';

export type TreeSelectProps = Omit<
  TreeProps<{ [key in string]: any }>,
  'checkedKeys' | 'onCheck' | 'checkStrictly'
> & {
  value?: React.Key[];
  onChange?: (value: React.Key[]) => void;
};

const getDeepKeys = (
  data: TreeProps<{ [key in string]: any }>['treeData'],
  key: string,
): string[] => {
  const keys: string[] = [];
  data?.forEach?.((item) => {
    if (item?.[key]) {
      keys.push(item?.[key]);
    }
    if (item?.children && item?.children?.length) {
      keys.push(...getDeepKeys(item.children, key));
    }
  });
  return keys;
};

const TreeSelect: React.FC<TreeSelectProps> = (props) => {
  const { value, onChange, treeData } = props;

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>();
  const [checkStrictly, setCheckStrictly] = useState<boolean>(true);

  const options = useMemo<TreeSelectProps>(() => {
    const defaultOptions: TreeSelectProps = {
      fieldNames: {
        key: 'id',
        title: 'label',
      },
    };
    return merge(defaultOptions, props);
  }, [props]);

  const treeKeys = useMemo(() => {
    return {
      oneLevelKeys: treeData?.map((item) => item[options.fieldNames?.key || ''] as React.Key) || [],
      allKeys: getDeepKeys(treeData, options.fieldNames?.key || 'id'),
    };
  }, [treeData, options]);

  const onOpenChange = useCallback(
    (e: CheckboxChangeEvent) => {
      if (e?.target?.checked) {
        setExpandedKeys(treeKeys.oneLevelKeys);
      } else {
        setExpandedKeys([]);
      }
    },
    [treeKeys.oneLevelKeys],
  );

  const onAllSelectChange = useCallback(
    (e: CheckboxChangeEvent) => {
      if (e?.target?.checked) {
        onChange?.(treeKeys.allKeys);
      } else {
        onChange?.([]);
      }
    },
    [treeKeys.allKeys],
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
        <Checkbox onChange={onOpenChange}>
          {formatMessage({ id: 'system.Notice.expandFold', defaultMessage: '展开/折叠' })}
        </Checkbox>
        <Checkbox onChange={onAllSelectChange}>
          {formatMessage({ id: 'system.Notice.selectAllNnone', defaultMessage: '全选/全不选' })}
        </Checkbox>
        {/* <Checkbox onChange={onLinkChange}>父子联动</Checkbox> */}
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
