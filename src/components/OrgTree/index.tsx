/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 10:57:01
 * @LastEditTime: 2023-07-27 14:33:54
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
import {
  YTInstallerOutlined,
  YTCompanyOutlined,
  YTOwnerOutlined,
  YTOperatorOutlined,
  YTOrganizeOutlined,
} from '@/components/YTIcons';

const orgIconMap = new Map([
  [OrgTypeEnum.System, YTOrganizeOutlined],
  [OrgTypeEnum.Install, YTInstallerOutlined],
  [OrgTypeEnum.Operator, YTOperatorOutlined],
  [OrgTypeEnum.Owner, YTOwnerOutlined],
]);

export type OrgTreeProps = Omit<TreeProps, 'treeData' | 'onSelect'> & {
  onSelect?: TreeProps<TreeNode>['onSelect'];
  afterRequest?: (data: any) => void;
};

const dealData = (data: any, siteParentItem?: any, parentItem?: any) => {
  data?.map?.((item: any) => {
    item.icon = orgIconMap.get(item.type) || YTCompanyOutlined;
    if (siteParentItem) {
      item.siteId = item.id;
      item.siteName = item.name;
      item.id = `${item.id}-${siteParentItem.id}`;
      item.label = item.name;
      item.type = siteParentItem.type;
      item.parentId = siteParentItem.id;
    }
    if (parentItem) {
      item.parentId = parentItem.id;
    }
    if (item?.sites && item?.sites?.length) {
      dealData(item.sites, item);
      item.children = item.sites;
    } else if (item?.children && item?.children?.length) {
      dealData(item.children, undefined, item);
    }
  });
};

const OrgTree: React.FC<OrgTreeProps> = (props) => {
  const { onSelect, afterRequest, ...restProps } = props;

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
