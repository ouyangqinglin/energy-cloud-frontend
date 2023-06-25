/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 10:57:01
 * @LastEditTime: 2023-06-25 10:04:23
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\SiteTree\index.tsx
 */

import React, { useEffect, useCallback, useState } from 'react';
import { Tree, Spin } from 'antd';
import type { TreeProps } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import { getSiteTree } from './service';
import type { TreeNode } from './type';
import Home from '@/assets/image/device/icon_主页@2x.png';
import Pv from '@/assets/image/device/icon_光伏@2x.png';
import PvInverter from '@/assets/image/device/icon_光伏逆变器@2x.png';
import Energy from '@/assets/image/device/icon_储能系统@2x.png';
import Ems from '@/assets/image/device/icon_EMS@2x.png';
import Bms from '@/assets/image/device/icon_BMS@2x.png';
import Battery from '@/assets/image/device/icon_电池簇@2x.png';
import Air from '@/assets/image/device/icon_空调@2x.png';
import Meter from '@/assets/image/device/icon_电表@2x.png';
import Charge from '@/assets/image/device/icon_充电桩@2x.png';
import Elec from '@/assets/image/device/icon_电气计量@2x.png';
import styles from './index.less';

export type SiteTreeProps = Omit<TreeProps, 'treeData' | 'onSelect'> & {
  siteId?: string;
  onSelect?: TreeProps<TreeNode>['onSelect'];
};

const childSystemMap = new Map([
  [1, Charge],
  [2, Energy],
  [3, Pv],
  [4, Elec],
  [5, Charge],
]);

const deviceMap = new Map([
  [1, Ems],
  [2, Bms],
  [3, Energy],
  [6, Battery],
  [7, Air],
  [11, PvInverter],
  [13, Charge],
  [14, Charge],
  [16, Energy],
  [17, Meter],
  [18, Pv],
  [19, Charge],
  [20, Charge],
  [21, Charge],
  [22, Charge],
  [24, Charge],
  [25, Charge],
  [26, Energy],
  [28, PvInverter],
  [30, Energy],
  [31, Battery],
  [32, Charge],
  [33, Charge],
]);

const dealTreeData = (data: TreeNode[]) => {
  data?.forEach?.((item) => {
    if (item.type === 3) {
      item.icon = <img src={Home} />;
    } else if (item.type === 2) {
      if (childSystemMap.get(item.id)) {
        item.icon = <img src={childSystemMap.get(item.id)} />;
      }
    } else {
      if (deviceMap.get(item.productId)) {
        item.icon = <img src={deviceMap.get(item.productId)} />;
      }
    }
    // item.icon = <SmileOutlined />;
    if (item.children && item.children.length) {
      dealTreeData(item.children);
    }
  });
};

const SiteTree: React.FC<SiteTreeProps> = (props) => {
  const { siteId, onSelect, ...restProps } = props;

  const [treeData, setTreeData] = useState();

  const {
    loading,
    // data: treeData,
    run,
  } = useRequest(getSiteTree, {
    manual: true,
  });

  useEffect(() => {
    if (siteId) {
      getSiteTree({ siteId }).then(({ data }) => {
        data.id = 'site' + data.id;
        const result = [data];
        dealTreeData(result);
        setTreeData(result);
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
          className={styles.tree}
          treeData={treeData || []}
          defaultExpandAll={true}
          fieldNames={{
            title: 'name',
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
