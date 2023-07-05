/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 10:39:54
 * @LastEditTime: 2023-07-05 17:01:02
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Device\index.tsx
 */

import React, { useCallback, useState, useEffect } from 'react';
import { useLocation } from 'umi';
import { useBoolean } from 'ahooks';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import DeviceList from './DeviceList';
import { EquipmentType } from '@/pages/equipment/equipment-list/data.d';
import SiteTree from '@/components/SiteTree';
import styles from './index.less';
import type { TreeNode } from '@/components/SiteTree/type';
import DeviceDetail from '@/components/DeviceDetail';
import SiteSwitch from '@/components/SiteSwitch';
import { LocationType } from '@/utils/dictionary';

const Device: React.FC = () => {
  const location = useLocation();
  const [selectNode, setSelectNode] = useState<TreeNode | null>();
  const [open, { toggle }] = useBoolean(true);
  const [siteId, setSiteId] = useState<string>();

  const onChange = useCallback((data) => {
    setSiteId(data?.siteId || '');
    setSelectNode(null);
  }, []);

  const onSelect = useCallback((_, { selected, node }: { selected: boolean; node: TreeNode }) => {
    if (selected) {
      setSelectNode(node);
    }
  }, []);

  const onDetail = useCallback((rowData: EquipmentType) => {
    setSelectNode({ ...rowData, id: rowData.deviceId, key: rowData.deviceId });
    return false;
  }, []);

  useEffect(() => {
    if ((location as LocationType).query?.id) {
      setSiteId((location as LocationType).query?.id);
    }
  }, [(location as LocationType).query?.id]);

  return (
    <>
      <div className="bg-white">
        <SiteSwitch
          className="p24"
          initialValues={{
            siteId: (location as LocationType).query?.id,
          }}
          onChange={onChange}
        />
        <div className={`${open && siteId && styles.open} ${styles.treeContain}`}>
          {siteId && (
            <>
              <div className={`${styles.tree}`}>
                <SiteTree
                  selectedKeys={[selectNode?.id || '']}
                  siteId={siteId}
                  onSelect={onSelect}
                />
              </div>
              <div className={styles.switchWrap} onClick={toggle}>
                {open ? <LeftOutlined /> : <RightOutlined />}
              </div>
            </>
          )}
          <div className={`${styles.content}`}>
            {(!selectNode || selectNode?.type === 2 || selectNode?.type === 3) && (
              <DeviceList
                params={{ siteId }}
                onDetail={onDetail}
                activeTabKey={selectNode?.type == 2 ? selectNode?.id : ''}
              />
            )}
            {selectNode && selectNode?.type !== 2 && selectNode?.type !== 3 && (
              <DeviceDetail id={selectNode.id} productId={selectNode.productId} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Device;
