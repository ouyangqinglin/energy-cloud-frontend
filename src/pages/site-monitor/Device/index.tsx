/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 10:39:54
 * @LastEditTime: 2023-06-27 19:40:48
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\device\index.tsx
 */

import React, { useCallback, useState } from 'react';
import { useModel } from 'umi';
import { useBoolean } from 'ahooks';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import DeviceList from '@/pages/equipment/equipment-list';
import { EquipmentType } from '@/pages/equipment/equipment-list/data.d';
import SiteTree from '@/components/SiteTree';
import styles from './index.less';
import type { TreeNode } from '@/components/SiteTree/type';
import { default as DeviceListChild } from './DeviceList';
import DeviceDetail from '@/components/DeviceDetail';

const Device: React.FC = () => {
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id }));
  const [selectNode, setSelectNode] = useState<TreeNode>();
  const [open, { toggle }] = useBoolean(true);

  const onSelect = useCallback((_, { selected, node }: { selected: boolean; node: TreeNode }) => {
    if (selected) {
      setSelectNode(node);
    }
  }, []);

  const onDetail = useCallback((rowData: EquipmentType) => {
    setSelectNode({ ...rowData, id: rowData.deviceId, key: rowData.deviceId });
    return false;
  }, []);

  return (
    <>
      <div className={`h-full ${!open && styles.close}`}>
        <div className={`${styles.tree}`}>
          <SiteTree selectedKeys={[selectNode?.id || '']} siteId={siteId} onSelect={onSelect} />
        </div>
        <div className={styles.switchWrap} onClick={toggle}>
          {open ? <LeftOutlined /> : <RightOutlined />}
        </div>
        <div className={`${styles.content}`}>
          {(!selectNode || selectNode?.type === 3) && (
            <DeviceList isStationChild={true} onDetail={onDetail} />
          )}
          {selectNode?.type === 2 && (
            <DeviceListChild subSystemId={selectNode?.id} siteId={siteId} />
          )}
          {selectNode && selectNode?.type !== 2 && selectNode?.type !== 3 && (
            <DeviceDetail id={selectNode.id} productId={selectNode.productId} />
          )}
        </div>
      </div>
    </>
  );
};

export default Device;
