/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 10:39:54
 * @LastEditTime: 2023-06-21 14:52:15
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\device\index.tsx
 */

import React, { useCallback, useState } from 'react';
import { useModel } from 'umi';
import DeviceList from '@/pages/equipment/equipment-list';
import SiteTree from '@/components/SiteTree';
import styles from './index.less';
import type { TreeNode } from '@/components/SiteTree/type';
import Detail from './Detail';
import { default as DeviceListChild } from './DeviceList';

const Device: React.FC = () => {
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id }));
  const [selectNode, setSelectNode] = useState<TreeNode>();

  const onSelect = useCallback((_, { selected, node }: { selected: boolean; node: TreeNode }) => {
    if (selected) {
      setSelectNode(node);
    }
  }, []);

  return (
    <>
      <div className={styles.tree}>
        <SiteTree siteId={siteId} onSelect={onSelect} />
      </div>
      <div className={styles.content}>
        {(!selectNode || selectNode?.parentId === -1) && <DeviceList isStationChild={true} />}
        {selectNode?.parentId === 0 && (
          <DeviceListChild subSystemId={selectNode?.id} siteId={siteId} />
        )}
        {selectNode?.productId && <Detail />}
      </div>
    </>
  );
};

export default Device;
