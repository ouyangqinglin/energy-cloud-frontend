/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 13:46:07
 * @LastEditTime: 2023-07-14 13:46:07
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Device\index copy.tsx
 */
/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 10:39:54
 * @LastEditTime: 2023-07-07 11:55:26
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Device\index.tsx
 */

import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { Divider } from 'antd';
import { useBoolean } from 'ahooks';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import DeviceList from './DeviceList';
import { EquipmentType } from '@/pages/equipment/equipment-list/data.d';
import SiteTree from '@/components/SiteTree';
import styles from './index.less';
import type { TreeNode } from '@/components/SiteTree/type';
import DeviceDetail from '@/components/DeviceDetail';
import SiteSwitch from '@/components/SiteSwitch';

const Device: React.FC = () => {
  const [selectNode, setSelectNode] = useState<TreeNode | null>();
  const [open, { toggle }] = useBoolean(true);
  const [siteId, setSiteId] = useState<string>();

  const selectedKeys = useMemo<string[]>(() => {
    return selectNode?.id ? [selectNode.id] : [];
  }, [selectNode]);

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

  return (
    <>
      <div className="bg-white">
        {!siteId && (
          <div className="px24 pt24">
            <SiteSwitch onChange={onChange} />
            <Divider className="mb0 mt12" />
          </div>
        )}
        <div className={`${open && siteId && styles.open} ${styles.treeContain}`}>
          {siteId && (
            <>
              <div className={`${styles.tree}`}>
                <SiteSwitch
                  className={`my12 ${styles.site}`}
                  initialValues={{
                    siteId,
                  }}
                  onChange={onChange}
                  columnProps={{
                    title: '',
                    width: 225,
                  }}
                />
                <SiteTree selectedKeys={selectedKeys} siteId={siteId} onSelect={onSelect} />
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
                activeTabKey={selectNode?.type == 2 ? selectNode?.id : 1}
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
