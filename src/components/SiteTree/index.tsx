/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 10:57:01
 * @LastEditTime: 2023-06-21 17:49:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\SiteTree\index.tsx
 */

import React, { useEffect, useCallback } from 'react';
import { Tree, Spin } from 'antd';
import type { TreeProps } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import { getSiteTree } from './service';
import type { TreeNode } from './type';

export type SiteTreeProps = Omit<TreeProps, 'treeData' | 'onSelect'> & {
  siteId?: string;
  onSelect?: TreeProps<TreeNode>['onSelect'];
};

const dealTreeData = (data: TreeNode[]) => {
  data?.forEach?.((item) => {
    // item.icon = <SmileOutlined />;
    if (item.children && item.children.length) {
      dealTreeData(item.children);
    }
  });
};

const SiteTree: React.FC<SiteTreeProps> = (props) => {
  const { siteId, onSelect, ...restProps } = props;

  const {
    loading,
    data: treeData,
    run,
  } = useRequest(getSiteTree, {
    manual: true,
  });

  useEffect(() => {
    if (siteId) {
      run({ siteId }).then((data) => {
        dealTreeData(data);
        return data;
      });
    }
  }, [siteId]);

  return (
    <>
      {loading ? (
        <div className="flex h-full">
          <Spin className="flex1" />
        </div>
      ) : (
        <Tree<TreeNode>
          treeData={treeData}
          defaultExpandAll={true}
          fieldNames={{
            title: 'deviceName',
            key: 'id',
            children: 'children',
          }}
          onSelect={onSelect}
          showIcon
          {...restProps}
        />
      )}
    </>
  );
};

export default SiteTree;
