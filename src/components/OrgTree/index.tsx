/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 10:57:01
 * @LastEditTime: 2023-07-10 15:15:42
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\OrgTree\index.tsx
 */

import React, { useEffect, useCallback, useState } from 'react';
import { Tree, Spin } from 'antd';
import type { TreeProps } from 'antd';
import { useRequest } from 'umi';
import { getOrgTree } from './service';
import { TreeNode, OrgTypeEnum } from './type';
import styles from './index.less';

export type OrgTreeProps = Omit<TreeProps, 'treeData' | 'onSelect'> & {
  siteId?: string;
  onSelect?: TreeProps<TreeNode>['onSelect'];
};

const dealData = (data: any, prefix = OrgTypeEnum.Service) => {
  data?.forEach((item: any) => {
    item.id = prefix + item.id;
    item.label = item.label || item.name;
    item.type = prefix;
    if (item.sites && item.sites.length) {
      dealData(item.sites, OrgTypeEnum.Site);
      item.children = item.sites;
    }
  });
};

const OrgTree: React.FC<OrgTreeProps> = (props) => {
  const { siteId, onSelect, ...restProps } = props;

  const {
    loading,
    data: treeData,
    run,
  } = useRequest(getOrgTree, {
    manual: true,
    formatResult: ({ data }) => {
      if (data?.[0]) {
        data[0].id = 0;
      }
      if (data?.[1]) {
        data[1].id = OrgTypeEnum.Service;
        data[1].type = OrgTypeEnum.Service;
        if (data[1].children && data[1].children.length) {
          dealData(data[1].children);
        }
      }
      return data;
    },
  });

  useEffect(() => {
    run();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex h-full">
          <Spin className="flex1" />
        </div>
      ) : (
        <Tree<TreeNode>
          className={styles.tree}
          treeData={treeData}
          defaultExpandAll={true}
          fieldNames={{
            title: 'label',
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

export default OrgTree;
