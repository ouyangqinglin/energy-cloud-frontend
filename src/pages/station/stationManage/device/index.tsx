/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 10:39:54
 * @LastEditTime: 2023-06-25 14:13:44
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\device\index.tsx
 */

import React, { useCallback, useState } from 'react';
import { useModel } from 'umi';
import { useBoolean } from 'ahooks';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import DeviceList from '@/pages/equipment/equipment-list';
import SiteTree from '@/components/SiteTree';
import styles from './index.less';
import type { TreeNode } from '@/components/SiteTree/type';
import Detail from './Detail';
import { default as DeviceListChild } from './DeviceList';

const Device: React.FC = () => {
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id }));
  const [selectNode, setSelectNode] = useState<TreeNode>();
  const [open, { toggle }] = useBoolean(true);

  const onSelect = useCallback((_, { selected, node }: { selected: boolean; node: TreeNode }) => {
    if (selected) {
      setSelectNode(node);
    }
  }, []);

  return (
    <>
      <div className={`h-full ${!open && styles.close}`}>
        <div className={`${styles.tree}`}>
          <SiteTree siteId={siteId} onSelect={onSelect} />
        </div>
        <div className={styles.switchWrap} onClick={toggle}>
          {open ? <LeftOutlined /> : <RightOutlined />}
        </div>
        <div className={`${styles.content}`}>
          {(!selectNode || selectNode?.type === 3) && <DeviceList isStationChild={true} />}
          {selectNode?.type === 2 && (
            <DeviceListChild subSystemId={selectNode?.id} siteId={siteId} />
          )}
          {selectNode && selectNode?.type !== 2 && selectNode?.type !== 3 && <Detail />}
        </div>
      </div>
    </>
  );
};

export default Device;
