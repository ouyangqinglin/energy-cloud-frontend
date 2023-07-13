/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 10:57:01
 * @LastEditTime: 2023-07-14 02:09:27
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
import { isEmpty } from '@/utils';

export type OrgTreeProps = Omit<TreeProps, 'treeData' | 'onSelect'> & {
  siteId?: string;
  onSelect?: TreeProps<TreeNode>['onSelect'];
  afterRequest?: (data: any) => void;
};

const dealData = (data: any) => {
  data?.map?.((item: any) => {
    if (!isEmpty(item?.type) && item?.id == 100) {
      item.id = 0;
    }
    if (item?.type == 1) {
      if (item?.id == 110) {
        item.id = OrgTypeEnum.Service;
      } else {
        item.id = OrgTypeEnum.Service + item?.id;
      }
    }
    if (isEmpty(item?.type)) {
      item.id = OrgTypeEnum.Site + item?.id;
      item.label = item?.name;
    }
    if (item?.sites && item?.sites?.length) {
      dealData(item.sites);
      item.children = item.sites;
    } else if (item?.children && item?.children?.length) {
      dealData(item.children);
    }
  });
};

const OrgTree: React.FC<OrgTreeProps> = (props) => {
  const { siteId, onSelect, afterRequest, ...restProps } = props;

  const {
    loading,
    data: treeData,
    run,
  } = useRequest(getOrgTree, {
    manual: true,
    formatResult: ({ data }) => {
      dealData(data);
      afterRequest?.(data);
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
