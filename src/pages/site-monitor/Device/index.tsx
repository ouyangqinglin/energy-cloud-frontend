/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 10:39:54
 * @LastEditTime: 2023-07-19 10:47:06
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Device\index.tsx
 */

import React, { useCallback, useState } from 'react';
import { Divider } from 'antd';
import DeviceList from './DeviceList';
import styles from './index.less';
import SiteSwitch from '@/components/SiteSwitch';

const Device: React.FC = () => {
  const [siteId, setSiteId] = useState<string>();

  const onChange = useCallback((data) => {
    setSiteId(data?.siteId || '');
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="px24 pt24">
          <SiteSwitch onChange={onChange} />
          <Divider className="mb0 mt12" />
        </div>
        <div className={`${styles.treeContain}`}>
          <div className={`${styles.content}`}>
            <DeviceList params={{ siteIds: siteId }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Device;
